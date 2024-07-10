import { IActionIssueTypeModalProps, IFormFields, schema } from './helpter'
import WindowDialog from '~/components/dialog/WIndowDialog'
import './styles.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useState, useEffect } from 'react'
import IssueIconPicker from '~/components/IssueIconPicker'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import {
  createIssueType,
  updateIssueType
} from '~/redux/issueTypeSlice/actions'
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
export default function ModalActionIssueType(
  props: IActionIssueTypeModalProps
) {
  const {
    visible,
    setVisible,
    selectedIssueType,
    refetch,
    setSelectedIssueType
  } = props
  const initSelectHierarchy = selectedIssueType
    ? 'hierarchy' in selectedIssueType &&
      typeof selectedIssueType.hierarchy === 'number'
      ? selectedIssueType.hierarchy
      : 2
    : 2
  const initSelectedIcon = selectedIssueType
    ? 'icon' in selectedIssueType && typeof selectedIssueType.icon === 'string'
      ? selectedIssueType.icon
      : ''
    : ''
  const [selectHierarchy, setSelectHierarchy] =
    useState<number>(initSelectHierarchy)
  const [selectedIcon, setSelectedIcon] = useState(initSelectedIcon)
  const loading = useSelector((state: StoreType) => state.issueType.loading)
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
      name: selectedIssueType ? selectedIssueType.name : '',
      description: selectedIssueType
        ? 'description' in selectedIssueType
          ? selectedIssueType.description
          : ''
        : ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (selectedIssueType) {
      if ('hierarchy' in selectedIssueType) {
        setSelectHierarchy(selectedIssueType.hierarchy as number)
      }
      if ('icon' in selectedIssueType) {
        setSelectedIcon(selectedIssueType.icon as string)
      }
      setValue('name', selectedIssueType.name)
      if ('description' in selectedIssueType) {
        setValue('description', selectedIssueType.description)
      }
    } else {
      reset()
      setSelectHierarchy(initSelectHierarchy)
      setSelectedIcon(initSelectedIcon)
    }
  }, [selectedIssueType])

  const resetData = () => {
    reset()
    setSelectHierarchy(initSelectHierarchy)
    setSelectedIcon(initSelectedIcon)
  }

  const onSubmit = (data: IFormFields) => {
    const { name, description } = data
    const dataSubmit = {
      name: name || '',
      description: description || '',
      hierarchy: selectHierarchy,
      icon: selectedIcon
    }
    const callback = () => {
      setVisible(false)
      resetData()
      refetch()
    }
    if (!selectedIssueType) {
      const payload = {
        boardId: boardId || '',
        data: dataSubmit,
        cb: () => callback()
      }
      dispatch(createIssueType(payload))
    } else {
      const payload = {
        issueTypeId: selectedIssueType._id || '',
        boardId: boardId || '',
        data: dataSubmit,
        cb: () => callback()
      }
      dispatch(updateIssueType(payload))
    }
  }

  const onClose = () => {
    setVisible(false)
    resetData()
    setSelectedIssueType(null)
  }

  return (
    <WindowDialog
      onClose={onClose}
      open={visible}
      title={selectedIssueType ? 'Edit Issue Type' : 'Add Issue Type'}>
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
          <div className="formItemHorizontal">
            <FormControl
              variant="outlined"
              error={!!errors.hierarchy}
              sx={{ minWidth: '50%' }}
              size="small">
              <InputLabel id="hierarchy-label">Hierarchy</InputLabel>
              <Select
                labelId="hierarchy-label"
                label="Hierarchy"
                value={selectHierarchy}
                onChange={(e) => setSelectHierarchy(Number(e.target.value))}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <IssueIconPicker
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
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
