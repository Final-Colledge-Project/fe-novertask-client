import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep, isEmpty } from 'lodash'

// component libraries
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { RiFilter3Fill, RiMore2Fill, RiUserAddLine } from 'react-icons/ri'

// components
import {
  BoardDetailContainer,
  Body,
  Header,
  MemberAvatarGroup,
  Members,
  ProjectType,
  TitleHeader,
  TypeHeader,
  TypeItem,
  TypeMenu,
  YellowTooltip
} from './styles'
import SearchBox from '~/components/SearchBox'
import Column from './Column'
import AddColumnButton from './AddColumnButton'
import BoardDetailLoading from '../components/BoardDetailLoading'
import AddMenu from './AddMenu'
import AddMemberPopup from './AddMemberPopup'
import Card from './Column/Card'

// services
import {
  IAllMemberInBoard,
  IBoard,
  ICard,
  IColumn,
  IMemberInBoard
} from '~/services/types'
import {
  getAllMemberInBoard,
  getBoardDetail,
  updateBoard
} from '~/services/boardService'
import { StoreType } from '~/redux'
import {
  setCreateColumn,
  setShouldRefreshBoardDetail
} from '~/redux/boardSlice'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'

// Dnd specific
import {
  Active,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  Over,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import mapOrder from '~/utils/mapOrder'
import {
  updateColumn,
  updateTwoColumnsConcurrentLy
} from '~/services/columnService'
import { updateCard } from '~/services/cardService'
import BoardMenu from './BoardMenu'

const ACTIVE_ITEM_TYPE = {
  COLUMN: 'column',
  CARD: 'card'
}

interface IChangeColumn {
  id: string
  changes: { cardOrderIds: string[] }
}

const BoardDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [viewType, setViewType] = useState('Kanban')
  const [board, setBoard] = useState<IBoard | undefined>(undefined)
  const [members, setMembers] = useState<IAllMemberInBoard | undefined>(
    undefined
  )
  const [shouldShowHeader, setShouldShowHeader] = useState(true)
  const [addingColumn, setAddingColumn] = useState(false)

  // change state of adding column process
  const handleAddingColumn = (nextState: boolean) => {
    setAddingColumn(nextState)
  }

  const handleToggleCover = () => {
    setShouldShowHeader((prev) => !prev)
  }

  // #region state for handle DnD

  const [orderedColumns, setOrderedColumns] = useState<IColumn[]>([])
  const [activeItem, setActiveItem] = useState<string>()
  const [activeItemID, setActiveItemID] = useState<UniqueIdentifier>()
  const [activeItemData, setActiveItemData] = useState<ICard | IColumn>()
  const [originColumn, setOriginColumn] = useState<IColumn>()
  const [shouldShowBoardMenu, setShouldShowBoardMenu] = useState<boolean>(false)

  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const newChangesWithDiffColumn = useRef<IChangeColumn[]>()
  // const originColumnsBeforeUpdate = useRef<IChangeColumn[]>()

  // #endregion

  // #region selector

  const { success } = useSelector(
    (state: StoreType) => state.board.creatingBoard
  )
  const { shouldRefreshBoardDetail } = useSelector(
    (state: StoreType) => state.board
  )
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  const viewList = ['Kanban', 'List']
  const items = [
    {
      title: 'Add task',
      onChoose: () => {}
    },
    {
      title: 'Add column',
      onChoose: () => {
        setAddingColumn(true)
      }
    }
  ]
  // #endregion

  // #region fetch data

  // get data from api
  const getBoard = async () => {
    try {
      const res = await getBoardDetail({ id: id as string })
      if (res && res?.data) {
        const board = res.data
        if (board.columns && board.columnOrderIds) {
          const { columns, columnOrderIds } = board

          // reorder columns by order
          board.columns = mapOrder(columns, columnOrderIds, '_id')

          // add placeholder card if column does not have any
          board.columns.forEach((column) => {
            if (column.cards && column.cards.length === 0) {
              column.cards.push({
                _id: `placeholder-${column._id}`,
                boardId: board?._id as string,
                columnId: column._id,
                title: '',
                cover: undefined,
                memberIds: [],
                comments: [],
                FE_ONLY_PLACEHOLDER: true,
                cardId: '',
                startDate: '',
                dueDate: '',
                priority: '',
                isDone: false,
                isOverdue: false,
                label: { _id: '', name: '', color: '' }
              })
              column.cardOrderIds = column.cards.map((c) => c._id)
            }
          })
          setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'))
        }
        setBoard(board)
      }
    } catch (err) {
      const message = (err as AxiosError).message
      if (message === 'UNAUTHORIZED') {
        enqueueSnackbar('You cannot access this board', { variant: 'error' })
        navigate('/u', { replace: true })
      }
    }
  }

  // for api
  const getMembers = async () => {
    try {
      const res = await getAllMemberInBoard({ id: id as string })
      if (res && res?.data) {
        setMembers(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  useEffect(() => {
    getBoard()
  }, [id])

  useEffect(() => {
    board && getMembers()
  }, [id, board])

  useEffect(() => {
    if (success) {
      getBoard()
      dispatch(setCreateColumn({ success: false }))
    }
  }, [success])

  useEffect(() => {
    if (shouldRefreshBoardDetail) {
      getBoard()
      dispatch(setShouldRefreshBoardDetail(false))
    }
  }, [shouldRefreshBoardDetail])

  const boardLeader = useCallback(() => {
    const leadId = board?.ownerIds.find(
      (owner) => owner.role === 'boardLead'
    )?.user
    return members?.oweners.find((owner) => owner.user._id === leadId)?.user
  }, [members, board])

  const isUserTheBoardLead = useCallback(() => {
    return boardLeader()?._id === currentUser?._id
  }, [boardLeader, currentUser])

  const handleShowAddMemberPopup = () => {
    dispatch(
      setPopupAddMemberToBoard({
        show: true,
        data: {
          currentWsID: board?.teamWorkspaceId,
          currentBoardID: board?._id,
          currentMembers: members
        }
      })
    )
  }

  const handleCloseBoardMenu = () => {
    setShouldShowBoardMenu(false)
  }

  const updateBoardColumnsOrder = async (newOrder: string[]) => {
    try {
      const res = await updateBoard({
        boardId: id as string,
        changes: {
          columnOrderIds: newOrder
        }
      })
      if (res && res.data) {
        console.log('Update all columns order successfully')
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      await getBoard()
    }
  }

  const updateColumnCardsOrder = async (
    changes: IChangeColumn[],
    cardId?: string
  ) => {
    try {
      const [toColumnChange, fromColumnChange] = changes
      if (fromColumnChange) {
        await updateTwoColumnsConcurrentLy([fromColumnChange, toColumnChange])
        await updateMovedCard(cardId as string, toColumnChange.id)
        console.log('Update card orders in 2 column successfully')
      } else {
        const res = await updateColumn(toColumnChange)
        if (res && res.data) {
          console.log('Update card order in 1 column successfully')
        }
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      await getBoard()
    }
  }

  const updateMovedCard = async (cardId: string, newColumnId: string) => {
    try {
      const res = await updateCard({
        cardId,
        changes: { columnId: newColumnId }
      })
      if (res && res.data) {
        console.log('Update card successfully')
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      await getBoard()
    }
  }
  // #endregion

  // #region Handle Drag & Drop

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const findColumnByCardID = (cardId: string) => {
    return orderedColumns.find((column) =>
      column.cards?.map((card) => card._id).includes(cardId)
    )
  }

  // Custom lại thuật toán phát hiện va chạm để fix lỗi flickering
  // args: Agrument
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      //Kéo column thì dùng closestCorners
      if (activeItem === ACTIVE_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Tìm các điểm giao nhau, va chạm với trỏ chuột
      const pointerIntersections = pointerWithin(args)

      // Nếu mà kéo ra ngoài vùng legal thì phải dừng lại
      if (!pointerIntersections?.length) return []

      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args)

      // lấy collistion trong mớ intersections
      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        // Nếu mà overId là column thì sẽ tìm tới cardId gần nhất bên trong khu vực va chạm đó
        // dựa vào thuật toán phát hiện va chạm closestCorners

        const intersectColumn = orderedColumns.find((c) => c._id === overId)
        if (intersectColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                intersectColumn?.cardOrderIds?.includes(container.id as string)
            )
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeItem, orderedColumns]
  )

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
          transform: 'rotate(0deg)'
        }
      }
    })
  }

  const handleDragStart = (e: DragStartEvent) => {
    console.log('handleDragStart')
    // active: đối tượng bắt đầu kéo thả, bao gồm data được bind
    const { active } = e

    // only admin can drag column
    if (!isUserTheBoardLead() && !active.data.current?.columnId) return

    setActiveItemID(active.id)
    setActiveItemData(active.data.current as ICard | IColumn)
    if (active.data.current?.columnId) {
      setActiveItem(ACTIVE_ITEM_TYPE.CARD)
      setOriginColumn(findColumnByCardID(active.id as string))
    } else {
      setActiveItem(ACTIVE_ITEM_TYPE.COLUMN)
    }
  }

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e
    if (!active || !over) return
    // Đã xử lý column rồi
    if (activeItem === ACTIVE_ITEM_TYPE.COLUMN) return
    // dragging card là card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // over card là chỗ mà thả ra rồi đó
    const { id: overCardId } = over
    const activeColumn = findColumnByCardID(activeDraggingCardId as string)
    const overColumn = findColumnByCardID(overCardId as string)

    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      setColumnsWhenMoveDiffColumn(
        overColumn,
        overCardId as string,
        active,
        over,
        activeColumn,
        activeDraggingCardId as string,
        activeDraggingCardData as ICard
      )
    }
  }

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('handleDragEnd')
    const { active, over } = e
    if (!over) return

    // Khi thả một card
    if (activeItem === ACTIVE_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // over card là chỗ mà thả ra rồi đó
      const { id: overCardId } = over
      const activeColumn = findColumnByCardID(activeDraggingCardId as string)
      const overColumn = findColumnByCardID(overCardId as string)

      if (!activeColumn || !overColumn) return
      newChangesWithDiffColumn.current &&
        updateColumnCardsOrder(
          [...newChangesWithDiffColumn.current],
          activeDraggingCardId as string
        )
      newChangesWithDiffColumn.current = undefined

      // Phải dùng column khi bắt đầu kéo thả chứ không phải activeItem
      // Vì khi kéo state đã bị thay đổi ở handleDragOver
      if (originColumn?._id !== overColumn._id) {
        // Thả card khác column
        setColumnsWhenMoveDiffColumn(
          overColumn,
          overCardId as string,
          active,
          over,
          activeColumn,
          activeDraggingCardId as string,
          activeDraggingCardData as ICard
        )
      } else {
        // Thả card cùng column
        // eslint-disable-next-line no-lonely-if
        if (activeItemID !== overCardId) {
          const oldIndex = originColumn.cards?.findIndex(
            (c) => c._id === activeItemID
          )
          const nextIndex = originColumn.cards?.findIndex(
            (c) => c._id === overCardId
          )
          const nextOrderedCards = arrayMove(
            originColumn.cards as ICard[],
            oldIndex as number,
            nextIndex as number
          )

          // originColumn.cards = nextOrderedCards
          setOrderedColumns((prevColumns) => {
            const nextOrderColumns = cloneDeep(prevColumns)
            const targetColumn: IColumn = nextOrderColumns.find(
              (c: IColumn) => c._id === originColumn._id
            )
            targetColumn.cards = nextOrderedCards
            targetColumn.cardOrderIds = nextOrderedCards.map((card) => card._id)
            // console.log('[Move card in the same column] > ', nextOrderColumns)

            updateColumnCardsOrder([
              {
                id: targetColumn._id,
                changes: {
                  cardOrderIds: targetColumn.cards
                    .filter((c) => !c.FE_ONLY_PLACEHOLDER)
                    .map((c) => c._id)
                }
              }
            ])
            return nextOrderColumns
          })
        }
      }
    }

    // Khi thả một column
    if (activeItem === ACTIVE_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const nextIndex = orderedColumns.findIndex((c) => c._id === over.id)
        const nextOrderedColumns = arrayMove(
          orderedColumns,
          oldIndex,
          nextIndex
        )
        // console.log('[Move column] > ', nextOrderedColumns)
        setOrderedColumns(nextOrderedColumns)
        updateBoardColumnsOrder(nextOrderedColumns.map((c) => c._id))
      }
    }

    setOriginColumn(undefined)
    setActiveItemID('')
    setActiveItemData(undefined)
    setActiveItem(undefined)
    // dragging end
  }

  const setColumnsWhenMoveDiffColumn = (
    overColumn: IColumn,
    overCardId: string,
    active: Active,
    over: Over,
    activeColumn: IColumn,
    activeDraggingCardId: string,
    activeDraggingCardData: ICard
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí mà cái card được thả ra trong over column
      const overCardIndex = overColumn.cards
        ? overColumn.cards.findIndex((card) => card._id === overCardId)
        : -1

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      const newIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn.cards?.length || 1 + 1

      const nextOrderColumns = cloneDeep(prevColumns)
      const nextActiveColumn: IColumn = nextOrderColumns.find(
        (c: IColumn) => c._id === activeColumn._id
      )
      const nextOverColumn: IColumn = nextOrderColumns.find(
        (c: IColumn) => c._id === overColumn._id
      )
      // active -> cũ, nextActiveColumn -> column cũ khi kéo
      if (nextActiveColumn) {
        // Tính toán lại cards mới sau khi kéo một cục card ra khỏi column đó má
        nextActiveColumn.cards = nextActiveColumn.cards?.filter(
          (c) => c._id !== activeDraggingCardId
        )

        // Thêm card placeholder nếu column không còn card nào
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [
            {
              _id: `placeholder-${nextActiveColumn._id}`,
              boardId: board?._id as string,
              columnId: nextActiveColumn._id,
              title: '',
              cover: undefined,
              memberIds: [],
              comments: [],
              FE_ONLY_PLACEHOLDER: true,
              cardId: '',
              startDate: '',
              dueDate: '',
              priority: '',
              isDone: false,
              isOverdue: false,
              label: { _id: '', name: '', color: '' }
            }
          ]
        }

        nextActiveColumn.cardOrderIds =
          nextActiveColumn.cards?.map((c) => c._id) || []
      }

      // over -> mới, nextOverColumn -> column mới khi thả
      if (nextOverColumn) {
        // Kiểm tra card đang kéo có tồn tại ở overColumn hay chưa, nếu có thì xoá nó đi
        // Thấy cũng không cần thiết lắm nha
        nextOverColumn.cards =
          nextOverColumn.cards?.filter((c) => c._id !== activeDraggingCardId) ||
          []

        const rebuidDraggingCard = {
          ...(activeDraggingCardData as ICard),
          columnId: nextOverColumn._id
        }

        // Tiếp theo là thêm cái card đang kéo vào overColumn ở index mới
        nextOverColumn.cards.splice(newIndex, 0, rebuidDraggingCard as ICard)

        // Xoá đi card placeholder nếu có
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (c) => !c.FE_ONLY_PLACEHOLDER
        )

        // Cập nhật lại cái order ids
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((c) => c._id)
      }

      // console.log('[Move card to order column] > ', nextOrderColumns)
      // only update via api when drag is true end
      if (nextActiveColumn || nextOverColumn) {
        newChangesWithDiffColumn.current = [
          {
            id: nextOverColumn._id,
            changes: {
              cardOrderIds:
                nextOverColumn.cards
                  ?.filter((c) => !c.FE_ONLY_PLACEHOLDER)
                  .map((c) => c._id) || []
            }
          },
          {
            id: nextActiveColumn._id,
            changes: {
              cardOrderIds:
                nextActiveColumn.cards
                  ?.filter((c) => !c.FE_ONLY_PLACEHOLDER)
                  .map((c) => c._id) || []
            }
          }
        ]
      }
      return nextOrderColumns
    })
  }

  // #endregion

  return (
    <DndContext
      onDragStart={handleDragStart}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      // Thuật toán xử lý va chạm
      // Cần dùng loại closest-corners thì card bự mới move được
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={collisionDetectionStrategy}
    >
      <BoardDetailContainer>
        <Header
          $img={board?.cover || ''}
          className={clsx(!shouldShowHeader && 'hidden')}
        >
          <div className="show-header" onClick={handleToggleCover}>
            {shouldShowHeader ? 'Hide cover' : 'Show cover'}
          </div>
        </Header>

        <TitleHeader>
          <div className="left-block">
            <div className="title">
              {board?.title}{' '}
              <ProjectType $type={(board?.type as string) || 'public'}>
                {board?.type}
              </ProjectType>
            </div>
            <p className="description">{board?.description}</p>
          </div>
          <div className="right-block">
            <AddMenu items={isUserTheBoardLead() ? items : items.slice(0, 1)} />
            <SearchBox label="" sx={{ height: '35px' }} />
            <IconButton onClick={() => setShouldShowBoardMenu(true)}>
              <RiMore2Fill />
            </IconButton>
          </div>
        </TitleHeader>
        <TypeHeader>
          <TypeMenu>
            {viewList.map((type) => (
              <TypeItem
                className={clsx(viewType === type && 'index')}
                onClick={() => setViewType(type)}
              >
                {type}
              </TypeItem>
            ))}
          </TypeMenu>
          <Members>
            <Button
              color="primary"
              variant="text"
              startIcon={<RiFilter3Fill />}
            >
              Filter
            </Button>
            <MemberAvatarGroup>
              {members?.oweners &&
                members.oweners.map(({ user }) => (
                  <YellowTooltip title={'Owner | ' + user.firstName}>
                    <Avatar
                      alt={user.firstName}
                      src={user.avatar}
                      sx={{
                        '&.MuiAvatar-root': {
                          // order: 2,
                          border: (theme) =>
                            `3px solid ${theme.palette.yellow.main} !important`
                        }
                      }}
                    />
                  </YellowTooltip>
                ))}
              {members?.members &&
                members.members.map((user) => (
                  <Tooltip title={user.firstName}>
                    <Avatar alt={user.firstName} src={user.avatar} />
                  </Tooltip>
                ))}
            </MemberAvatarGroup>
            {isUserTheBoardLead() && (
              <Button
                color="primary"
                variant="contained"
                startIcon={<RiUserAddLine />}
                onClick={handleShowAddMemberPopup}
              >
                Invite
              </Button>
            )}
          </Members>
        </TypeHeader>
        <Body>
          {!board?.columns && <BoardDetailLoading />}
          {orderedColumns && (
            <SortableContext
              items={orderedColumns.map((c) => c._id) as string[]}
              strategy={horizontalListSortingStrategy}
              id={board?._id}
            >
              {orderedColumns &&
                orderedColumns.map((column) => (
                  <Column column={column} key={column._id} />
                ))}
            </SortableContext>
          )}
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeItemID && null}
            {activeItem === ACTIVE_ITEM_TYPE.COLUMN && (
              <Column
                column={activeItemData as IColumn}
                key={activeItemID}
                className="drag-over-column"
              />
            )}
            {activeItem === ACTIVE_ITEM_TYPE.CARD && (
              <Card
                card={activeItemData as ICard}
                key={activeItemID}
                className="drag-over-card"
              />
            )}
          </DragOverlay>
          {isUserTheBoardLead() && (
            <AddColumnButton
              addingColumn={addingColumn}
              setFocus={handleAddingColumn}
              boardId={board?._id as string}
            />
          )}
        </Body>
        <AddMemberPopup />
      </BoardDetailContainer>
      {board && members && (
        <BoardMenu
          onClose={handleCloseBoardMenu}
          shouldShow={shouldShowBoardMenu}
          board={board}
          owner={boardLeader() as IMemberInBoard}
        />
      )}
    </DndContext>
  )
}

export default BoardDetail
