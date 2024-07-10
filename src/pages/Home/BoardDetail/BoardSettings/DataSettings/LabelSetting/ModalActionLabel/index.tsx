import './styles.scss'
import { IActionLabelModalProps, IFormFields, schema } from './helper'
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
import ColorPicker from '~/components/ColorPicker'
import { createLabelThunk, updateLabelThunk } from '~/redux/labelSlice/actions'
export default function ModalActionLabel(props: IActionLabelModalProps) {
  const { visible, setVisible, selectedLabel, refetch, setSelectedLabel } =
    props
  const initColor = selectedLabel
    ? 'color' in selectedLabel
      ? selectedLabel.color
      : '#fff'
    : '#fff'
  const [selectedColor, setSelectedColor] = useState<string>(initColor)
  const loading = useSelector((state: StoreType) => state.label.loading)
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
      name: selectedLabel ? selectedLabel.name : ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (selectedLabel) {
      if ('color' in selectedLabel) {
        setSelectedColor(selectedLabel.color)
      }
      setValue('name', selectedLabel.name)
    } else {
      resetData()
    }
  }, [selectedLabel])

  const resetData = () => {
    reset()
    setSelectedColor('#fff')
  }

  const onSubmit = (data: IFormFields) => {
    const { name } = data

    const callback = () => {
      setVisible(false)
      resetData()
      refetch()
    }
    if (!selectedLabel) {
      const payload = {
        data: {
          name: name,
          color: selectedColor,
          boardId: boardId || '',
          cb: () => callback()
        }
      }
      dispatch(createLabelThunk(payload))
    } else {
      const payload = {
        data: {
          labelId: selectedLabel._id || '',
          changes: {
            name: name,
            color: selectedColor
          },
          boardId: boardId || '',
          cb: () => callback()
        }
      }
      dispatch(updateLabelThunk(payload))
    }
  }

  const onClose = () => {
    setVisible(false)
    resetData()
    setSelectedLabel(null)
  }

  return (
    <WindowDialog
      onClose={onClose}
      open={visible}
      title={selectedLabel ? 'Edit Label' : 'Add Label'}>
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
