import { RightMenu, StyledHeader, ViewTypeMenu } from './style'
import { ChangeEvent, useState } from 'react'
import {
  BOARD_MEMBER_VIEW_MODE,
  BOARD_VIEW_ALL_ROLE,
  BOARD_VIEW_EMPTY_ROLE
} from '~/utils/constant/board'
import SearchBox from '~/components/SearchBox'
import { Button, MenuItem, Select } from '@mui/material'
import { RiSettings2Line, RiUserAddLine } from 'react-icons/ri'
import { IHeaderProps } from './IProps'
import { useDebounceCallback } from 'usehooks-ts'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { IBoardPermission } from '~/services/types'
import usePermission from '~/hooks/usePermission'

export default function Header({
  onRoleChange,
  searchTerm,
  setSearchTerm,
  onStartSearch,
  onOpenAddMemberPopup,
  onModeChange,
  mode
}: IHeaderProps) {
  const currentBoardPermission = useSelector(
    (state: StoreType) => state.permission.currentBoardPermission
  )
  const [selectedRole, setSelectedRole] = useState<string>(BOARD_VIEW_ALL_ROLE)
  const userPermission = usePermission()
  const isAdmin = () => userPermission?.isAdmin
  const canInviteMember = () => userPermission?.member.invite

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)

    // start search process
    onStartSearch(true)
  }

  const debounced = useDebounceCallback(handleChangeSearch, 500)

  const handleChangeRole = (roleId: string) => {
    setSelectedRole(roleId)
    onRoleChange(roleId)
    onModeChange(BOARD_MEMBER_VIEW_MODE.VIEW)
  }

  const handlePermissionSettingStart = () => {
    onModeChange(BOARD_MEMBER_VIEW_MODE.PERMISSION_SETTING)
    setSelectedRole(BOARD_VIEW_EMPTY_ROLE)
  }

  return (
    <StyledHeader>
      {/* Role filter */}
      <ViewTypeMenu>
        <Select
          sx={{ height: 35 }}
          variant="outlined"
          value={selectedRole}
          onChange={(e) => handleChangeRole(e.target.value)}>
          {mode === BOARD_MEMBER_VIEW_MODE.PERMISSION_SETTING && (
            <MenuItem dense value={BOARD_VIEW_EMPTY_ROLE}>
              Choose role
            </MenuItem>
          )}
          <MenuItem dense value={BOARD_VIEW_ALL_ROLE}>
            All
          </MenuItem>
          {currentBoardPermission?.map(
            (per: IBoardPermission, _index: number) => (
              <MenuItem dense value={per._id} key={per._id}>
                {per.name}
              </MenuItem>
            )
          )}
        </Select>
      </ViewTypeMenu>

      <RightMenu>
        <div style={{ flexShrink: 0 }}>
          {isAdmin() && mode !== BOARD_MEMBER_VIEW_MODE.PERMISSION_SETTING && (
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={handlePermissionSettingStart}
              startIcon={<RiSettings2Line />}>
              Permission
            </Button>
          )}
        </div>

        {/* Add member button */}
        <div style={{ flexShrink: 0 }}>
          {canInviteMember() && (
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={onOpenAddMemberPopup}
              startIcon={<RiUserAddLine />}>
              Add
            </Button>
          )}
        </div>
        {/* Search member */}
        <SearchBox
          label=""
          sx={{ height: '30px' }}
          onChange={debounced}
          value={searchTerm}
          placeHolder={
            mode === BOARD_MEMBER_VIEW_MODE.PERMISSION_SETTING
              ? 'Search permission...'
              : 'Search member...'
          }
        />
      </RightMenu>
    </StyledHeader>
  )
}
