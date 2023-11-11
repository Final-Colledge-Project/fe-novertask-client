import Button from '@mui/material/Button'
import clsx from 'clsx'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { StoreDispatchType } from '~/redux'
import { signOut } from '~/redux/authSlice/actions'

const SignOutButton = ({ fullVisible }: { fullVisible: boolean }) => {
  const dispatch = useDispatch<StoreDispatchType>()

  // sign out user: clear current user info
  const handleLogout = () => {
    dispatch(signOut())
  }
  return (
    <Button
      variant="outlined"
      color="error"
      fullWidth
      onClick={handleLogout}
      sx={{
        borderWidth: '1px',
        height: '50px',
        width: fullVisible ? '100%' : '50px',
        minWidth: 'unset',
        transition: 'width 0.2s',
        m: 0,
        '& .MuiButton-startIcon': {
          marginRight: fullVisible ? '8px' : 0
        },
        '.sign-out-title': {
          position: 'relative',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          // overflow: 'hidden',
          textWrap: 'nowrap',
          '&-copy': {
            position: 'absolute',
            left: 0,
            opacity: 1,
            transition: 'left 0.3s, opacity 0.1s'
          },
          '&-origin': {
            translateX: '0px',
            transition: 'left 0.3s, opacity 0.1s',
            display: 'block'
          },
          '&--hidden': {
            '.sign-out-title-copy': {
              position: 'absolute',
              left: '-5px',
              top: 0,
              bottom: 0,
              opacity: 0
            },
            '.sign-out-title-origin': {
              display: 'none'
            }
          }
        }
      }}
      startIcon={<RiLogoutBoxLine />}
    >
      {/* {fullVisible && 'Sign out'} */}
      <p
        className={clsx(
          'sign-out-title',
          !fullVisible && 'sign-out-title--hidden'
        )}
      >
        <span className="sign-out-title-origin">Sign out</span>
        <span className="sign-out-title-copy">Sign out</span>
      </p>
    </Button>
  )
}
export default SignOutButton
