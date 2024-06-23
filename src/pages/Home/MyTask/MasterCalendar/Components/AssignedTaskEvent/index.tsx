import { Box } from '@mui/material'
import { EventItem } from '~/services/types'
import './style.scss'
import { StoreType } from '~/redux'
import { useSelector } from 'react-redux'
import { TYPE_EVENT } from '~/utils/constant'
import { formatDate, formatDateTime, isDarkColor } from '~/utils/helper'
const AssignedTaskEvent = ({ event }: { event: EventItem }) => {
  const { schedules } = useSelector((state: StoreType) => state.schedule)
  const assignedTask = schedules.find(
    (schedule) => schedule.type === TYPE_EVENT.assignedTask
  )
  const colorText = isDarkColor(assignedTask?.color || '') ? '#fff' : '#000'
  return (
    <Box
      className="assignTaskEvent"
      sx={{
        backgroundColor: `${assignedTask?.color}`,
        color: { colorText },
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
      }}
    >
      <Box>
        <Box className="assignTaskEvent__title">
          {event?.data?.assignedTask?.title}
        </Box>
        <Box className="assignTaskEvent__time">
          {event?.end
            ? `${formatDate(event.start.toLocaleString())} - ${formatDate(
                event.end.toLocaleDateString()
              )}`
            : formatDateTime(event?.start?.toLocaleString())}
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default AssignedTaskEvent
