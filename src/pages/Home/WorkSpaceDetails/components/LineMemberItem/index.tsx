import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// component libraries


// component
import { Badge, Item, ItemCover, Title, ActionGroup } from './styles'
import IWSItemProps from './IWSItemProps'

// services
import { StoreDispatchType, StoreType } from '~/redux'
import { assignAdmin } from '~/redux/teamWSSlice/actions'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import useWSPermission from '~/hooks/useWSPermission'

const LineMemberItem = ({ data, superAdminId, onDelete, canRemove }: IWSItemProps) => {
  const { user, role, color } = data
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const dispatch = useDispatch<StoreDispatchType>()
  const wsPermission = useWSPermission()


  const checkIsUserASuperAdmin = () => {
    return superAdminId === currentUser?._id
  }
  const { id } = useParams()

  const handleAssignAdmin = async () => {
    try {
      dispatch(showLoading())
      await dispatch(
        assignAdmin({ emailUser: user?.email as string, wsID: id as string })
      )
      dispatch(hideLoading())
    } catch (err) {
      // console.log('✨ ~ file: index.tsx:36 ~ handleAssignAdmin ~ err:', err)
    }
  }

  return (
    <Item $img={user?.avatar as string} $isMe={currentUser?._id === user?._id}>
      <ItemCover className="section">
        <img src={user?.avatar} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </ItemCover>
      <Title className="section clamp-1">
        <p>{user?.fullName}</p>
      </Title>
      <div className="section clamp-1">
        <p>{user?.email}</p>
      </div>
      <div className="section">
        <Badge $color={color}>{role}</Badge>
      </div>
      <ActionGroup className="section">
        {checkIsUserASuperAdmin() && currentUser?._id !== user?._id && (
          <>
            {/* <Tooltip title="Switch to admin permission">
              <IconButton color="primary" onClick={() => handleAssignAdmin()}>
                <RiUserStarLine />
              </IconButton>
            </Tooltip> */}

            {/* <Tooltip title="Remove from this workspace">
              <IconButton
                color="error"
                onClick={() => onDelete(user?._id as string)}>
                <RiLogoutBoxRLine />
              </IconButton>
            </Tooltip> */}
          </>
        )}
      </ActionGroup>
    </Item>
  )
}
export default LineMemberItem
