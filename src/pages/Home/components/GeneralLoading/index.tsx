import { CircularProgress } from '@mui/material'

export default function GeneralLoading() {
  return (
    <CircularProgress
      size="40px"
      sx={{
        color: (theme) => theme.palette.blue.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }}
    />
  )
}
