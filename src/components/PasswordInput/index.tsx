import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import IInputProps from '../IInputProps'

const PasswordInput = ({
  label,
  placeHolder,
  startIcon,
  onChange,
  error = false,
  field,
  value,
  sx
}: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        height: '50px',
        backgroundColor: (theme) => theme.palette.white.main,
        m: 0,
        label: {
          color: (theme) =>
            error ? theme.palette.error.main : theme.palette.primary.main,
          '&.Mui-focused': {
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.primary.main
          }
        },
        ...sx
      }}
    >
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        error={error}
        defaultValue={value}
        onChange={onChange}
        placeholder={placeHolder}
        id={`outlined-adornment-${label}`}
        type={showPassword ? 'text' : 'password'}
        sx={{
          'input::-ms-reveal, input::-ms-clear': {
            display: 'none'
          },
          height: '100%',
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px'
            }
          }
        }}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{
              width: '30px',
              height: '20px',
              mr: '10px',
              '& svg': {
                width: '100%',
                height: '100%'
              }
            }}
          >
            <IconButton
              aria-label="toggle password"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          </InputAdornment>
        }
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
        label={label}
      />
    </FormControl>
  )
}
export default PasswordInput
