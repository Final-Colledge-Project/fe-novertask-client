import { Avatar, Checkbox } from '@mui/material'
import IProps from './IProps'
import { MemberItem } from './style'
import clsx from 'clsx'

export default function UserItem({
  checked,
  onChange,
  disabled,
  user,
  isUnassigned
}: IProps) {
  const getFullName = () => `${user.fullName}`

  return (
    <MemberItem key={user?._id}>
      <Checkbox
        size="small"
        checked={checked}
        onChange={() => onChange(user._id, getFullName())}
        disabled={disabled}
      />

      <div className="body">
        <div className="image">
          <Avatar
            src={user?.avatar}
            alt=""
            sx={{
              width: '30px',
              height: '30px'
            }}
          />
        </div>
        <div className="info">
          <div className="name-role-group">
            <div className="name">{getFullName()}</div>
            {/* {isUnassigned && (
              <div className={clsx('role', 'KEY_OF_ROLE')}>
                {'TITLE OF ROLE'}
              </div>
            )} */}
          </div>
          <div className="email">{user?.email}</div>
        </div>
      </div>
    </MemberItem>
  )
}
