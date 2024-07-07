import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'
import IInputProps from '../IInputProps'
import { useEffect, useRef, useState } from 'react'

const TextInput = (props: IInputProps & OutlinedInputProps) => {
  const {
    label,
    placeHolder,
    type,
    startIcon,
    endIcon,
    value,
    onChange,
    error = false,
    field,
    autofocus,
    multiple,
    row,
    sx,
    disabled,
    persistLabel,
    maxLength
  } = props
  const inputRef = useRef<HTMLElement | null>(null)

  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    setFirstRender(false)
  }, [])

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      sx={{
        height: multiple ? 'unset' : '50px',
        m: 0,
        backgroundColor: (theme) =>
          disabled ? theme.palette.gray6.main : theme.palette.white.main,
        label: {
          color: (theme) =>
            error ? theme.palette.error.main : theme.palette.primary.main,
          '&.Mui-focused': {
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.primary.main
          }
        },
        ...sx
      }}>
      <InputLabel
        htmlFor={'outlined-adornment-amount' + label}
        shrink={persistLabel}>
        {label}
      </InputLabel>
      <OutlinedInput
        notched={persistLabel}
        inputProps={{ maxLength }}
        multiline={multiple}
        autoFocus={autofocus}
        rows={(multiple && row) || 2}
        {...field}
        ref={inputRef}
        inputRef={(input: HTMLInputElement | null) => {
          input && autofocus && !firstRender && input.focus()
        }}
        error={error}
        value={value}
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
              }}>
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
              }}>
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
