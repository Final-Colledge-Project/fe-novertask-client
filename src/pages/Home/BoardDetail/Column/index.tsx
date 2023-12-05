import { useState } from 'react'
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
  Error,
  Form,
  Header,
  Input,
  Modal
} from './styles'

// services
import { IColumn } from '~/services/types'
import IFormFields from './IFormFields'
import schema from './formSchema'
import { updateColumn } from '~/services/columnService'
import ColumnFooter from './ColumnFooter'

const Column = ({ column }: { column: IColumn }) => {
  const [showModal, setShowModal] = useState(false)
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

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
    event.target.style.zIndex = '10'
    setShowModal(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.zIndex = '0'
  }

  const handleCloseEditTitleMode = () => {
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

  return (
    <ColumnContainer>
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
          >
            <Input
              className="name"
              onFocus={handleFocus}
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
          <p className="cards-count">{column.cardOrderIds.length}</p>
          <div className="add-task-button">
            <RiAddFill />
          </div>
        </div>
        <IconButton>
          <RiMore2Fill />
        </IconButton>
      </Header>
      {column.cards && column.cards.length > 0 && (
        <CardsContainer>
          {column.cards.map((card) => (
            <Card card={card} key={card._id} />
          ))}
        </CardsContainer>
      )}
      {/* <Footer>Add card</Footer> */}
      <ColumnFooter columnId={column._id} />
    </ColumnContainer>
  )
}
export default Column
