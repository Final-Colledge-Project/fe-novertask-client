import './style.scss'
import { ISchedule } from '~/services/types'
import { useState } from 'react'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { PiEyeLight } from 'react-icons/pi'
import { Button, ColorPicker, Modal } from 'antd'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './formSchema'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateScheduleReducer } from '~/redux/scheduleSlice/actions'
interface ICalendarItemProps {
  schedule: ISchedule
}

interface IFormFields {
  name: string
}
const CalendarItem = ({ schedule }: ICalendarItemProps) => {
  const [colorHex, setColorHex] = useState<string>(schedule.color)
  const { loading } = useSelector(
    (state: StoreType) => state.schedule
  ).updateSchedule
  const dispatch = useDispatch<StoreDispatchType>()
  const handleChangeColor = (_, value: string) => {
    setColorHex(value)
  }
  const formName = 'scheduleForm'
  const form = useForm<IFormFields>({
    defaultValues: {
      name: schedule.name
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    reset()
    setColorHex(schedule.color)
    setIsModalOpen(false)
  }

  const onSubmit = (data: IFormFields) => {
    const { name } = data
    dispatch(
      updateScheduleReducer({
        id: schedule._id,
        data: { name, color: colorHex }
      })
    )
    setIsModalOpen(false)
  }

  return (
    <div>
      <Box
        className="calendarItem"
        sx={{
          display: 'flex',
          padding: '2px 4px',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
          }
        }}
        onClick={showModal}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Box
            sx={{
              width: '16px',
              height: '16px',
              aspectRatio: '1',
              borderRadius: '4px',
              backgroundColor: schedule.color,
              marginRight: '5px'
            }}
          ></Box>
          <span>{schedule.name}</span>
        </Box>
        <IconButton aria-label="visible" size="small">
          <PiEyeLight />
        </IconButton>
      </Box>
      <Modal
        title="Calendar Detail"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key={2}
            onClick={handleCancel}
            // className={classes.controlBtn}
          >
            Cancel
          </Button>,
          <Button
            form={formName}
            key={1}
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            Save
          </Button>
        ]}
        width={400}
        confirmLoading={loading}
      >
        <form
          name={formName}
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%' }}
        >
          <Box className="formItem">
            <Typography>Name:</Typography>
            <TextField
              sx={{
                width: '100%',
                '& .MuiInputLabel-root': { display: 'none' }
              }}
              size="small"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            ></TextField>
          </Box>
          <Box className="formItem">
            <Typography>Color:</Typography>
            <ColorPicker
              format="hex"
              value={colorHex}
              onChange={handleChangeColor}
              size="small"
            />
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default CalendarItem
