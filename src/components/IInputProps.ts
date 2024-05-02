import { SxProps } from '@mui/material'
import { ChangeEventHandler, ReactElement } from 'react'

interface IInputProps {
  label: string
  placeHolder?: string
  startIcon?: ReactElement
  endIcon?: ReactElement
  disableFuture?: boolean
  disablePast?: boolean
  value?: string
  onChange?: ChangeEventHandler
  error?: boolean
  field?: object
  type?: string
  autofocus?: boolean
  sx?: SxProps
  multiple?: boolean
  row?: number
  disabled?: boolean
}
export default IInputProps
