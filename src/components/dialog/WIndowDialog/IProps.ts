import { DialogContentProps, SxProps, TypographyProps } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

export default interface IProps {
  open: boolean
  title?: string | ReactNode
  content?: string | ReactElement
  onClose: () => void
  confirmBtnText?: string
  cancelBtnText?: string
  children?: ReactElement | ReactElement[] | ReactNode
  dialogTitleProp?: TypographyProps
  dialogContentProp?: DialogContentProps
  isFullScreen?: boolean
  sx?: SxProps
}
