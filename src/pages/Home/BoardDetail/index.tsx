import {
  Link,
  Outlet,
  Route,
  Routes,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep, isEmpty } from 'lodash'

// component libraries
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Button,
  IconButton,
  Typography
} from '@mui/material'
import {
  RiAccountBoxFill,
  RiArrowDownSLine,
  RiArrowDropDownFill,
  RiArrowRightSLine,
  RiMore2Fill
} from 'react-icons/ri'

// components
import {
  BoardDetailContainer,
  Body,
  Divider,
  ProjectType,
  SprintActions,
  SprintSummary,
  TitleHeader,
  TypeHeader,
  TypeItem,
  TypeMenu
} from './styles'
import SearchBox from '~/components/SearchBox'
import Column from './Column'
import AddColumnButton from './AddColumnButton'
import BoardDetailLoading from '../components/BoardDetailLoading'
import AddMemberPopup from './AddMemberPopup'
import Card from './Column/Card'
import CurrentFilters from './CurrentFilters'
import BoardViewMenu from './BoardViewMenu'
import BoardOverview from './BoardOverview'
import BoardSettings from './BoardSettings'
import BoardViewLayout from '~/layouts/BoardViewLayout'
import BoardMember from './BoardMember'
import FilterMenu from './FilterMenu'
import BoardMenu from './BoardMenu'

// services
import {
  IAllMemberInBoard,
  IBoard,
  ICard,
  IColumn,
  IMemberInBoard,
  ISprint
} from '~/services/types'
import {
  getAllMemberInBoard,
  getBoardDetail,
  updateBoard
} from '~/services/boardService'
import { StoreDispatchType, StoreType } from '~/redux'
import {
  setCreateColumn,
  setShouldRefreshBoardDetail,
  setMembers as setMembersToStore,
  refreshMembers
} from '~/redux/boardSlice'
import {
  resetCurrentBoardPermission,
  resetCurrentBoardPermissionState,
  resetUserPermissionOnBoard,
  resetUserPermissionOnBoardState
} from '~/redux/permissionSlice'
import {
  getBoardPermission,
  getUserPermissionOnBoard
} from '~/redux/permissionSlice/actions'
import usePermission from '~/hooks/usePermission'
import allRoutes from '~/utils/routes'
// import { setPopupAddMemberToBoard } from '~/redux/popupSlice' 22-04-2024 move to Header.tsx

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
import { setCreatingCard, setSearchString } from '~/redux/cardSlice'
import { setFakeColumn } from '~/redux/columnSlice'
import BoardReports from './BoardReports'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import Empty from '~/components/Empty'
import { BOARD_RELOAD_REASON, BOARD_TEMPLATE } from '~/utils/constant/board'
import useFetchBoardData from '~/hooks/useFetchBoardData'
import { BOARD_RESOURCES } from '~/utils/constant/board'
import { TITLE } from '~/utils/constant/common'
import ActionMenu from './ActionMenu'
import AddCardDialog from './AddCardDialog'
import { StringSchema } from 'yup'
import Sprint from './Sprint'
import { getAllSprintsDetail } from '~/services/sprintService'
import AddSprintDialog from './AddSprintDialog'
import { SPRINT_MODAL_VIEW_MODE, SPRINT_STATUS } from '~/utils/constant/sprint'
import { fetchSprints } from '~/redux/sprintSlice/actions'

const ACTIVE_ITEM_TYPE = {
  COLUMN: 'column',
  CARD: 'card'
}

interface IChangeColumn {
  id: string
  changes: { cardOrderIds: string[] }
}

const FAKE_COLUMN_KEY = 'fake-column-id'
const FAKE_CARD_KEY = 'fake-card-id'

// import socketIoClient from 'socket.io-client'

const BoardDetail = () => {
  // -------------------------STATE-------------------------
  const viewList = ['Kanban', 'Backlog']
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<StoreDispatchType>()
  // const socket = socketIoClient('http://localhost:5000')
  const [viewType, setViewType] = useState(viewList[0])
  const [board, setBoard] = useState<IBoard | undefined>(undefined)
  const [members, setMembers] = useState<IAllMemberInBoard | undefined>(
    undefined
  )
  const [addingColumn, setAddingColumn] = useState(false)
  const [openAddSprint, setOpenAddSprint] = useState(false)

  // logged user info
  const userInfo = useSelector((state: StoreType) => state.auth.userInfo)

  // change state of adding column process
  const handleAddingColumn = (nextState: boolean) => {
    setAddingColumn(nextState)
  }
  // change state of adding sprint process
  const handleAddingSprint = (nextState: boolean) => {
    setOpenAddSprint(nextState)
  }

  const userPermission = usePermission()

  //-------------------------TOOLS-------------------------
  // check if logged in user can update column
  const canUpdateColumn = () => userPermission?.column.update

  // check if logged in user can add column
  const canAddColumn = () => userPermission?.column.create

  // check if logged in user can update card
  const canUpdateCard = () => userPermission?.card.update
  const canCreateCard = () => userPermission?.card.create

  const isAdmin = () => userPermission?.isAdmin

  // useEffect(() => {
  //   const joinBoard = () => socket.emit('join_board', { board: id })
  // }, [])

  // #region state for handle DnD
  const [orderedColumns, setOrderedColumns] = useState<IColumn[]>([])
  const [activeItem, setActiveItem] = useState<string>()
  const [activeItemID, setActiveItemID] = useState<UniqueIdentifier>()
  const [activeItemData, setActiveItemData] = useState<ICard | IColumn>()
  const [originColumn, setOriginColumn] = useState<IColumn>()
  const [shouldShowBoardMenu, setShouldShowBoardMenu] = useState<boolean>(false)
  const [sprints, setSprints] = useState<ISprint[]>([])

  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const newChangesWithDiffColumn = useRef<IChangeColumn[]>()

  // const originColumnsBeforeUpdate = useRef<IChangeColumn[]>()

  // #endregion

  // #region selector

  const { success, error, action } = useSelector(
    (state: StoreType) => state.board.creatingBoard
  )
  const { shouldRefreshBoardDetail } = useSelector(
    (state: StoreType) => state.board
  )
  const columnStore = useSelector((state: StoreType) => state.column)
  const cardStore = useSelector((state: StoreType) => state.card)
  const { boards } = useSelector((state: StoreType) => state.board)

  useFetchBoardData({ key: BOARD_RESOURCES.sprint, boardId: id || '' })
  useFetchBoardData({ key: BOARD_RESOURCES.priority, boardId: id || '' })
  useFetchBoardData({ key: BOARD_RESOURCES.issueType, boardId: id || '' })
  useFetchBoardData({ key: BOARD_RESOURCES.column, boardId: id || '' })
  useFetchBoardData({ key: BOARD_RESOURCES.label, boardId: id || '' })

  const sprintData = useSelector((state: StoreType) => state.sprint.allSprints)

  // const items = [
  //   {
  //     title: 'Add column',
  //     onChoose: () => {
  //       setAddingColumn(true)
  //     }
  //   }
  // ]
  // #endregion

  // #region fetch data

  // get data from api
  const getBoard = async () => {
    try {
      // dispatch(showLoading())
      dispatch(setCreateColumn({ loading: true }))
      const res = await getBoardDetail({ id: id as string })
      if (res && res?.data) {
        const board = res.data
        if (board.columns && board.columnOrderIds) {
          const { columns, columnOrderIds } = board

          // reorder columns by order
          board.columns = mapOrder(columns, columnOrderIds, '_id')

          board.columns.forEach((column) => {
            // create key for each card base on baord identifier
            column.cards?.forEach((card) => {
              card.cardId = `${board.key}-${card.cardId}`
            })

            // add placeholder card if column does not have any
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
                label: { _id: '', name: '', color: '' },
                isActive: false,
                attachments: [],
                reporter: { _id: '', avatar: '', fullName: '' },
                description: ''
              })
              column.cardOrderIds = column.cards.map((c) => c._id)
            }
          })
          setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'))
          // console.log(mapOrder(columns, columnOrderIds, '_id'))
        }
        setBoard(board)
      }
    } catch (err) {
      const message = (err as AxiosError).message
      if (message === 'UNAUTHORIZED') {
        enqueueSnackbar('You cannot access this board', { variant: 'error' })
        navigate('/u', { replace: true })
      }
    } finally {
      // dispatch(hideLoading())
      dispatch(setCreateColumn({ loading: false }))
    }
  }

  // for api
  const getMembers = async () => {
    try {
      const res = await getAllMemberInBoard({ id: id as string })
      if (res && res?.data) {
        setMembers(res.data)
        dispatch(refreshMembers())
        dispatch(setMembersToStore(res.data))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getSprintsDetail = async () => {
    try {
      // fetch data in store
      dispatch(fetchSprints(id as string))
      const res = await getAllSprintsDetail(id as string)
      if (res) {
        // reorder columns by order
        const sprints = res
        sprints.forEach((sprint) => {
          sprint.cards = mapOrder(sprint.cards, sprint.cardOrderIds, '_id')
        })
        const customOrder = [
          SPRINT_STATUS.active,
          SPRINT_STATUS.active,
          SPRINT_STATUS.completed,
          SPRINT_STATUS.backlog
        ]
        // status active is alway first, then others, backlog is the last one
        sprints.sort((a, b) => {
          const indexA = customOrder.indexOf(a.status)
          const indexB = customOrder.indexOf(b.status)
          return indexA - indexB
        })
        setSprints(cloneDeep(sprints))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  // check if logged user is member of board
  const isMemberOfBoard = useCallback(() => {
    if (members) {
      return (
        members?.members.find((member) => member._id === userInfo?._id) ||
        members.oweners.find((owner) => owner._id === userInfo?._id)
      )
    }
  }, [members, userInfo?._id])

  useEffect(() => {
    getBoard()
  }, [id])

  useEffect(() => {
    if (board) {
      if (isMemberOfBoard()) {
        getUserPermission()
      }
      getAllPermission()
    }
  }, [id, board, isMemberOfBoard])

  useEffect(() => {
    // clear permission when get out of board
    return () => {
      dispatch(resetCurrentBoardPermission())
      dispatch(resetUserPermissionOnBoard())
      dispatch(refreshMembers())
    }
  }, [])

  useEffect(() => {
    if (board) {
      getMembers()
    }
  }, [id, board])

  useEffect(() => {
    if (board?.template === BOARD_TEMPLATE.SCRUM) {
      getSprintsDetail()
    }
  }, [id, board])

  useEffect(() => {
    const func = async () => {
      if (success) {
        await getBoard()
        dispatch(setCreateColumn({ success: false }))
        // focus adding column after add get new board data
        if (action === BOARD_RELOAD_REASON.CREATE_COLUMN) {
          setAddingColumn(true)
          dispatch(setCreateColumn({ action: BOARD_RELOAD_REASON.EMPTY }))
        }
      }
    }
    func()
  }, [success])

  useEffect(() => {
    const func = async () => {
      if (error) {
        await getBoard()
        dispatch(setCreateColumn({ error: false }))
      }
    }
    func()
  }, [error])

  useEffect(() => {
    if (shouldRefreshBoardDetail) {
      getBoard()
      dispatch(setShouldRefreshBoardDetail(false))
    }
  }, [shouldRefreshBoardDetail])

  useEffect(() => {
    if (columnStore.fakeColumn.show) {
      setBoard((prev) => {
        const newBoard = cloneDeep(prev)
        newBoard?.columns?.push({
          _id: FAKE_COLUMN_KEY,
          boardId: '',
          cardOrderIds: [],
          title: columnStore.fakeColumn.title,
          cards: [],
          createdAt: '',
          updatedAt: ''
        })

        newBoard?.columnOrderIds?.push(FAKE_COLUMN_KEY)
        setOrderedColumns(
          mapOrder(
            newBoard?.columns || [],
            newBoard?.columnOrderIds || [],
            '_id'
          )
        )
        dispatch(
          setFakeColumn({
            title: '',
            show: false,
            readyToHide: true
          })
        )
        return newBoard
      })
    }
  }, [columnStore.fakeColumn.show])

  useEffect(() => {
    if (cardStore.creatingCard.showFakeCard) {
      setBoard((prevBoard) => {
        const newBoard = cloneDeep(prevBoard)
        if (!newBoard) return prevBoard

        const addingColumn = newBoard?.columns?.find(
          (c: IColumn) => c._id === cardStore.creatingCard.columnId
        )
        if (!addingColumn) return prevBoard

        const fakeCard: ICard = {
          _id: FAKE_CARD_KEY,
          cardId:
            (board?.title.substring(0, 3).toUpperCase() as string) + '...',
          title: cardStore.creatingCard.title,
          boardId: '',
          columnId: cardStore.creatingCard.columnId,
          cover: undefined,
          memberIds: [],
          comments: [],
          startDate: '',
          dueDate: '',
          priority: 'medium',
          isDone: false,
          isOverdue: false,
          reporter: { _id: '', fullName: '', avatar: '' },
          isActive: false,
          description: '',
          FE_ONLY_CREATING: true
        }
        addingColumn.cards?.push(fakeCard)
        addingColumn.cardOrderIds?.push(fakeCard._id)
        newBoard.columns = newBoard?.columns?.map((col) =>
          col._id === cardStore.creatingCard.columnId ? addingColumn : col
        )
        setOrderedColumns(
          mapOrder(
            newBoard?.columns || [],
            newBoard?.columnOrderIds || [],
            '_id'
          )
        )
        dispatch(
          setCreatingCard({
            showFakeCard: false,
            title: '',
            columnId: '',
            readyToHide: true
          })
        )
        return newBoard
      })
    }
  }, [cardStore.creatingCard.showFakeCard])

  // 2024-06 update permission => check by admin permission
  const boardOwner = useCallback(() => {
    // 2024-05-24 update permission
    // const leadId = board?.ownerIds.find(
    //   (owner) => owner.role === 'boardLead'
    // )?.user
    // return members?.oweners.find((owner) => owner.user._id === leadId)?.user
    const leadId = board?.ownerIds[0]
    if (leadId) {
      return members?.oweners.find((owner) => owner._id === leadId)
    }
    return undefined
    // 2024-05-24 update permission
  }, [members, board])

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
        // console.log('Update all columns order successfully')
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
      // console.log('Changes >>>>>:', changes)
      if (fromColumnChange) {
        await updateTwoColumnsConcurrentLy([
          {
            ...fromColumnChange,
            boardId: board?._id as string
          },
          {
            ...toColumnChange,
            boardId: board?._id as string
          }
        ])
        await updateMovedCard(cardId as string, toColumnChange.id)
        // console.log('Update card orders in 2 column successfully')
      } else {
        const res = await updateColumn({
          ...toColumnChange,
          boardId: board?._id as string
        })
        if (res && res.data) {
          // console.log('Update card order in 1 column successfully')
        }
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      await getBoard()
    }
  }

  const updateMovedCard = async (cardId: string, newColumnId: string) => {
    // check permission before update card
    if (!canUpdateCard()) {
      enqueueSnackbar('Do not have permission to do this action!', {
        variant: 'error'
      })
      return
    }
    try {
      const res = await updateCard({
        cardId,
        changes: { columnId: newColumnId },
        boardId: board?._id as string
      })
      if (res && res.data) {
        await getBoard()
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
    // console.log('handleDragStart')
    // active: đối tượng bắt đầu kéo thả, bao gồm data được bind
    const { active } = e

    // 2024-06 update permission
    // // only admin can drag column
    // if (!isUserLeadOrAdmin() && !active.data.current?.columnId) return

    setActiveItemID(active.id)
    setActiveItemData(active.data.current as ICard | IColumn)
    if (active.data.current?.columnId) {
      if (!canUpdateCard()) return
      setActiveItem(ACTIVE_ITEM_TYPE.CARD)
      setOriginColumn(findColumnByCardID(active.id as string))
    } else {
      // only who can update column can drag column
      if (!canUpdateColumn()) return
      setActiveItem(ACTIVE_ITEM_TYPE.COLUMN)
    }
  }

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e
    if (!active || !over) return
    // Đã xử lý column rồi
    if (activeItem === ACTIVE_ITEM_TYPE.COLUMN) return
    // dragging card là card đang được kéo

    // check permission before drag over
    if (!canUpdateCard()) return

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
    // console.log('handleDragEnd')
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
            ) as IColumn
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
      ) as IColumn
      const nextOverColumn: IColumn = nextOrderColumns.find(
        (c: IColumn) => c._id === overColumn._id
      ) as IColumn
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
              label: { _id: '', name: '', color: '' },
              reporter: { _id: '', fullName: '', avatar: '' },
              isActive: false,
              description: ''
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

  const searchString = useSelector(
    (state: StoreType) => state.card.searchString
  )

  const handleChangeSearchString = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchString(event.target.value as string))
  }

  const getWSName = () => {
    if (!board) return
    const currentWS = boards.find((ws) => ws._id === board.teamWorkspaceId)
    return currentWS?.name || ''
  }

  const isTaskView = () =>
    matchPath(allRoutes.home.board.boardDetail.path, location.pathname)
  const isMemberView = () =>
    matchPath(allRoutes.home.board.boardMember.path, location.pathname)
  const isOverviewView = () =>
    matchPath(allRoutes.home.board.boardOverView.path, location.pathname)
  const isSettingsView = () =>
    matchPath(allRoutes.home.board.boardSettings.path, location.pathname)
  const isReportView = () => {
    return matchPath(allRoutes.home.board.boardReports.path, location.pathname)
  }

  const isKanbanView = () => viewType === 'Kanban'
  const isBacklogView = () => viewType === 'Backlog'
  const haveSprintActive = () => {
    if (sprints) {
      return sprints.find((sprint) => sprint.status === SPRINT_STATUS.active)
    }
  }

  /*
    Render title breadcrumb for each view
  */
  const renderBreadcrumbTitle = () => {
    if (isTaskView()) return TITLE.board.boardDetail
    else if (isMemberView()) return TITLE.board.boardMember
    else if (isOverviewView()) return TITLE.board.boardOverView
    else if (isSettingsView()) return TITLE.board.boardSettings
    else if (isReportView()) return TITLE.board.boardReports
  }

  const permissionStore = useSelector((state: StoreType) => state.permission)
  const getAllPermission = async () => {
    if (!id) return
    try {
      await dispatch(getBoardPermission(id as string))
    } catch (error) {
      // enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    }
  }

  // const permission of logged user
  const getUserPermission = async () => {
    if (!id) return
    try {
      await dispatch(getUserPermissionOnBoard(id as string))
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    }
  }

  // show error message when get board permission failed
  useEffect(() => {
    if (permissionStore.getBoardPermissionStatus === 'error') {
      enqueueSnackbar(
        `Get permission error: ${permissionStore.getBoardPermissionErrMessage}`,
        { variant: 'error' }
      )
      dispatch(resetCurrentBoardPermissionState())
    }
  }, [
    permissionStore.getBoardPermissionStatus,
    permissionStore.getBoardPermissionErrMessage
  ])

  // show error message when get user permission failed
  useEffect(() => {
    if (permissionStore.getUserPermissionOnBoardStatus === 'error') {
      enqueueSnackbar(
        `Get permission error: ${permissionStore.getUserPermissionOnBoardErrMsg}`,
        { variant: 'error' }
      )
      dispatch(resetUserPermissionOnBoardState())
    }
  }, [
    permissionStore.getUserPermissionOnBoardStatus,
    permissionStore.getUserPermissionOnBoardErrMsg
  ])

  return (
    <DndContext
      onDragStart={handleDragStart}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      // Thuật toán xử lý va chạm
      // Cần dùng loại closest-corners thì card bự mới move được
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={collisionDetectionStrategy}>
      <BoardDetailContainer>
        <TitleHeader $img={board?.cover}>
          <div className="left-block">
            <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%' }}>
              {/* Workspace */}
              <Link
                to={`/u/workspaces/${board?.teamWorkspaceId}`}
                color="inherit"
                className="breadcrumb__item">
                {getWSName()}
              </Link>

              {/* Current board */}
              <div
                className="board-info"
                onClick={() =>
                  navigate(
                    generatePath(allRoutes.home.board.boardDetail.path, {
                      boardId: id as string
                    })
                  )
                }>
                <div className="board-avatar"></div>
                <div className="title-container">
                  <span className="title">{board?.title}</span>
                  <ProjectType $type={(board?.template as string) || 'kanban'}>
                    {board?.template}
                  </ProjectType>
                  {/* <p className="description">{board?.description}</p> */}
                </div>
              </div>
              {renderBreadcrumbTitle() && <div>{renderBreadcrumbTitle()}</div>}
            </Breadcrumbs>
          </div>

          <div className="right-block">
            {/* Change view */}
            <BoardViewMenu />

            {isAdmin() && (
              <IconButton
                onClick={() => setShouldShowBoardMenu(true)}
                size="small">
                <RiMore2Fill />
              </IconButton>
            )}
          </div>
        </TitleHeader>

        <Divider></Divider>

        {/* Header for specific board view */}

        {/* TASK */}
        {isTaskView() && (
          <TypeHeader>
            <TypeMenu>
              {viewList.map((type) => (
                <TypeItem
                  className={clsx(viewType === type && 'index')}
                  onClick={() => setViewType(type)}
                  key={type}>
                  {type}
                </TypeItem>
              ))}
            </TypeMenu>

            <div style={{ display: 'flex', gap: '8px' }}>
              {/* current chosen filter option */}
              <CurrentFilters />

              {/* Filter task option list*/}
              <FilterMenu board={board} />

              {/* Add column or add card */}
              {/* {isAdmin() && items.length > 0 && (
                <AddMenu items={isAdmin() ? items : items.slice(0, 1)} />
              )} */}

              {/* Search card */}
              <SearchBox
                label=""
                sx={{ height: '35px' }}
                onChange={handleChangeSearchString}
                value={searchString}
              />
            </div>
          </TypeHeader>
        )}

        {
          // TASK VIEW + KANBAN
          isTaskView() && isKanbanView() && (
            <Body>
              {!board?.columns && <BoardDetailLoading />}

              {orderedColumns && (
                <SortableContext
                  items={orderedColumns.map((c) => c._id) as string[]}
                  strategy={horizontalListSortingStrategy}
                  id={board?._id}>
                  {orderedColumns &&
                    orderedColumns.map((column) => (
                      <Column
                        column={column}
                        key={column._id}
                        initColumnId={board?.initColumnId as string}
                      />
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
                    initColumnId={board?.initColumnId as string}
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

              {canAddColumn() && (
                <AddColumnButton
                  addingColumn={addingColumn}
                  setFocus={handleAddingColumn}
                  boardId={board?._id as string}
                />
              )}

              {board?.columns &&
                orderedColumns.length === 0 &&
                !canAddColumn() && (
                  <Empty description="Board is empty!" isFullWidth pY={50} />
                )}
            </Body>
          )
        }

        {
          // TASK VIEW + BACKLOG
          isTaskView() && isBacklogView() && (
            <Body className="backlog">
              {sprints.map((sprint) => (
                <Sprint
                  key={sprint._id}
                  sprint={sprint}
                  board={board as IBoard}
                  canStartSprint={!haveSprintActive()}
                  updateSuccessCb={getSprintsDetail}
                />
              ))}

              <SprintActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddingSprint(true)}>
                  Create sprint
                </Button>
              </SprintActions>

              <AddSprintDialog
                board={board as IBoard}
                createSuccessCb={getSprintsDetail}
                open={openAddSprint}
                onCancel={() => handleAddingSprint(false)}
                mode={SPRINT_MODAL_VIEW_MODE.create}
              />
            </Body>
          )
        }

        <Routes>
          <Route element={<BoardViewLayout />} path="*">
            <Route
              path={allRoutes.home.board.boardOverView.segment}
              element={<BoardOverview />}
            />
            <Route
              path={allRoutes.home.board.boardMember.segment}
              element={
                <BoardMember
                  members={members}
                  leaderId={boardOwner()?._id}
                  board={board}
                />
              }
            />
            <Route
              path={allRoutes.home.board.boardReports.segment}
              element={<BoardReports />}
            />
            <Route
              path={allRoutes.home.board.boardSettings.segment}
              element={<BoardSettings />}
            />
          </Route>
        </Routes>

        <AddMemberPopup />

        {/* ACTIONS MENU */}
        {canCreateCard() && isKanbanView() && <ActionMenu />}

        {/* ADD CARD DIALOG */}
        {canCreateCard() && <AddCardDialog board={board as IBoard} />}
      </BoardDetailContainer>

      {board && members && (
        <BoardMenu
          onClose={handleCloseBoardMenu}
          shouldShow={shouldShowBoardMenu}
          board={board}
          owner={boardOwner() as IMemberInBoard}
        />
      )}

      <Outlet />
    </DndContext>
  )
}

export default BoardDetail
