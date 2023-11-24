import IconButton from '@mui/material/IconButton'
import { RiLogoutBoxRLine, RiUserStarLine } from 'react-icons/ri'
import IWSItemProps from './IWSItemProps'
import { Badge, Item, ItemCover, Title, ActionGroup } from './styles'
import Tooltip from '@mui/material/Tooltip'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

const LineMemberItem = ({ data, superAdminId }: IWSItemProps) => {

  const { user, role } = data
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo

  const roleString = (role: string) => {
    switch (role) {
      case 'admin':
        return 'admin'
      case 'superAdmin':
        return 'super admin'
      default:
        return role
    }
  }

  const checkIsUserASuperAdmin = () => {
    return superAdminId === currentUser?._id
  }

  return (
    <Item $img={user.avatar as string} $isMe={currentUser?._id === user._id}>
      <ItemCover className="section">
        <img src={user.avatar} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </ItemCover>
      <Title className="section clamp-1">
        <p>{user.fullName}</p>
      </Title>
      <div className="section clamp-1">
        <p>{user.email}</p>
      </div>
      <div className="section">
        <Badge className={role}>{roleString(role)}</Badge>
      </div>
      <ActionGroup className="section">
        <Tooltip title="Nominate as an Admin">
          <IconButton
            color="primary"
            disabled={!(role === 'member' && checkIsUserASuperAdmin())}
          >
            <RiUserStarLine />
          </IconButton>
        </Tooltip>

        <Tooltip title="Leave this workspace">
          <IconButton
            color="error"
            disabled={!(role === 'member' && user._id === currentUser?._id)}
          >
            <RiLogoutBoxRLine />
          </IconButton>
        </Tooltip>
      </ActionGroup>
    </Item>
  )
}
export default LineMemberItem
