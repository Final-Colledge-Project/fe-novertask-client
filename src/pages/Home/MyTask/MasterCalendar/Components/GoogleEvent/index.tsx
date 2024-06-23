import { Box } from '@mui/material'
import { EventItem } from '~/services/types'
import './style.scss'
import { formatDate, formatDateTime, isDarkColor } from '~/utils/helper'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { TYPE_EVENT } from '~/utils/constant'
const GoogleEvent = ({ event }: { event: EventItem }) => {
  const { schedules } = useSelector((state: StoreType) => state.schedule)
  const googleEvent = schedules.find(
    (schedule) => schedule.type === TYPE_EVENT.googleEvent
  )
  const colorText = isDarkColor(googleEvent?.color || '') ? '#fff' : '#000'
  return (
    <Box
      className="googleEvent"
      sx={{
        backgroundColor: googleEvent?.color,
        color: colorText,
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
