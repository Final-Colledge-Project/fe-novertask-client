/* eslint-disable indent */
import {  useSelector } from 'react-redux'

// component libraries
import IconButton from '@mui/material/IconButton'
import { RiCloseLine } from 'react-icons/ri'
import Tooltip from '@mui/material/Tooltip'

// component
import { Badge, Item, ItemCover, Title, ActionGroup } from './styles'
import IWSItemProps from './IWSItemProps'

// services
import { StoreType } from '~/redux'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { useState } from 'react'
import usePermission from '~/hooks/usePermission'

const LineMemberItem = ({ data, _superAdminId, onDelete }: IWSItemProps) => {
  const { user, role, color } = data
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const [openDialog, setOpenDialog] = useState(false)
  const userPermission = usePermission()

  // 2024-06 update: check on admin permission
  const isAdmin = () => userPermission?.isAdmin

  const handleDelete = () => {
    setOpenDialog(false)
    onDelete && onDelete(user?._id as string)
  }

  const onOpenDialog = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  // 2024-06: unsupport assign admin
  // const onAssignAdmin = async () => {
  //   try {
  //     dispatch(showLoading())
  //     await dispatch(
  //       assignAdmin({
  //         emailUser: user?.email as string,
  //         wsID: boardId as string
  //       })
  //     )
  //     dispatch(hideLoading())
  //   } catch (err) {
  //     // console.log('✨ ~ file: index.tsx:36 ~ onAssignAdmin ~ err:', err)
  //   }
  // }

  // 2024-06: unsupport revoke admin
  // const onRevokeAdmin = async () => {
  //   dispatch(showLoading())
  //   try {
  //     const res = await revokeAdminInBoard({
  //       boardId: boardId as string,
  //       memberId: user?._id as string
  //     })

  //     if (res) {
  //       dispatch(setShouldRefreshBoardDetail(true))
  //     }
  //   } catch (err) {
  //     enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
  //   } finally {
  //     dispatch(hideLoading())
  //   }
  // }

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
        <Badge className={role} $color={color as string}>
          {role}
        </Badge>
      </div>
      <ActionGroup className="section">
        {isAdmin() && currentUser?._id !== user?._id && (
          <>
            {/* Action with board member */}
            {/* Swith to admin */}
            {/* <Tooltip title="Switch to admin permission">
              <IconButton color="primary" onClick={() => onAssignAdmin()}>
                <RiUserStarLine />
              </IconButton>
            </Tooltip> */}

            {/* Remove from this board */}
            <Tooltip title="Remove from this board">
              <IconButton color="error" onClick={onOpenDialog}>
                <RiCloseLine />
              </IconButton>
            </Tooltip>

            {/* Action with board admin */}
            {/* {role === 'boardAdmin' && (
              <Tooltip title="Revoke admin permission">
                <IconButton color="error" onClick={onRevokeAdmin}>
                  <RiUserUnfollowLine />
                </IconButton>
              </Tooltip>
            )} */}
          </>
        )}
      </ActionGroup>
      <ConfirmDialog
        open={openDialog}
        title="Remove member"
        content="Are you sure you want to remove this member from this board?"
        onConfirm={() => handleDelete()}
        onClose={onCloseDialog}
      />
    </Item>
  )
}
export default LineMemberItem
