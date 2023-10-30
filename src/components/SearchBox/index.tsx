import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { RiSearchLine } from 'react-icons/ri'
import IInputProps from '../IInputProps'
const SearchBox = ({
  label,
  placeHolder,
  onChange,
  error = false,
  value
}: IInputProps) => {
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
        }
      }}
    >
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        error={error}
        defaultValue={value}
        onChange={onChange}
        placeholder={placeHolder}
        id={`outlined-adornment-${label}`}
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
        startAdornment={
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
            <RiSearchLine />
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}
export default SearchBox
