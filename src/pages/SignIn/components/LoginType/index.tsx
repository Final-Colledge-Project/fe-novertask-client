import { Box, Button } from '@mui/material'
import { ILoginTypeProps } from './ILoginTypeProps'
const LoginType = (props: ILoginTypeProps) => {
  const { src, type } = props
  const handleOnClick = () => {
    if (type === 'google') {
      window.open('http://localhost:5000/api/v1/auth/google', '_self')
    }
    // if (type === 'facebook') {
    //   window.open('http://localhost:5000/api/v1/auth/facebook', '_self')
    // }
  }
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Button
        variant="outlined"
        className="loginTypeBtn"
        onClick={handleOnClick}
        startIcon={
          <img
            src={`${src}`}
            className="loginImageIcon"
            style={{ width: '24px' }}
          />
        }
        sx={{
          fontSize: '16px',
          color: '#48484A',
          width: '100%',
          border: '1px solid #cccccc',
          '&:hover': {
            color: '#007AFF'
          }
        }}
      >
        {type === 'google' ? 'Sign in with Google' : 'Sign in with Facebook'}
      </Button>
    </Box>
  )
}

export default LoginType
