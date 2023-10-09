import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { SyntheticEvent, forwardRef } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars({
  message,
  isShow,
  onClose,
  during = 3000
}: {
  message: string
  isShow: boolean
  onClose: () => void
  during?: number
}) {
  //   const [shouldOpen, setOpen] = useState(isShow)
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    // setOpen(false)
    onClose()
  }

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={during}
      onClose={handleClose}
      sx={{ minWidth: '300px' }}
    >
      <Alert
        onClose={handleClose}
        color="error"
        sx={{ width: '100%' }}
        severity="error"
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
