import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import IInputProps from '../IInputProps'

const TextInput = ({
  label,
  placeHolder,
  type,
  startIcon,
  endIcon,
  value,
  onChange,
  error = false,
  field
}: IInputProps) => {
  return (
    <FormControl
      fullWidth
      sx={{
        m: 0,
        height: '50px',
        backgroundColor: (theme) => theme.palette.white.main,
        label: {
          color: (theme) =>
            error ? theme.palette.error.main : theme.palette.primary.main,
          '&.Mui-focused': {
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.primary.main
          }
        }
      }}
    >
      <InputLabel htmlFor={'outlined-adornment-amount' + label}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...field}
        error={error}
        defaultValue={value}
        onChange={onChange}
        type={type || 'text'}
        id="outlined-adornment-amount"
        startAdornment={
          startIcon ? (
            <InputAdornment
              position="start"
              sx={{
                width: '30px',
                height: '20px',
                '& svg': {
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              {startIcon}
            </InputAdornment>
          ) : undefined
        }
        endAdornment={
          endIcon ? (
            <InputAdornment
              position="start"
              sx={{
                width: '30px',
                height: '20px',
                '& svg': {
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              {startIcon}
            </InputAdornment>
          ) : undefined
        }
        label={label}
        placeholder={placeHolder}
        sx={{
          height: '100%',
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px'
            }
          }
        }}
        // inputProps={{
        //   pattern: regex
        // }}
      />
    </FormControl>
  )
}
export default TextInput
