import { useCallback, useEffect, useState } from 'react'
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
import { BOARD_MEMBER_PERMISSIONS } from '~/utils/constant/board'
import { Avatar, Button, Tooltip } from '@mui/material'
import randomCover from '~/utils/randomCover'
import randomColor from '~/utils/randomColor'
import { RiExternalLinkLine } from 'react-icons/ri'
import PermissionGroupEdit from '../PermissionGroupEdit'

export default function PermissionGroup() {
  const [viewMode, setViewMode] = useState<number>(
    BOARD_MEMBER_PERMISSIONS.VIEW
  )
  const [count, setCount] = useState<number>(0)

  const isViewMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.VIEW
  const isEditMode = () => viewMode === BOARD_MEMBER_PERMISSIONS.EDIT

  const random = () => {
    setCount(Math.floor(Math.random() * (20 - 0 + 1) + 0))
  }

  const startEdit = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.EDIT)
  }

  const endEdit = () => {
    setViewMode(BOARD_MEMBER_PERMISSIONS.VIEW)
  }

  useEffect(() => {
    random()
  }, [])

  return (
    <>
      <PermissionContainer>
        <ColorHeader $color={randomColor()} />
        <Content>
          <Title>Title</Title>
          <UserCount>
            <b>User: </b>
            {count}
          </UserCount>
          {count > 0 && (
            <UserList>
              {Array.from({ length: count }).map(() => (
                <Tooltip arrow title="Lorem hjas diuasd aiusd aiosd asiod">
                  <Avatar
                    sx={{ height: '35px', width: '35px' }}
                    src={randomCover()}></Avatar>
                </Tooltip>
              ))}
            </UserList>
          )}

          {count === 0 && <UserListEmptyText>No user</UserListEmptyText>}
          <Tooltip
            arrow
            title=" Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis ratione maiores, fugiat illum optio magnam. Ullam,
                alias itaque. Optio aliquam natus cupiditate reprehenderit
                consequuntur in fugiat inventore ad ipsum vero.">
            <Description>
              <b>Description: </b>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis ratione maiores, fugiat illum optio magnam. Ullam,
              alias itaque. Optio aliquam natus cupiditate reprehenderit
              consequuntur in fugiat inventore ad ipsum vero.
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
      <PermissionGroupEdit open={isEditMode()} closeCallback={endEdit} />
    </>
  )
}
