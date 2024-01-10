import { IconButton } from '@mui/material'
import {
  DateTimePicker,
  DateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker'
import { Dayjs } from 'dayjs'
import { RiCalendarLine } from 'react-icons/ri'

export default function DateTimeInput(
  props?: DateTimePickerProps<Date | Dayjs>
) {
  return (
    <DateTimePicker
      disableOpenPicker
      ampm={false}
      closeOnSelect={false}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: '5px'
        },
        '& .MuiInputBase-input': {
          padding: '4px 8px',
          fontSize: '14px'
        }
      }}
      slots={{
        openPickerButton: (props) => (
          <IconButton size="small" {...props}>
            <RiCalendarLine />
          </IconButton>
        )
      }}
      slotProps={{
        layout: {
          sx: {
            '& .MuiPickersSlideTransition-root': {
              minHeight: '200px'
            },
            '& .MuiDateCalendar-root': {
              width: 'auto',
              height: '280px'
            },
            '& .MuiDayCalendar-header': {
              '& .MuiDayCalendar-weekDayLabel': {
                width: '30px'
              }
            },
            '& .MuiPickersDay-root': {
              width: '30px',
              height: '30px'
            },
            '& .MuiMultiSectionDigitalClock-root': {
              height: '280px'
            }
          }
        },
        textField: {
          disabled: true,
          sx: {
            '& .MuiOutlinedInput-input.Mui-disabled ': {
              '-webkit-text-fill-color': (theme) => theme.palette.black.main
            }
          },
          size: 'small'
        },
        digitalClockSectionItem: {
          dense: true
        },
        actionBar: {
          actions: ['clear', 'cancel', 'accept']
        }
      }}
      {...props}
    />
  )
}
