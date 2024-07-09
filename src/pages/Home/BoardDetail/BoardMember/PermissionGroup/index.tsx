import { useMemo, useState } from 'react'
import {
  ColorHeader,
  Content,
  Description,
  PermissionContainer,
  SquareButton,
  Title,
  UserCount,
  UserList,
  UserListEmptyText
} from './style'
import {
  BOARD_MEMBER_PERMISSIONS,
  BOARD_PERMISSIONS_POPUP_MODE
} from '~/utils/constant/board'
import { Avatar, Button, Stack, Tooltip } from '@mui/material'
import { RiDeleteBin6Line, RiExternalLinkLine } from 'react-icons/ri'
import PermissionGroupEdit from '../PermissionGroupEdit'
import IProps from './IProps'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { cloneDeep } from 'lodash'
import { IMemberInBoard } from '~/services/types'
import { mapData } from '~/utils/helper'
import usePermission from '~/hooks/usePermission'
import { COLOR } from '~/utils/constant'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { deleteBoardPermission } from '~/services/boardPermissionService'
import { getBoardPermission } from '~/redux/permissionSlice/actions'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export default function PermissionGroup({ permission }: Readonly<IProps>) {
  const [viewMode, setViewMode] = useState<number>(
    BOARD_MEMBER_PERMISSIONS.VIEW
  )
  const memberData = useSelector((state: StoreType) => state.board.members)
  const userPermissionOnBoard = usePermission()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const dispatch = useDispatch<StoreDispatchType>()
  const { id: boardId } = useParams()

  // const isViewMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.VIEW
  const isEditMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.EDIT

  const onOpenModal = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.EDIT)
  }

  const onCloseModal = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.VIEW)
  }

  const isAdmin = () => userPermissionOnBoard?.isAdmin
  const modalMode = () => {
    return isAdmin()
      ? BOARD_PERMISSIONS_POPUP_MODE.EDIT
      : BOARD_PERMISSIONS_POPUP_MODE.VIEW
  }

  const canRemove = () => {
    return !permission.isAdmin && !permission.isViewer
  }

  const computedMembers = useMemo(() => {
    if (memberData && permission.memberIds) {
      const result = [
        ...cloneDeep(memberData.members),
        ...cloneDeep(memberData.oweners)
      ]
      return mapData<IMemberInBoard>(result, '_id', permission.memberIds)
    }
    return []
  }, [memberData, permission.memberIds])

  const onDelete = async () => {
    try {
      onCloseDeleteModal()
      dispatch(showLoading())
      const res = await deleteBoardPermission({
        boardId: boardId as string,
        permissionId: permission._id
      })
      if (res?.message) {
        await dispatch(getBoardPermission(boardId as string))
        enqueueSnackbar('Delete permission successfully!', {
          variant: 'success'
        })
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <>
      <PermissionContainer>
        <ColorHeader $color={permission.color} />
        <Content>
          <Title>{permission.name}</Title>
          <UserCount>
            <b>User: </b>
            {permission.memberIds.length}
          </UserCount>
          {computedMembers.length > 0 && (
            <UserList>
              {computedMembers.map((mem: IMemberInBoard) => (
                <Tooltip
                  arrow
                  title={mem.firstName + ' ' + mem.lastName}
                  key={mem._id}>
                  <Avatar
                    sx={{ height: '35px', width: '35px' }}
                    src={mem.avatar}></Avatar>
                </Tooltip>
              ))}
            </UserList>
          )}

          {computedMembers.length === 0 && (
            <UserListEmptyText>No user</UserListEmptyText>
          )}

          {/* DESCRIPTION */}
          <Tooltip arrow title={permission.description}>
            <Description>
              <b>Description: </b>
              {permission.description}
            </Description>
          </Tooltip>

          {/* ACTION */}
          <Stack spacing={1} direction="row" alignItems={'center'}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<RiExternalLinkLine />}
              onClick={onOpenModal}>
              View detail
            </Button>
            {canRemove() && isAdmin() && (
              <SquareButton onClick={onOpenDeleteModal}>
                <RiDeleteBin6Line color={COLOR.PINK.main} />
              </SquareButton>
            )}
          </Stack>
        </Content>
      </PermissionContainer>
      <PermissionGroupEdit
        open={isEditMode()}
        closeCallback={onCloseModal}
        permissionProps={permission}
        mode={modalMode()}
      />
      <ConfirmDialog
        title="Delete permission?"
        content={
          <div>
            <div>
              Are you sure you want to delete permission{' '}
              <b style={{ color: COLOR.PINK.main }}>{permission.name}</b>?
            </div>
            <div style={{ fontSize: '16px', color: COLOR.GRAY.main }}>
              User in this permission will be moved to <b>Viewer</b>
            </div>
          </div>
        }
        onConfirm={onDelete}
        onClose={onCloseDeleteModal}
        open={openDeleteModal}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
      />
    </>
  )
}
