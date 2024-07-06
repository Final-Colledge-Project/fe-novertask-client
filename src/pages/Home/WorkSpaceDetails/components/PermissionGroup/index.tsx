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
import { Avatar, Button, Stack, Tooltip } from '@mui/material'
import { RiDeleteBin6Line, RiExternalLinkLine } from 'react-icons/ri'
import PermissionGroupEdit from '../PermissionGroupEdit'
import IProps from './IProps'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { cloneDeep } from 'lodash'
import { IMockUser } from '~/services/types'
import { mapData } from '~/utils/helper'
import {
  WS_PERMISSIONS_POPUP_MODE,
  WS_PERMISSIONS_VIEW_MODE
} from '~/utils/constant/workspace'
import useWSPermission from '~/hooks/useWSPermission'
import { COLOR } from '~/utils/constant'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { deleteWSPermission } from '~/services/workspacePermissionService'
import { useParams } from 'react-router-dom'
import { getWSPermission } from '~/redux/permissionSlice/actions'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import useInfo from '~/hooks/useInfo'

export default function PermissionGroup({ permission }: Readonly<IProps>) {
  const [viewMode, setViewMode] = useState<number>(
    WS_PERMISSIONS_VIEW_MODE.VIEW
  )
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const memberData = useSelector(
    (state: StoreType) => state.teamWorkspace.currTeamMembers
  )
  const userPermissionOnWS = useWSPermission()
  const userInfo = useInfo()
  const dispatch = useDispatch<StoreDispatchType>()
  const { id: wsId } = useParams()
  const isEditMode = () => viewMode === WS_PERMISSIONS_VIEW_MODE.EDIT

  // open edit popup
  const onOpenModal = () => {
    setViewMode(WS_PERMISSIONS_VIEW_MODE.EDIT)
  }

  // close edit popup
  const onCloseModal = () => {
    setViewMode(WS_PERMISSIONS_VIEW_MODE.VIEW)
  }

  const modalMode = () => {
    return userPermissionOnWS?.isWSAdmin
      ? WS_PERMISSIONS_POPUP_MODE.EDIT
      : WS_PERMISSIONS_POPUP_MODE.VIEW
  }

  const canRemove = () => {
    return !permission.isWSAdmin && !permission.isWSViewer
  }

  // check if logged user is admin
  const isAdmin = () => userPermissionOnWS?.isWSAdmin
  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }
  const onDelete = async () => {
    try {
      onCloseDeleteModal()
      dispatch(showLoading())
      const res = await deleteWSPermission({
        wsId: wsId as string,
        permissionId: permission._id
      })
      if (res?.message) {
        await dispatch(getWSPermission(wsId as string))
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

  const computedMembers = useMemo(() => {
    if (memberData && permission.memberIds) {
      const result = [
        ...cloneDeep(memberData.workspaceAdmins),
        ...cloneDeep(memberData.workspaceMembers)
      ]
      return mapData<IMockUser>(
        result.map((item) => item.user) as IMockUser[],
        '_id',
        permission.memberIds
      )
    }
    return []
  }, [memberData, permission.memberIds])

  return (
    <>
      <PermissionContainer>
        {/* COLOR HEADER */}
        <ColorHeader $color={permission.color} />

        <Content>
          {/* TITLE */}
          <Title>{permission.name}</Title>
          <UserCount>
            <b>User: </b>
            {permission.memberIds.length}
          </UserCount>

          {/* USER LIST */}
          {computedMembers.length > 0 && (
            <UserList>
              {computedMembers.map((mem: IMockUser) => (
                <Tooltip arrow title={mem.fullName} key={mem._id}>
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

          {/* VIEW DETAIL BUTTON */}
          <Stack spacing={1} direction="row" alignItems={'center'}>
            <Button
              variant="text"
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

      {/* PERMISSION EDIT MODAL */}
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
