import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

// component libraries
import { RiAddFill, RiDraggable, RiMore2Fill } from 'react-icons/ri'
import { IconButton, Button as MuiButton } from '@mui/material'

// components
import Card from './Card'
import {
  ActionGroup,
  CardsContainer,
  ColumnContainer,
  DnDContainer,
  Error,
  Form,
  Header,
  Input,
  Modal,
  PreventDrag,
  TestDiv
} from './styles'

// services
import { ICard, IColumn } from '~/services/types'
import IFormFields from './IFormFields'
import schema from './formSchema'
import { updateColumn } from '~/services/columnService'
import ColumnFooter from './ColumnFooter'

// Dnd specific
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import mapOrder from '~/utils/mapOrder'
import usePermission from '~/hooks/usePermission'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import useInfo from '~/hooks/useInfo'
import { SPRINT_STATUS } from '~/utils/constant'

const Column = ({
  column,
  className,
  initColumnId
}: {
  column: IColumn
  className?: string
  initColumnId: string
}) => {
  const [showModal, setShowModal] = useState(false)
  const [isMouseDowing, setIsMouseDowning] = useState(false)
  const userPermission = usePermission()
  const filters = useSelector((state: StoreType) => state.card.filter)
  const loggedUserInfo = useInfo()
  const isAssignToMeApplied = () => filters.assignToMe
  const isCurrentSprintApplied = () => filters.currentSprint
  const sprintData = useSelector((state: StoreType) => state.sprint.allSprints)

  // const handleChangeMouseGrabing = (
  //   event: React.MouseEvent<HTMLParagraphElement>
  // ) => {
  //   event.currentTarget.style.cursor = 'grabbing'
  // }
  // const handleChangeMouseGrab = (
  //   event: React.MouseEvent<HTMLParagraphElement>
  // ) => {
  //   event.currentTarget.style.cursor = 'grab'
  // }

  // check permission on edit column
  const canEditColumn = () => userPermission?.column.update
  // check permission on create card
  const canCreateCard = () => userPermission?.card.create
  // check permission on update card
  const canUpdateCard = () => userPermission?.card.update

  // check if a column is initial column
  const isInitColumn = () => initColumnId === column._id

  // open edit form
  const handleFocus = (target: HTMLInputElement) => {
    // check permission on edit column
    if (!canEditColumn()) return

    target.select()
    target.style.zIndex = '10'
    setShowModal(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.zIndex = '0'
  }

  const handleCloseEditTitleMode = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation()
    setShowModal(false)
    reset()
  }

  const countShowCard = () => {
    let resultList = column.cards
    resultList = resultList?.filter((c) => !c.FE_ONLY_PLACEHOLDER)

    // filter by assign to me
    if (isAssignToMeApplied()) {
      resultList = resultList?.filter((card) =>
        card.memberIds.find((mem) => mem._id === loggedUserInfo?._id)
      )
    }

    if (isCurrentSprintApplied()) {
      const currentSprint = sprintData.find(
        (sprint) => sprint.status === SPRINT_STATUS.active
      )
      if (currentSprint) {
        resultList = resultList?.filter(
          (card) => card.sprintId === currentSprint._id
        )
      }
    }

    return resultList?.length
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IFormFields>({
    defaultValues: { name: column.title },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    // check permission on update column

    try {
      const res = await updateColumn({
        id: column._id,
        changes: {
          title: data.name
        },
        boardId: column.boardId
      })
      if (res) {
        // reset the ui name -> no need to refresh board
        column.title = res.data.title
        reset({ name: res.data.title })
        handleCloseEditTitleMode()
      }
    } catch (err) {
      // setShowingColumnName(column.title)
      const message = (err as AxiosError).message
      enqueueSnackbar(message, { variant: 'error' })
    }
  }

  const {
    transform,
    transition,
    setNodeRef,
    attributes,
    listeners,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: '-moz-available'
  }

  const isColumnEmpty = useCallback(() => {
    return column.cards?.filter((c) => !c.FE_ONLY_PLACEHOLDER).length === 0
  }, [column])

  const preventDrag = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (!event) return
    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <TestDiv>
      <DnDContainer
        ref={setNodeRef}
        {...attributes}
        style={style}
        {...listeners}
        className={clsx(!canEditColumn() && 'opa-1-persist')}>
        <ColumnContainer
          className={clsx(isColumnEmpty() && 'collapse-space', className)}>
          {/* COLUMN HEADER */}
          <Header>
            <p className={clsx('icon', !canEditColumn() && 'not-allowed')}>
              <RiDraggable />
            </p>
            <div className="title">
              {showModal && <Modal onClick={handleCloseEditTitleMode} />}
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className={clsx(showModal && 'showing-modal')}
                // onMouseDownCapture={(e) => e.stopPropagation()}
              >
                <Input
                  className={clsx('name', showModal && 'is-focus')}
                  onMouseDown={() => {
                    setIsMouseDowning(true)
                  }}
                  onMouseMove={() => {
                    if (isMouseDowing) {
                      setShowModal(false)
                    }
                  }}
                  onMouseUp={() => {
                    setIsMouseDowning(false)
                  }}
                  // onFocus={}
                  onClick={(e) => handleFocus(e.target as HTMLInputElement)}
                  {...register('name')}
                  onBlur={handleBlur}></Input>
                <Error>{errors.name?.message}</Error>
                {showModal && (
                  <ActionGroup>
                    <MuiButton
                      variant="contained"
                      color="error"
                      sx={{
                        p: '2px 10px',
                        height: '0',
                        minWidth: 'unset',
                        fontSize: '12px'
                      }}
                      onClick={handleCloseEditTitleMode}>
                      Cancel
                    </MuiButton>
                    <MuiButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        p: '2px 10px',
                        height: '0',
                        minWidth: 'unset',
                        fontSize: '12px'
                      }}>
                      Save
                    </MuiButton>
                  </ActionGroup>
                )}
              </Form>
              <p className="cards-count">{countShowCard()}</p>
              {/* <div className="add-task-button">
                <RiAddFill />
              </div> */}
            </div>
            {/* <IconButton size="small">
              <RiMore2Fill />
            </IconButton> */}
          </Header>

          {/* CARDS LIST [CAN DRAG] */}
          {column.cards && canUpdateCard() && (
            <CardsContainer>
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={column.cardOrderIds}
                id={column._id}>
                {mapOrder(
                  column.cards as ICard[],
                  column.cardOrderIds,
                  '_id'
                ).map((card) => (
                  <Card card={card} key={card._id} />
                ))}
              </SortableContext>
            </CardsContainer>
          )}

          {/* CARDS LIST [CAN NOT DRAG] */}
          {column.cards && !canUpdateCard() && (
            <CardsContainer>
              {mapOrder(
                column.cards as ICard[],
                column.cardOrderIds,
                '_id'
              ).map((card) => (
                <Card card={card} key={card._id} className="opa-1-persist" />
              ))}
            </CardsContainer>
          )}

          {/* COLUMN FOOTER */}
          {canCreateCard() && isInitColumn() && (
            <ColumnFooter columnId={column._id} boardId={column.boardId} />
          )}
        </ColumnContainer>
        <PreventDrag
          onMouseDown={preventDrag}
          onMouseDownCapture={preventDrag}
        />
      </DnDContainer>
    </TestDiv>
  )
}
export default Column
