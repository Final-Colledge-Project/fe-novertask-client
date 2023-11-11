import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { SyntheticEvent, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { hideMessage } from '~/redux/snackBarSlice'
import { Slide, SlideProps } from '@mui/material'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type TransitionProps = Omit<SlideProps, 'direction'>

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="right" />
}

export default function GeneralSnackBar() {
  const dispatch = useDispatch()
  const snackBar = useSelector((state: StoreType) => state.snackBar)

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    // setOpen(false)
    dispatch(hideMessage())
  }

  return (
    <Snackbar
      TransitionComponent={Transition}
      open={snackBar.open}
      autoHideDuration={snackBar.showDuration}
      onClose={handleClose}
      sx={{ minWidth: '300px' }}
    >
      <Alert
        variant="standard"
        onClose={handleClose}
        color={snackBar.variants}
        sx={{ width: '100%' }}
        severity={snackBar.variants}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  )
}
