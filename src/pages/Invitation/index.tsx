import { useEffectOnce } from 'usehooks-ts'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

// component libraries
import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import { TbNetwork } from 'react-icons/tb'

// components
import Loading from './Loading'
import * as styles from './styles'

// services
import { IInvitation } from '~/services/types'
import { getDetail, respondInvitation } from '~/services/inviteService'
import { StoreType } from '~/redux'

const Invitation = () => {
  const {
    Background,
    BlurLayer,
    Buttons,
    Container,
    GroupMembers,
    Image,
    Letter,
    Modal,
    ImageGroup
  } = styles

  const [invitation, setInvitation] = useState<IInvitation | undefined>()
  const { id } = useParams()
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const navigate = useNavigate()

  const generalMembers = useMemo(() => {
    if (invitation) {
      const {
        teamWorkspace: { workspaceAdmins }
      } = invitation

      const workspaceMembers = invitation.teamWorkspaceMember?.workspaceMembers

      // merge admin list and member list
      const members = [...workspaceAdmins.map((item) => ({ user: item.user }))]
      if (workspaceMembers) {
        workspaceMembers.forEach((mem) => {
          mem.user && members.push(mem)
        })
      }

      // delete duplicated members
      const filteredMemList = members.filter(
        (member, index, all) =>
          index === all.findIndex((obj) => obj.user._id === member.user._id)
      )

      // current user is not the receiver
      if (invitation.receiver._id !== currentUser?._id) {
        enqueueSnackbar('Unauthorized! Switching to home', {
          variant: 'info'
        })

        navigate('/u/home/', {
          replace: true
        })
        return
      }
      // current user is already in workspace
      if (
        filteredMemList?.find((mem) => mem.user._id === invitation.receiver._id)
      ) {
        enqueueSnackbar('Already a member! Switching to home', {
          variant: 'info'
        })
        navigate('/u/home/', {
          replace: true
        })
        return
      }

      return filteredMemList
    }
  }, [currentUser?._id, invitation])

  useEffectOnce(() => {
    const getData = async () => {
      try {
        const res = await getDetail({ id: id as string })
        if (res && res.data) {
          setInvitation(res.data)
        }
      } catch (err) {
        const message = (err as AxiosError).message
        if (message === `Invitation not found!`) {
          enqueueSnackbar(message, { variant: 'error' })
          navigate('/u/home/', {
            replace: true
          })
          return
        }
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      }
    }
    getData()
  })

  const handleRespondInvitation = (isAccepted: boolean) => {
    const respond = async () => {
      try {
        const res = await respondInvitation({
          wsID: invitation?.teamWorkspace._id as string,
          isAccepted,
          email: currentUser?.email as string
        })
        if (res) {
          if (isAccepted) {
            enqueueSnackbar(
              `Congratulations! You are a member of ${invitation?.teamWorkspace.name}`,
              {
                variant: 'success'
              }
            )
            navigate('/u/home/workspaces/' + invitation?.teamWorkspace._id, {
              replace: true
            })
          } else {
            navigate('/u/home/', {
              replace: true
            })
          }
        }
      } catch (err) {
        if (
          (err as Error).message ===
          'You are already a member of this workspace.'
        ) {
          navigate('/u/home/workspaces/' + invitation?.teamWorkspace._id, {
            replace: true
          })
          enqueueSnackbar((err as Error).message, { variant: 'warning' })
          return
        }
        enqueueSnackbar((err as Error).message, { variant: 'error' })
      }
    }
    respond()
  }
  return generalMembers ? (
    <Container>
      <Background $img={invitation?.senders.avatar}>
        <BlurLayer>
          <Modal>
            <p className="title">Invitation</p>
            <Letter>
              <ImageGroup>
                <Tooltip title={invitation?.senders.fullName}>
                  <Image>
                    <img src={invitation?.senders.avatar} />
                  </Image>
                </Tooltip>
                <TbNetwork />
                <Tooltip title={invitation?.receiver.fullName}>
                  <Image>
                    <img src={invitation?.receiver.avatar} />
                  </Image>
                </Tooltip>
              </ImageGroup>
              <p className="invitation-text">
                <b>{invitation?.senders.fullName}</b> has invited you to
                participate in workspace:
              </p>
              <p className="workspace-name">{invitation?.teamWorkspace.name}</p>
              <GroupMembers>
                <AvatarGroup
                  max={5}
                  // total={10}
                  sx={{
                    ml: '8px',
                    flexDirection: 'row',
                    '& .MuiAvatar-root': {
                      width: '35px',
                      height: '35px',
                      ml: '-8px',
                      boxShadow: '0 0 2px 1px rgba(0,0,0,0.2)'
                    },

                    '& .MuiAvatar-root:first-child': {
                      order: 3,
                      fontSize: '14px'
                      // bgcolor: (theme) => theme.palette.gray5.main,
                      // color: (theme) => theme.palette.gray.main
                    },
                    '& .MuiAvatar-root:last-child': {
                      ml: '-8px'
                    }
                  }}
                >
                  {generalMembers?.map((item) => (
                    <Avatar
                      alt={item.user.fullName}
                      src={item.user.avatar}
                      key={item.user._id}
                    />
                  ))}
                  {/* <Avatar alt="Leader" src={'/img/Beckam.png'} />
                  <Avatar alt="Quan que" src={'/img/avatar.jpg'} />
                  <Avatar alt="Quan que" src={'/img/Flo.jpg'} /> */}
                </AvatarGroup>
                <p className="text">
                  {generalMembers?.length} members are already in
                </p>
              </GroupMembers>
            </Letter>
            <Buttons>
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  handleRespondInvitation(false)
                }}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleRespondInvitation(true)
                }}
              >
                ✨ Accept the invitation
              </Button>
            </Buttons>
          </Modal>
        </BlurLayer>
      </Background>
    </Container>
  ) : (
    <Loading />
  )
}
export default Invitation
