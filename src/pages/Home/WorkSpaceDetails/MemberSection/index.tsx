import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import clsx from 'clsx'

// component libraries
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { RiArrowLeftSLine, RiSettings2Line } from 'react-icons/ri'

// components
import {
  Board,
  Container,
  Header,
  Title,
  BoardBody,
  TabHeader,
  ControlHeader,
  HorizontalBar,
  Placeholder
} from './style'
import LineMemberItem from '../components/LineMemberItem'

// services
import { setPopupInvitePeople } from '~/redux/popupSlice'
import { StoreDispatchType, StoreType } from '~/redux'
import { getAllMembers } from '~/redux/teamWSSlice/actions'
import { resetAssignAdmin } from '~/redux/teamWSSlice'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import {
  WS_MEMBER_VIEW_MODE,
  WS_VIEW_ALL_ROLE,
  WS_VIEW_EMPTY_ROLE
} from '~/utils/constant/workspace'
import { IMockUser, IWSPermission } from '~/services/types'
import { clearDuplicateByKey, mapData } from '~/utils/helper'
import PermissionSetting from '../components/PermissionSetting'
import useWSPermission from '~/hooks/useWSPermission'
import Empty from '~/components/Empty'
import SearchBox from '~/components/SearchBox'
import { useDebounceCallback } from 'usehooks-ts'

const MemberSection = () => {
  const {
    getAllMember,
    currTeamMembers: members,
    assignAdmin
  } = useSelector((state: StoreType) => state.teamWorkspace)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<StoreDispatchType>()
  const [tab, setTab] = useState('all')
  const [selectedRole, setSelectedRole] = useState(WS_VIEW_ALL_ROLE)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [startSearch, setStartSearch] = useState<boolean>(false)
  const [view, setView] = useState(WS_MEMBER_VIEW_MODE.MEMBER_VIEW)
  const [deletedMember, setDeletedMember] = useState<{
    id: string
    fullname: string
  }>({})

  const { userInfo } = useSelector((state: StoreType) => state.auth)
  const currentWSPermission = useSelector(
    (state: StoreType) => state.permission.currentWSPermission
  )
  const userPermissionOnWS = useWSPermission()
  // check if logged user is in admin permission
  const isAdmin = () => userPermissionOnWS?.isWSAdmin

  const handleChangeRole = (role: string) => {
    // set selected role
    setSelectedRole(role)
    // change to member view mode
    setView(WS_MEMBER_VIEW_MODE.MEMBER_VIEW)
  }

  useEffect(() => {
    const getMembers = async () => {
      try {
        await dispatch(getAllMembers({ id: id as string }))
      } catch (err) {
        const message = (err as Error).message
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
    getMembers()
  }, [id])

  useEffect(() => {
    if (getAllMember.error) {
      if (getAllMember.error === 'UNAUTHORIZED') {
        return
      }
      enqueueSnackbar(getAllMember.error, { variant: 'error' })
    }
  }, [getAllMember.error])

  useEffect(() => {
    if (assignAdmin.success) {
      enqueueSnackbar('Assign admin successfully', { variant: 'success' })
      dispatch(resetAssignAdmin())
    }
  }, [assignAdmin.success])

  const superAdmin = () => {
    if (members) {
      return members?.workspaceAdmins.find((m) => m.role === 'superAdmin')
    }
  }
  const isWSOwner = (userId: string) => {
    return superAdmin()?.user?._id === userId
  }

  const handleShowPopupInvite = () => {
    dispatch(
      setPopupInvitePeople({
        show: true,
        data: { wsID: id, members: members }
      })
    )
  }

  const checkIsCurrentUserAnSuperAdmin = () => {
    return superAdmin()?.user?._id === userInfo?._id
  }

  const toggleConfirmDialogDeleteMember = () => {
    setOpenConfirmDialog((prev) => !prev)
  }

  const handleOnDeleteMember = (id: string) => {
    const deletedMember = members?.workspaceMembers.find(
      (m) => m.user?._id === id
    )
    if (deletedMember) {
      setDeletedMember({ id: id, fullname: deletedMember.user?.fullName || '' })
      toggleConfirmDialogDeleteMember()
    }
  }

  // change to permission setting view
  const changeToSettingPermission = () => {
    // reset selected role
    setSelectedRole(WS_VIEW_EMPTY_ROLE)
    // change to permission setting mode
    setView(WS_MEMBER_VIEW_MODE.PERMISSION_SETTING)
  }

  // create list member to render
  const generateRenderList = useCallback(() => {
    const list = []

    if (!members || !currentWSPermission) return list

    if (selectedRole === WS_VIEW_ALL_ROLE) {
      currentWSPermission.forEach((permission) => {
        list.push(...getMembersInGroup(permission._id))
      })
    } else {
      list.push(...getMembersInGroup(selectedRole))
    }

    return onSearchMember(list)
  }, [selectedRole, members, searchTerm, currentWSPermission])

  const isMemberViewMode = () => view === WS_MEMBER_VIEW_MODE.MEMBER_VIEW
  const isPermissionSettingMode = () =>
    view === WS_MEMBER_VIEW_MODE.PERMISSION_SETTING

  const onSearchMember = <T,>(list: Array<T>) => {
    const filteredMembers = list.filter((member: T) => {
      if (member) {
        const fullNameMatch = (
          member as T & { user: { fullName: string } }
        ).user.fullName
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase())
        const emailMatch = (
          member as T & { user: { email: string } }
        ).user.email
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase())
        return fullNameMatch !== -1 || emailMatch !== -1
      } else {
        return false
      }
    })
    return filteredMembers
  }

  const getMembersInGroup = (groupId: string) => {
    if (!currentWSPermission || !members) return []
    const group = currentWSPermission.find(
      (permission) => permission._id === groupId
    )
    if (!group) return []
    else {
      const idList = group.memberIds
      const mergedList = [
        ...members.workspaceMembers.map((member) => member.user),
        ...members.workspaceAdmins.map((member) => member.user)
      ] as IMockUser[]
      const rawMemberList = mapData(mergedList, '_id', idList)
      return clearDuplicateByKey(rawMemberList, '_id').map((member) => ({
        role: group.name,
        user: {
          ...member
        },
        color: group.color
      }))
    }
  }

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)

    // start search process
    setStartSearch(true)

    // end search process
    setTimeout(() => {
      setStartSearch(false)
    }, 500)
  }

  const debounced = useDebounceCallback(handleChangeSearch, 500)

  return (
    <Container>
      <Header>
        <Title>
          {/* ROLE SELECT_BOX */}
          <Select
            sx={{ height: 35 }}
            variant="outlined"
            value={selectedRole}
            onChange={(e) => handleChangeRole(e.target.value)}>
            {isPermissionSettingMode() && (
              <MenuItem dense value={WS_VIEW_EMPTY_ROLE}>
                Choose role
              </MenuItem>
            )}
            <MenuItem dense value={WS_VIEW_ALL_ROLE}>
              All
            </MenuItem>
            {currentWSPermission?.map((per: IWSPermission, _index: number) => (
              <MenuItem dense value={per._id} key={per._id}>
                {per.name}
              </MenuItem>
            ))}
          </Select>

          {/* CONTROLS */}
          <Stack direction="row" spacing={3}>
            {isMemberViewMode() && (
              <Button
                color="primary"
                size="small"
                variant="text"
                onClick={changeToSettingPermission}
                startIcon={<RiSettings2Line />}>
                Permission
              </Button>
            )}
            {checkIsCurrentUserAnSuperAdmin() && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: '0' }}
                onClick={handleShowPopupInvite}>
                Invite more people
              </Button>
            )}
            {!checkIsCurrentUserAnSuperAdmin() && (
              <Tooltip title="Only admin can do this action">
                <span style={{ flexShrink: '0' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      '&.MuiButton-root': { color: '#606060' }
                    }}
                    size="small"
                    disabled={true}
                    onClick={handleShowPopupInvite}>
                    Invite more people
                  </Button>
                </span>
              </Tooltip>
            )}

            {/* Search member OR search permission */}
            <SearchBox
              label=""
              sx={{ height: '30px' }}
              onChange={debounced}
              value={searchTerm}
              placeHolder={
                view === WS_MEMBER_VIEW_MODE.PERMISSION_SETTING
                  ? 'Search permission...'
                  : 'Search member...'
              }
            />
          </Stack>
        </Title>
        {/* <p className="describe">
          Workspace member can see all <b>public</b> projects. Only those who
          have been added to private projects can see them
        </p> */}
        {/* <ControlHeader>
          {tabHeaderTitle.map((item) => (
            <div
              className={clsx('item', tab === item.value && 'index')}
              onClick={() => setTab(item.value)}
            >
              {item.title}
            </div>
          ))}
        </ControlHeader> */}
      </Header>

      {/* BOARD (=BODY) */}
      <Board>
        {isMemberViewMode() && (
          <BoardBody>
            {/* show super admin */}
            {/* {(tab === 'all' || tab === 'superAdmin') && superAdmin() && (
            <LineMemberItem
              key={superAdmin()?.user?._id}
              data={superAdmin()!}
              superAdminId={superAdmin()?.user?._id || ''}
            />
          )} */}
            {/* show admin */}
            {/* {(tab === 'all' || tab === 'admin') &&
            members &&
            members?.workspaceAdmins
              .filter((mem) => mem.role === 'admin')
              .map((mem) => (
                <LineMemberItem
                  key={mem?.user?._id}
                  data={mem}
                  superAdminId={mem.user?._id || ''}
                />
              ))} */}
            {/* show member */}
            {/* {(tab === 'all' || tab === 'member') &&
            members &&
            members.workspaceMembers &&
            members.workspaceMembers.map((mem) => (
              <LineMemberItem
                key={mem.user?._id}
                data={{ ...mem, role: 'member' }}
                superAdminId={superAdmin()?.user?._id || ''}
                onDelete={handleOnDeleteMember}
              />
            ))} */}
            {/* show placeholder */}
            {/* {tab === 'admin' &&
            members?.workspaceAdmins.filter((mem) => mem.role === 'admin')
              .length === 0 && (
              <p className="placeholder">There is no one here</p>
            )}
          {tab === 'member' && members?.workspaceMembers?.length === 0 && (
            <p className="placeholder">There is no one here</p>
          )} */}

            {/* USER LIST */}
            {generateRenderList().length > 0 &&
              !startSearch &&
              generateRenderList().map((mem) => (
                <LineMemberItem
                  key={mem.user?._id}
                  data={{ ...mem, role: mem.role }}
                  superAdminId={superAdmin()?.user?._id || ''}
                  onDelete={handleOnDeleteMember}
                />
              ))}

            {/* PLACEHOLDER IF LIST IS EMPTY */}
            {generateRenderList().length === 0 && !startSearch && (
              <Empty description="No result!" isFullWidth pY={20} />
            )}

            {startSearch && (
              <Placeholder>
                <CircularProgress size={30} />
              </Placeholder>
            )}
          </BoardBody>
        )}

        {/* PERMISSION */}
        {isPermissionSettingMode() && (
          <PermissionSetting
            searchKeyWord={searchTerm}
            startSearch={startSearch}
          />
        )}
      </Board>

      {/* DIALOG WHEN DELETE USER */}
      <ConfirmDialog
        open={openConfirmDialog}
        title="Are you sure?"
        content={
          <p>
            Do you want to delete{' '}
            <Typography display={'inline'} fontWeight={600} color="error">
              {deletedMember.fullname}
            </Typography>{' '}
            from this workspace?
          </p>
        }
        onConfirm={() => {
          alert('confirm')
        }}
        onClose={toggleConfirmDialogDeleteMember}
      />
    </Container>
  )
}
export default MemberSection
