import { IFormFields, schema } from './helper'
import WindowDialog from '~/components/dialog/WIndowDialog'
import './styles.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { IActionPriorityModalProps } from './helper'
import { createPriority, updatePriority } from '~/redux/prioritySlice/actions'
import ColorPicker from '~/components/ColorPicker'
export default function ModalActionPriority(props: IActionPriorityModalProps) {
  const {
    visible,
    setVisible,
    selectedPriority,
    refetch,
    setSelectedPriority
  } = props
  const initColor = selectedPriority
    ? 'color' in selectedPriority
      ? selectedPriority.color
      : '#fff'
    : '#fff'
  const [selectedColor, setSelectedColor] = useState<string>(initColor)
  const loading = useSelector((state: StoreType) => state.priority.loading)
  const dispatch = useDispatch<StoreDispatchType>()
  const { id: boardId } = useParams()
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IFormFields>({
    defaultValues: {
      name: selectedPriority ? selectedPriority.name : '',
      description: selectedPriority
        ? 'description' in selectedPriority
          ? selectedPriority.description
          : ''
        : ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (selectedPriority) {
      if ('color' in selectedPriority) {
        setSelectedColor(selectedPriority.color)
      }
      setValue('name', selectedPriority.name)
      if ('description' in selectedPriority) {
        setValue('description', selectedPriority.description)
      }
    } else {
      resetData()
    }
  }, [selectedPriority])

  const resetData = () => {
    reset()
    setSelectedColor('#fff')
  }

  const onSubmit = (data: IFormFields) => {
    const { name, description } = data
    const dataSubmit = {
      name: name || '',
      description: description || '',
      color: selectedColor
    }
    const callback = () => {
      setVisible(false)
      resetData()
      refetch()
    }
    if (!selectedPriority) {
      const payload = {
        boardId: boardId || '',
        data: dataSubmit,
        cb: () => callback()
      }
      dispatch(createPriority(payload))
    } else {
      const payload = {
        priorityId: selectedPriority._id || '',
        boardId: boardId || '',
        data: dataSubmit,
        cb: () => callback()
      }
      dispatch(updatePriority(payload))
    }
  }

  const onClose = () => {
    setVisible(false)
    resetData()
    setSelectedPriority(null)
  }

  return (
    <WindowDialog
      onClose={onClose}
      open={visible}
      title={selectedPriority ? 'Edit Priority' : 'Add Priority'}>
      <div className="modalSettingWrapper">
        <form className="settingForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <TextField
              label="Name"
              variant="outlined"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              sx={{ width: '100%' }}
            />
          </div>
          <div className="formItem">
            <TextField
              label="Description"
              variant="outlined"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
              sx={{ width: '100%' }}
            />
          </div>
          <div className="formItem">
            <Typography>Color:</Typography>
            <ColorPicker
              chosenColor={selectedColor}
              onChange={setSelectedColor}
              placement="top-start"
            />
          </div>
          <div className="btnGroup">
            <Button variant="text" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={loading ? <LoadingOutlined /> : null}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </WindowDialog>
  )
}
