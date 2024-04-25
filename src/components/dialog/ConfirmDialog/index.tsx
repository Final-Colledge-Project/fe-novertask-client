/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material'
import { ReactElement, Ref, forwardRef } from 'react'
import { TransitionProps } from 'notistack'
import {
  DEFAULT_CANCEL_BUTTON,
  DEFAULT_CONFIRM_BUTTON,
  DEFAULT_CONFIRM_DIALOG_CONTENT,
  DEFAULT_CONFIRM_DIALOG_TITLE
} from '~/utils/constant/common'
import { isEmpty } from 'lodash'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface IProps {
  open: boolean
  title?: string
  content?: string | ReactElement
  onConfirm: () => void
  onClose: () => void
  confirmBtnText?: string
  cancelBtnText?: string
}

export default function ConfirmDialog({
  open,
  title,
  content,
  onConfirm,
  onClose,
  confirmBtnText,
  cancelBtnText
}: IProps) {
  const renderContent = () => {
    if (isEmpty(content))
      return (
        <DialogContentText>{DEFAULT_CONFIRM_DIALOG_CONTENT}</DialogContentText>
      )

    if (typeof content === 'string') {
      return <DialogContentText>{content}</DialogContentText>
    } else {
      return content
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ sx: { borderRadius: '12px', padding: '20px' } }}
    >
      <DialogTitle fontSize={20} fontWeight={600}>
        {title || DEFAULT_CONFIRM_DIALOG_TITLE}
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          {cancelBtnText || DEFAULT_CANCEL_BUTTON}
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          {confirmBtnText || DEFAULT_CONFIRM_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
