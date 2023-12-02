import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'

// component libraries
import MuiButton from '@mui/material/Button'

// components
import {
  ActionGroup,
  AddZone,
  Button,
  Error,
  Form,
  Input,
  Modal
} from './styles'

// services
import IFormFields from './IFormFields'
import schema from './formSchema'
import { createColumn } from '~/services/columnService'
import { setCreateColumn } from '~/redux/boardSlice'

const AddColumnButton = ({
  addingColumn,
  setFocus,
  boardId
}: {
  addingColumn: boolean
  setFocus: (val: boolean) => void
  boardId: string
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (inputRef.current && addingColumn === true) {
      if (inputRef.current.parentElement?.parentElement?.parentElement) {
        const scrollElement =
          inputRef.current.parentElement.parentElement.parentElement
        const parent = inputRef.current.parentElement.parentElement
        scrollElement.scrollTo({
          left: parent?.offsetLeft || 0,
          top: 0,
          behavior: 'smooth'
        })
      }
      inputRef.current.focus({ preventScroll: true })
    }
  }, [addingColumn])

  const handleFocus = () => {
    if (inputRef.current) {
      setFocus(true)
      inputRef.current.focus()
    }
  }

  const handleUnFocus = () => {
    if (inputRef.current) {
      setFocus(false)
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
      const res = await createColumn({ title: data.name, boardId })
      if (res) {
        // enqueueSnackbar('Add column successfully', { variant: 'success' })
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
      <Button $isShow={!addingColumn} onClick={handleFocus}>
        + Add Column
      </Button>
      {addingColumn && <Modal onClick={handleClose} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          $isShow={addingColumn}
          {...register('name')}
          ref={inputRef}
          // aria-invalid={errors.name ? 'true' : 'false'}
        ></Input>
        <Error>{errors.name?.message}</Error>
        {addingColumn && (
          <ActionGroup>
            <MuiButton
              variant="contained"
              color="error"
              sx={{ p: '2px 10px', height: '0', minWidth: 'unset' }}
              onClick={handleClose}
            >
              Cancel
            </MuiButton>
            <MuiButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{ p: '2px 10px', height: '0', minWidth: 'unset' }}
            >
              Add
            </MuiButton>
          </ActionGroup>
        )}
      </Form>
    </AddZone>
  )
}
export default AddColumnButton
