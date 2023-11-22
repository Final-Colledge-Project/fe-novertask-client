import { IconButton, Tooltip, Button, Avatar } from '@mui/material'
import {
  Container,
  CurrentMember,
  Form,
  Header,
  MemberItem,
  MemberList,
  Modal
} from './styles'
import { RiCloseFill, RiInformationLine } from 'react-icons/ri'
import { SubmitHandler, useForm } from 'react-hook-form'
import IFormFields from './IFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './formSchema'
import WithController from '~/components/InputWithController'
import TextInput from '~/components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { sendInvitation } from '~/services/inviteService'
import { enqueueSnackbar } from 'notistack'
import { setPopupInvitePeople } from '~/redux/popupSlice'
import clsx from 'clsx'
import { StoreType } from '~/redux'
import { IBoardMembers } from '~/services/types'

const InvitePeoplePopup = () => {
  const { control, handleSubmit, reset, setError } = useForm<IFormFields>({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const { PopupInvite } = useSelector((state: StoreType) => state.popup)

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    // check if email is in workspace
    const { workspaceAdmins, workspaceMembers } = PopupInvite.data
      .members as IBoardMembers
    const memberList = [...workspaceAdmins.map((mem) => mem.user)]
    if (workspaceMembers)
      memberList.push(...workspaceMembers.map((mem) => mem.user))
    if (memberList.find((mem) => mem.email === data.email)) {
      setError('email', {
        type: 'validate',
        message: 'User is already in this workspace '
      })
    } else
      try {
        dispatch(showLoading())
        const res = await sendInvitation({
          email: data.email,
          wsID: PopupInvite.data.wsID as string
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
  return (
    <Container
      onClick={(e) => handleClose(e)}
      className={clsx(!PopupInvite.show && 'hidden')}
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
            {PopupInvite.data.members?.workspaceAdmins.map((member) => (
              <MemberItem>
                <div className="image">
                  <Avatar src={member.user.avatar} alt="" />
                </div>
                <div className="info">
                  <div className="name">{member.user.fullName}</div>
                  <div className="email">{member.user.email}</div>
                </div>
                <div className="role admin">
                  {member.role === 'superAdmin' ? 'Super admin' : 'Admin'}
                </div>
              </MemberItem>
            ))}
            {PopupInvite.data.members?.workspaceMembers?.map((member) => (
              <MemberItem>
                <div className="image">
                  <Avatar src={member.user.avatar} alt="" />
                </div>
                <div className="info">
                  <div className="name">{member.user.fullName}</div>
                  <div className="email">{member.user.email}</div>
                </div>
                <div className="role member">Member</div>
              </MemberItem>
            ))}
          </MemberList>
        </CurrentMember>
      </Modal>
    </Container>
  )
}

export default InvitePeoplePopup
