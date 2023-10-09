import { Button } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'

const GoogleSignInButton = () => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        fontSize: '16px',
        color: (theme) => theme.palette.gray.main,
        border: (theme) => `1px solid ${theme.palette.black.main}`,
        height: '60px',
        '& svg': {
          width: '25px',
          height: '25px'
        }
      }}
      startIcon={<FcGoogle />}
    >
      Continue with Google
    </Button>
  )
}
export default GoogleSignInButton
