import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

// component libraries
import { IconButton } from '@mui/material'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

// components
import { ActionGroup, AddZone, Error, Form, Input, Modal } from './styles'

// services
import IFormFields from './IFormFields'
import schema from './formSchema'
import { setCreateColumn } from '~/redux/boardSlice'
import { createCard } from '~/services/cardService'
import { setCreatingCard } from '~/redux/cardSlice'
import { StoreType } from '~/redux'
import usePermission from '~/hooks/usePermission'

const ColumnFooter = ({
  columnId,
  boardId
}: {
  columnId: string
  boardId: string
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const [isAddingCard, setIsAddingCard] = useState(false)
  const cardStore = useSelector((store: StoreType) => store.card)

  const userPermission = usePermission()
  const canCreateCard = () => userPermission?.card.create

  const handleFocus = () => {
    setIsAddingCard(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleUnFocus = () => {
    setIsAddingCard(false)
    reset()
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IFormFields>({
    defaultValues: { name: '' },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })
  const { ref } = register('name')

  useEffect(() => {
    if (inputRef.current) {
      ref(inputRef.current)
    }
  })

  /*
    1. when creating card, add a fake card to the column to improve ux
    2. when card create successfully, reload data (cards)
    3. then fake card will be removed
  */
  useEffect(() => {
    if (cardStore.creatingCard.readyToHide) {
      dispatch(
        setCreatingCard({
          showFakeCard: false,
          title: '',
          columnId: '',
          readyToHide: false
        })
      )
    }
  }, [cardStore.creatingCard.readyToHide])

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    if (!canCreateCard()) return
    try {
      reset()
      dispatch(
        setCreatingCard({
          showFakeCard: true,
          title: data.name,
          columnId,
          readyToHide: false
        })
      )
      const res = await createCard({
        title: data.name,
        columnId: columnId,
        boardId: boardId
      })
      if (res) {
        dispatch(setCreateColumn({ success: true }))
      }
    } catch (err) {
      const message = (err as AxiosError).message
      enqueueSnackbar(message, { variant: 'error' })
      dispatch(setCreateColumn({ errorr: true }))
    }
  }

  const handleClose = () => {
    handleUnFocus()
    reset()
  }

  return (
    <AddZone onMouseDownCapture={(e) => e.stopPropagation()}>
      {isAddingCard && <Modal onClick={handleClose} />}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(isAddingCard && 'is-focused')}>
        <Input
          //   $isShow={isAddingCard}
          className={clsx(isAddingCard && 'is-focused')}
          placeholder="Add card"
          {...register('name')}
          ref={inputRef}
          onFocus={handleFocus}></Input>
        <Error>{errors.name?.message}</Error>
        {isAddingCard && (
          <ActionGroup>
            <IconButton
              // variant="contained"
              color="error"
              sx={{ p: '4px', height: '0', minWidth: 'unset' }}
              onClick={handleClose}>
              <RiCloseLine />
            </IconButton>
            <IconButton
              type="submit"
              // variant="contained"
              color="success"
              sx={{ p: '4px', height: '0', minWidth: 'unset' }}>
              <RiCheckLine />
            </IconButton>
          </ActionGroup>
        )}
      </Form>
    </AddZone>
  )
}
export default ColumnFooter
