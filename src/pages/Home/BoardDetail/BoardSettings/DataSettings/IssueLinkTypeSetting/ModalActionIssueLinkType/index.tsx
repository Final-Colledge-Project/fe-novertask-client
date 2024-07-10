import { IActionIssueLinkTypeModalProps, IFormFields, schema } from './helper'
import WindowDialog from '~/components/dialog/WIndowDialog'
import './styles.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import {
  createIssueLinkType,
  updateIssueLinkType
} from '~/redux/issueLinkTypeSlice/actions'
export default function ModalActionLinkIssueType(
  props: IActionIssueLinkTypeModalProps
) {
  const {
    visible,
    setVisible,
    selectedIssueLinkType,
    refetch,
    setSelectedIssueLinkType
  } = props
  const loading = useSelector((state: StoreType) => state.issueLinkType.loading)
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
      name: selectedIssueLinkType ? selectedIssueLinkType.name : '',
      inwardName: selectedIssueLinkType
        ? 'inwardName' in selectedIssueLinkType
          ? selectedIssueLinkType.inwardName
          : ''
        : '',
      outwardName: selectedIssueLinkType
        ? 'outwardName' in selectedIssueLinkType
          ? selectedIssueLinkType.outwardName
          : ''
        : ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (selectedIssueLinkType) {
      setValue('name', selectedIssueLinkType.name)
      if ('inwardName' in selectedIssueLinkType) {
        setValue('inwardName', selectedIssueLinkType.inwardName)
      }
      if ('outwardName' in selectedIssueLinkType) {
        setValue('outwardName', selectedIssueLinkType.outwardName)
      }
    } else {
      reset()
    }
  }, [selectedIssueLinkType])

  const onSubmit = (data: IFormFields) => {
    const callback = () => {
      setVisible(false)
      refetch()
    }
    if (!selectedIssueLinkType) {
      const payload = {
        boardId: boardId || '',
        data: data,
        cb: () => callback()
      }
      dispatch(createIssueLinkType(payload))
    } else {
      const payload = {
        issueLinkTypeId: selectedIssueLinkType._id || '',
        boardId: boardId || '',
        data: data,
        cb: () => callback()
      }
      dispatch(updateIssueLinkType(payload))
    }
  }

  const onClose = () => {
    setVisible(false)
    reset()
    setSelectedIssueLinkType(null)
  }

  return (
    <WindowDialog
      onClose={onClose}
      open={visible}
      title={
        selectedIssueLinkType ? 'Edit Link issue type' : 'Add Link issue type'
      }>
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
              label="Inward"
              variant="outlined"
              {...register('inwardName')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              sx={{ width: '100%' }}
            />
          </div>
          <div className="formItem">
            <TextField
              label="Outward"
              variant="outlined"
              {...register('outwardName')}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              sx={{ width: '100%' }}
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
