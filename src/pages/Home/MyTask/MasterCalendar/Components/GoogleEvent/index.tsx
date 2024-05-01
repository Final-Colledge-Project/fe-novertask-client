import { Box } from '@mui/material'
import { EventItem } from '~/services/types'
import './style.scss'
import { formatDate, formatDateTime } from '~/utils/helper'
const GoogleEvent = ({ event }: { event: EventItem }) => {
  console.log('🚀 ~ GoogleEvent ~ event:', event)
  return (
    <Box
      className="googleEvent"
      sx={{
        backgroundColor: '#FF4D4F',
        color: '#000',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px'
      }}
    >
      <Box>
        <Box className="googleEvent__title">
          {event?.data?.googleEvent?.title}
        </Box>
        <Box className="googleEvent__time">
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

export default GoogleEvent
