import { useEffect, useMemo, useState } from 'react'
import {
  ColorHeader,
  Content,
  Description,
  PermissionContainer,
  Title,
  UserCount,
  UserList,
  UserListEmptyText
} from './style'
import {
  BOARD_MEMBER_PERMISSIONS,
  BOARD_PERMISSIONS_POPUP_MODE
} from '~/utils/constant/board'
import { Avatar, Button, Tooltip } from '@mui/material'
import randomColor from '~/utils/randomColor'
import { RiExternalLinkLine } from 'react-icons/ri'
import PermissionGroupEdit from '../PermissionGroupEdit'
import IProps from './IProps'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { cloneDeep } from 'lodash'
import { IMemberInBoard } from '~/services/types'
import { mapData } from '~/utils/helper'

export default function PermissionGroup({ permission }: IProps) {
  const [viewMode, setViewMode] = useState<number>(
    BOARD_MEMBER_PERMISSIONS.VIEW
  )
  const memberData = useSelector((state: StoreType) => state.board.members)

  const isViewMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.VIEW
  const isEditMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.EDIT

  const startEdit = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.EDIT)
  }

  const endEdit = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.VIEW)
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
  }, [memberData])

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

          {computedMembers.length === 0 && <UserListEmptyText>No user</UserListEmptyText>}
          <Tooltip arrow title={permission.description}>
            <Description>
              <b>Description: </b>
              {permission.description}
            </Description>
          </Tooltip>
          <Button
            variant="text"
            fullWidth
            startIcon={<RiExternalLinkLine />}
            onClick={startEdit}>
            View detail
          </Button>
        </Content>
      </PermissionContainer>
      <PermissionGroupEdit
        open={isEditMode()}
        closeCallback={endEdit}
        permissionProps={permission}
        mode={BOARD_PERMISSIONS_POPUP_MODE.EDIT}
      />
    </>
  )
}
