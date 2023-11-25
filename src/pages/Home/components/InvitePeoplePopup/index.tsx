import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'

// component libraries
import { IconButton, Tooltip, Button, Avatar } from '@mui/material'
import { RiCloseFill, RiInformationLine } from 'react-icons/ri'

// components
import {
  Container,
  CurrentMember,
  Form,
  Header,
  MemberItem,
  MemberList,
  Modal
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

const InvitePeoplePopup = () => {
  const { control, handleSubmit, reset, setError } = useForm<IFormFields>({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const {
    data: { members, wsID },
    show
  } = useSelector((state: StoreType) => state.popup.PopupInvite)

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
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
          wsID: wsID as string
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
  return (
    <Container
      onClick={(e) => handleClose(e)}
      className={clsx(!show && 'hidden')}
    >
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <div className="title">
            <p>Invite people to workspace</p>
            <Tooltip
              arrow
              title={'Accepted people will become workspace member'}
            >
              <div className="icon">
                <RiInformationLine />
              </div>
            </Tooltip>
          </div>
          <IconButton onClick={(e) => handleClose(e)}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <WithController control={control} name="email">
            <TextInput label="User email address" />
          </WithController>
          <div className="button-group">
            <Button
              variant="text"
              color="error"
              onClick={(e) => handleClose(e)}
            >
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
                <div className={clsx('role', member?.role)}>
                  {member?.role === 'superAdmin' && 'Super admin'}
                  {member?.role === 'admin' && 'Admin'}
                </div>
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
                <div className={clsx('role', 'member')}>Member</div>
              </MemberItem>
            ))}

            {(!superAdminFirstList() ||
              (superAdminFirstList()?.length === 0 &&
                members?.workspaceMembers?.length === 0)) && (
              <p className="placeholder">There is no one here</p>
            )}
          </MemberList>
        </CurrentMember>
      </Modal>
    </Container>
  )
}

export default InvitePeoplePopup
