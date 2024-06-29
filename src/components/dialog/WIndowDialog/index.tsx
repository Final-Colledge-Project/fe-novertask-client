/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide
} from '@mui/material'
import { ReactElement, Ref, forwardRef } from 'react'
import { TransitionProps } from 'notistack'
import { CloseButton } from './style'
import { RiCloseLine } from 'react-icons/ri'
import IProps from './IProps'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function WindowDialog({
  open,
  title,
  content,
  onClose,
  children,
  dialogTitleProp,
  dialogContentProp,
  isFullScreen = false
}: IProps) {
  return (
    <Dialog
      fullScreen={isFullScreen}
      open={open}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: isFullScreen ? '20px 20px 0 0' : '20px',
          padding: '12px',
          boxShadow: 'none',
          overflow: 'visible',
          maxWidth: 'none'
        }
      }}>
      <DialogTitle fontSize={20} fontWeight={600} {...dialogTitleProp}>
        {title}
      </DialogTitle>
      <DialogContent {...dialogContentProp}>
        {content && (
          <DialogContentText fontSize={16} fontWeight={400}>
            {content}
          </DialogContentText>
        )}
        {children}
      </DialogContent>

      <CloseButton $isFullScreen={isFullScreen}>
        <IconButton size="small" color="inherit" onClick={onClose}>
          <RiCloseLine />
        </IconButton>
      </CloseButton>
    </Dialog>
  )
}
