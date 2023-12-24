import {
  DateTimePicker,
  DateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker'
import { Dayjs } from 'dayjs'

export default function DateTimeInput(props?: DateTimePickerProps<Date | Dayjs>) {
  return (
    <DateTimePicker
      ampm={false}
      closeOnSelect={false}
      disableOpenPicker
      {...props}
    />
  )
}
