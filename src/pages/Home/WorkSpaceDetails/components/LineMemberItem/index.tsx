import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// component libraries
import IconButton from '@mui/material/IconButton'
import { RiLogoutBoxRLine, RiUserStarLine } from 'react-icons/ri'
import Tooltip from '@mui/material/Tooltip'

// component
import { Badge, Item, ItemCover, Title, ActionGroup } from './styles'
import IWSItemProps from './IWSItemProps'

// services
import { StoreDispatchType, StoreType } from '~/redux'
import { assignAdmin } from '~/redux/teamWSSlice/actions'
import { hideLoading, showLoading } from '~/redux/progressSlice'

const LineMemberItem = ({ data, superAdminId }: IWSItemProps) => {
  const { user, role } = data
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const dispatch = useDispatch<StoreDispatchType>()

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
  const { id } = useParams()

  const handleAssignAdmin = async () => {
    try {
      dispatch(showLoading())
      await dispatch(assignAdmin({ emailUser: user.email, wsID: id as string }))
      dispatch(hideLoading())
    } catch (err) {
      console.log('✨ ~ file: index.tsx:36 ~ handleAssignAdmin ~ err:', err)
    }
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
            onClick={() => handleAssignAdmin()}
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
