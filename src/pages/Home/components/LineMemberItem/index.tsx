/* eslint-disable indent */
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// component libraries
import IconButton from '@mui/material/IconButton'
import { RiCloseLine, RiUserStarLine, RiUserUnfollowLine } from 'react-icons/ri'
import Tooltip from '@mui/material/Tooltip'

// component
import { Badge, Item, ItemCover, Title, ActionGroup } from './styles'
import IWSItemProps from './IWSItemProps'

// services
import { StoreDispatchType, StoreType } from '~/redux'
import { assignAdmin } from '~/redux/teamWSSlice/actions'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { revokeAdmin as revokeAdminInBoard } from '~/services/boardService'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

const LineMemberItem = ({ data, superAdminId, onDelete }: IWSItemProps) => {
  const { user, role } = data
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const dispatch = useDispatch<StoreDispatchType>()

  const roleString = (role: string) => {
    switch (role) {
      case 'boardLead':
        return 'Lead'
      case 'boardAdmin':
        return 'Admin'
      case 'member':
        return 'Member'
      default:
        return role
    }
  }

  const checkIsUserASuperAdmin = () => {
    return superAdminId === currentUser?._id
  }
  const { id: boardId } = useParams()

  const onAssignAdmin = async () => {
    try {
      dispatch(showLoading())
      await dispatch(
        assignAdmin({
          emailUser: user?.email as string,
          wsID: boardId as string
        })
      )
      dispatch(hideLoading())
    } catch (err) {
      // console.log('✨ ~ file: index.tsx:36 ~ onAssignAdmin ~ err:', err)
    }
  }

  const onRevokeAdmin = async () => {
    dispatch(showLoading())
    try {
      const res = await revokeAdminInBoard({
        boardId: boardId as string,
        memberId: user?._id as string
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <Item $img={user?.avatar as string} $isMe={currentUser?._id === user?._id}>
      <ItemCover className="section">
        <img src={user?.avatar} alt="" />
      </ItemCover>
      <Title className="section clamp-1">
        <p>{user?.fullName}</p>
      </Title>
      <div className="section clamp-1">
        <p>{user?.email}</p>
      </div>
      <div className="section">
        <Badge className={role}>{roleString(role)}</Badge>
      </div>
      <ActionGroup className="section">
        {checkIsUserASuperAdmin() && currentUser?._id !== user?._id && (
          <>
            {/* Action with board member */}
            {role === 'member' && (
              <>
                {/* Swith to admin */}
                <Tooltip title="Switch to admin permission">
                  <IconButton color="primary" onClick={() => onAssignAdmin()}>
                    <RiUserStarLine />
                  </IconButton>
                </Tooltip>

                {/* Remove from this board */}
                <Tooltip title="Remove from this board">
                  <IconButton
                    color="error"
                    onClick={() => onDelete && onDelete(user?._id as string)}>
                    <RiCloseLine />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* Action with board admin */}
            {role === 'boardAdmin' && (
              <Tooltip title="Revoke admin permission">
                <IconButton color="error" onClick={onRevokeAdmin}>
                  <RiUserUnfollowLine />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </ActionGroup>
    </Item>
  )
}
export default LineMemberItem
