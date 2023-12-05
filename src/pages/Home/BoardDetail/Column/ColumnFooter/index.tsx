import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

// component libraries

// components
import { ActionGroup, AddZone, Error, Form, Input, Modal } from './styles'

// services
import IFormFields from './IFormFields'
import schema from './formSchema'
import { setCreateColumn } from '~/redux/boardSlice'
import clsx from 'clsx'
import { createCard } from '~/services/cardService'
import { IconButton } from '@mui/material'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

const ColumnFooter = ({ columnId }: { columnId: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const [isAddingCard, setIsAddingCard] = useState(false)

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

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const res = await createCard({
        title: data.name,
        columnId: columnId
      })
      if (res) {
        dispatch(setCreateColumn({ success: true }))
        handleClose()
      }
    } catch (err) {
      const message = (err as AxiosError).message
      enqueueSnackbar(message, { variant: 'error' })
    }
  }

  const handleClose = () => {
    handleUnFocus()
    reset()
  }

  return (
    <AddZone>
      {isAddingCard && <Modal onClick={handleClose} />}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(isAddingCard && 'is-focused')}
      >
        <Input
          //   $isShow={isAddingCard}
          className={clsx(isAddingCard && 'is-focused')}
          placeholder="Add card"
          {...register('name')}
          ref={inputRef}
          onFocus={handleFocus}
        ></Input>
        <Error>{errors.name?.message}</Error>
        {isAddingCard && (
          <ActionGroup>
            <IconButton
              // variant="contained"
              color="error"
              sx={{ p: '4px', height: '0', minWidth: 'unset' }}
              onClick={handleClose}
            >
              <RiCloseLine />
            </IconButton>
            <IconButton
              type="submit"
              // variant="contained"
              color="success"
              sx={{ p: '4px', height: '0', minWidth: 'unset' }}
            >
              <RiCheckLine />
            </IconButton>
          </ActionGroup>
        )}
      </Form>
    </AddZone>
  )
}
export default ColumnFooter
