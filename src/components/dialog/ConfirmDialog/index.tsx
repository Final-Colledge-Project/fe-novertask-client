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
import { LoadingOutlined } from '@ant-design/icons'
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
  loading?: boolean
}

export default function ConfirmDialog({
  open,
  title,
  content,
  onConfirm,
  onClose,
  confirmBtnText,
  cancelBtnText,
  loading = false
}: Readonly<IProps>) {
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
      PaperProps={{ sx: { borderRadius: '12px', padding: '12px 16px' } }}>
      <DialogTitle fontSize={20} fontWeight={600}>
        {title || DEFAULT_CONFIRM_DIALOG_TITLE}
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          {cancelBtnText || DEFAULT_CANCEL_BUTTON}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          autoFocus
          startIcon={loading ? <LoadingOutlined /> : null}>
          {confirmBtnText || DEFAULT_CONFIRM_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
