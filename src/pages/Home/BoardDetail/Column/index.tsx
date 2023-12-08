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
  Modal
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

const Column = ({
  column,
  className
}: {
  column: IColumn
  className?: string
}) => {
  const [showModal, setShowModal] = useState(false)
  const [isMouseDowing, setIsMouseDowning] = useState(false)
  const handleChangeMouseGrabing = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.currentTarget.style.cursor = 'grabbing'
  }
  const handleChangeMouseGrab = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.currentTarget.style.cursor = 'grab'
  }

  const handleFocus = (target: HTMLInputElement) => {
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
    try {
      const res = await updateColumn({
        id: column._id,
        changes: {
          title: data.name
        }
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
    height: 'fit-content'
  }

  const isColumnEmpty = useCallback(() => {
    return column.cards?.filter((c) => !c.FE_ONLY_PLACEHOLDER).length === 0
  }, [column])

  return (
    <DnDContainer ref={setNodeRef} {...attributes} style={style} {...listeners}>
      <ColumnContainer
        className={clsx(isColumnEmpty() && 'collapse-space', className)}
      >
        <Header>
          <p
            className="icon"
            onMouseDown={handleChangeMouseGrabing}
            onMouseUp={handleChangeMouseGrab}
          >
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
                onBlur={handleBlur}
              ></Input>
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
                    onClick={handleCloseEditTitleMode}
                  >
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
                    }}
                  >
                    Save
                  </MuiButton>
                </ActionGroup>
              )}
            </Form>
            <p className="cards-count">
              {column.cards?.filter((c) => !c.FE_ONLY_PLACEHOLDER).length}
            </p>
            <div className="add-task-button">
              <RiAddFill />
            </div>
          </div>
          <IconButton>
            <RiMore2Fill />
          </IconButton>
        </Header>
        {column.cards && (
          <CardsContainer>
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={column.cardOrderIds}
              id={column._id}
            >
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
        <ColumnFooter columnId={column._id} />
      </ColumnContainer>
    </DnDContainer>
  )
}
export default Column
