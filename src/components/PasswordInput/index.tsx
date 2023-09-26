import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { ReactElement, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

interface InputProps {
  label: string
  placeHolder?: string
  type?: string
  startIcon?: ReactElement
  endIcon?: ReactElement
}

const PasswordInput = ({ label, placeHolder, startIcon }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  return (
    <FormControl fullWidth variant="outlined" sx={{ height: '60px', m: 0 }}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        placeholder={placeHolder}
        id="outlined-adornment-password"
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
        label="Password"
      />
    </FormControl>
  )
}
export default PasswordInput
