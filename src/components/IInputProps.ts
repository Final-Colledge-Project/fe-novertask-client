/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from '@mui/material'
import { ChangeEventHandler, ReactElement } from 'react'

interface IInputProps {
  label: string
  placeHolder?: string
  startIcon?: ReactElement
  endIcon?: ReactElement
  disableFuture?: boolean
  disablePast?: boolean
  value?: string | object
  onChange?: ChangeEventHandler | ((v: any, context: any) => void)
  error?: boolean
  field?: object
  type?: string
  autofocus?: boolean
  sx?: SxProps
  multiple?: boolean
  minDate?: object
  row?: number
  disabled?: boolean
  persistLabel?: boolean
  maxLength?: number
  [key: string]: unknown
}
export default IInputProps
