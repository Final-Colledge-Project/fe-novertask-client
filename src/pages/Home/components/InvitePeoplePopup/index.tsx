import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'

// component libraries
import {
  IconButton,
  Button,
  Avatar,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip
} from '@mui/material'
import { RiCloseFill } from 'react-icons/ri'

// components
import {
  Container,
  CurrentMember,
  Form,
  Header,
  MemberItem,
  MemberList,
  Modal,
  RoleBadge
} from './styles'
import TextInput from '~/components/TextInput'

// form
import IFormFields from './IFormFields'
import schema from './formSchema'

//services
import { StoreType } from '~/redux'
import WithController from '~/components/InputWithController'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { sendInvitation } from '~/services/inviteService'
import { setPopupInvitePeople } from '~/redux/popupSlice'
import { IBoardMembers } from '~/services/types'
import { useEffect, useState } from 'react'
import useWSPermission from '~/hooks/useWSPermission'
import Empty from '~/components/Empty'

const InvitePeoplePopup = () => {
  const { control, handleSubmit, reset, setError } = useForm<IFormFields>({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })
  const [invitedRole, setInvitedRole] = useState<string>()

  const currentWSPermission = useSelector(
    (store: StoreType) => store.permission.currentWSPermission
  )
  const userPermissionOnWS = useWSPermission()
  const isAdmin = () => userPermissionOnWS?.isWSAdmin

  const {
    data: { members, wsID },
    show
  } = useSelector((state: StoreType) => state.popup.PopupInvite)

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    if (!wsID || !data.email || !invitedRole) return
    // check if email is in workspace
    const { workspaceAdmins, workspaceMembers } = members as IBoardMembers
    const memberList = [...workspaceAdmins.map((mem) => mem.user)]
    if (workspaceMembers)
      memberList.push(...workspaceMembers.map((mem) => mem.user))
    if (memberList.find((mem) => mem?.email === data.email)) {
      setError('email', {
        type: 'validate',
        message: 'User is already in this workspace '
      })
    } else
      try {
        dispatch(showLoading())
        const res = await sendInvitation({
          email: data.email,
          wsID: wsID as string,
          permissionId: invitedRole as string
        })
        if (res) {
          enqueueSnackbar(`Sent invitation to ${data.email} successfully!`, {
            variant: 'success'
          })
          handleClose()
        }
      } catch (err) {
        enqueueSnackbar((err as Error).message, {
          variant: 'error'
        })
      } finally {
        dispatch(hideLoading())
      }
  }

  const handleClose = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    reset()
    e?.stopPropagation()
    dispatch(
      setPopupInvitePeople({
        show: false,
        data: { wsID: undefined, members: undefined }
      })
    )
  }

  const superAdminFirstList = () => {
    if (members) {
      const { workspaceAdmins } = members as IBoardMembers
      const result = [workspaceAdmins.find((mem) => mem.role === 'superAdmin')]
      result.push(...workspaceAdmins.filter((mem) => mem.role === 'admin'))

      return result
    }
  }

  const changeRole = (newRole: string) => {
    setInvitedRole(newRole)
  }

  // get role of user in workspace
  // id: user id
  const roleInWS = (id: string) => {
    if (!id || !members) return
    const foundGroup = currentWSPermission?.find((role) => {
      return role.memberIds.includes(id)
    })
    if (foundGroup) {
      return { name: foundGroup.name, color: foundGroup.color }
    }
    // return empty value if not found
    return { name: '', color: '' }
  }

  // set viewer permission as init value
  useEffect(() => {
    if (!invitedRole && currentWSPermission) {
      const viewerPermission = currentWSPermission?.find(
        (role) => role.isWSViewer
      )
      if (viewerPermission) setInvitedRole(viewerPermission._id)
    }
  }, [currentWSPermission, show, invitedRole])

  return (
    <Container
      onClick={(e) => handleClose(e)}
      className={clsx(!show && 'hidden')}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <div className="title">
            <p>Invite people to workspace</p>
          </div>
          <IconButton onClick={(e) => handleClose(e)}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={2}>
            <WithController control={control} name="email">
              <TextInput label="User email address" />
            </WithController>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id="invite-as" shrink={true}>
                Invite as
              </InputLabel>

              {/* ROLE SELECT: ACTIVE */}
              {isAdmin() && invitedRole && (
                <Select
                  notched={true}
                  label="Invite as"
                  labelId="invite-as"
                  value={invitedRole}
                  onChange={(e) => changeRole(e.target.value)}>
                  {currentWSPermission?.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {/* ROLE SELECT: DISABLED */}
              {!isAdmin() && invitedRole && (
                <Tooltip title="Only admin can choose invited role">
                  <span style={{ width: '100%' }}>
                    <Select
                      notched={true}
                      label="Invite as"
                      labelId="invite-as"
                      disabled={true}
                      fullWidth
                      value={invitedRole}
                      onChange={(e) => changeRole(e.target.value)}>
                      {currentWSPermission?.map((role) => (
                        <MenuItem key={role._id} value={role._id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                </Tooltip>
              )}
            </FormControl>
          </Stack>
          <div className="button-group">
            <Button
              variant="text"
              color="error"
              onClick={(e) => handleClose(e)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Send invitation
            </Button>
          </div>
        </Form>
        <CurrentMember>
          <div className="title">Current members</div>
          <MemberList>
            {superAdminFirstList()?.map((member) => (
              <MemberItem key={member?.user?._id}>
                <div className="image">
                  <Avatar src={member?.user?.avatar} alt="" />
                </div>
                <div className="info">
                  <div className="name">{member?.user?.fullName}</div>
                  <div className="email">{member?.user?.email}</div>
                </div>
                <RoleBadge
                  $color={
                    roleInWS(member?.user?._id as string)?.color as string
                  }>
                  {roleInWS(member?.user?._id as string)?.name}
                </RoleBadge>
              </MemberItem>
            ))}
            {members?.workspaceMembers?.map((mem) => (
              <MemberItem key={mem.user?._id}>
                <div className="image">
                  <Avatar src={mem?.user?.avatar} alt="" />
                </div>
                <div className="info">
                  <div className="name">{mem?.user?.fullName}</div>
                  <div className="email">{mem?.user?.email}</div>
                </div>
                <RoleBadge
                  $color={roleInWS(mem?.user?._id as string)?.color as string}>
                  {roleInWS(mem?.user?._id as string)?.name}
                </RoleBadge>
              </MemberItem>
            ))}

            {(!superAdminFirstList() ||
              (superAdminFirstList()?.length === 0 &&
                members?.workspaceMembers?.length === 0)) && (
              <Empty description="No result!" isFullWidth pY={50} />
            )}
          </MemberList>
        </CurrentMember>
      </Modal>
    </Container>
  )
}

export default InvitePeoplePopup
