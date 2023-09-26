import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { ReactElement } from 'react'

interface InputProps {
  label: string
  placeHolder?: string
  type?: string
  startIcon?: ReactElement
  endIcon?: ReactElement
}

const TextInput = ({
  label,
  placeHolder,
  type,
  startIcon,
  endIcon
}: InputProps) => {
  return (
    <FormControl
      fullWidth
      sx={{
        m: 0,
        height: '60px'
      }}
    >
      <InputLabel htmlFor={'outlined-adornment-amount' + label}>
        {label}
      </InputLabel>
      <OutlinedInput
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
      />
    </FormControl>
  )
}
export default TextInput
