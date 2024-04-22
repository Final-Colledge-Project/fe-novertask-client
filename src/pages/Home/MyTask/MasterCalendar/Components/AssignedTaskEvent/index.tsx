import { Box } from '@mui/material'
import { EventItem } from '~/services/types'
import './style.scss'
const AssignedTaskEvent = ({ event }: { event: EventItem }) => {
  console.log('🚀 ~ AssignedTaskEvent ~ event:', event)
  return (
    <Box
      className="assignTaskEvent"
      sx={{
        backgroundColor: '#E2F1FF',
        color: '#000',
        borderTop: '4px solid #000',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
      }}
    >
      <Box>
        <Box className="assignTaskEvent__title">
          {event?.data?.assignedTask?.title}
        </Box>
        <Box className="assignTaskEvent__time">
          {event?.start?.toLocaleString()}
        </Box>
      </Box>
      <Box>

      </Box>
    </Box>
  )
}

export default AssignedTaskEvent
