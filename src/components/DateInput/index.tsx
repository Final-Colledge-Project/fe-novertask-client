import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import IInputProps from '../IInputProps'
const DateInput = ({ label, disableFuture, error, field }: IInputProps) => {
  return (
    <DatePicker
      {...field}
      label={label}
      sx={{
        width: '100%',
        height: '50px',
        margin: 0,
        backgroundColor: (theme) => theme.palette.white.main,
        '& .MuiOutlinedInput-root': {
          height: '100%'
        }
      }}
      disableFuture={disableFuture}
      views={['year', 'month', 'day']}
      slotProps={{
        textField: {
          ...field,
          error: error
        }
      }}
    />
  )
}
export default DateInput
