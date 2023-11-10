import { Avatar } from '@mui/material'
import './style.scss'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
const UserBadge = ({ fullVisible }: { fullVisible: boolean }) => {
  const { userInfo } = useSelector((state: StoreType) => state.auth)

  return (
    userInfo && (
      <div
        className={clsx(
          'badge-container',
          fullVisible ? '' : 'badge-container--short'
        )}
      >
        <Avatar
          alt="Giang Hoang"
          src="/img/avatar.jpg"
          sx={{
            //   width: fullVisible ? '40px' : '50px',
            //   height: fullVisible ? '40px' : '50px'
            '&:hover': {
              img: {
                transform: 'scale(1.1)'
              }
            },
            img: {
              transition: 'transform 0.2s'
            }
          }}
        />

        <div
          className={clsx(
            'badge-text',
            fullVisible ? '' : 'badge-text--hidden'
          )}
        >
          <div className="badge-text__name">{userInfo?.firstName}</div>
          <div className="badge-text__mail">{userInfo?.email}</div>
        </div>
      </div>
    )
  )
}
export default UserBadge
