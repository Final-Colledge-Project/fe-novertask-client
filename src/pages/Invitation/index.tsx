import { Avatar, AvatarGroup } from '@mui/material'
import * as styles from './styles'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { IInvitation } from '~/services/types'
import { useParams } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'
import { getDetail } from '~/services/inviteService'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { useMemo } from 'react'
import { TbNetwork } from 'react-icons/tb'
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

  const members = useMemo(() => {
    if (invitation) {
      const {
        teamWorkspace: { workspaceAdmins }
      } = invitation

      const workspaceMembers = invitation.teamWorkspaceMember?.workspaceMembers

      // merge admin list and member list
      const members = [...workspaceAdmins.map((item) => ({ user: item.user }))]
      if (workspaceMembers) {
        members.push(...workspaceMembers)
      }

      // delete duplicated members
      return members.filter(
        (member, index, all) =>
          index ===
          all.findIndex((obj) => obj.user.fullName === member.user.fullName)
      )
    }
  }, [invitation])

  useEffectOnce(() => {
    const getData = async () => {
      try {
        const res = await getDetail({ id: id as string })
        if (res && res.data) {
          setInvitation(res.data)
        }
      } catch (err) {
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      }
    }
    getData()
  })

  const handleRespond = (isAccepted: boolean) => {
    enqueueSnackbar(isAccepted ? 'OK' : 'No OK', {
      variant: isAccepted ? 'success' : 'error'
    })
  }
  return (
    <Container>
      <Background $img={invitation?.senders.avatar}>
        <BlurLayer>
          <Modal>
            <p className="title">Invitation</p>
            <Letter>
              <ImageGroup>
                <Image>
                  <img src={invitation?.senders.avatar} />
                </Image>
                <TbNetwork />
                <Image>
                  <img src={invitation?.receiver.avatar} />
                </Image>
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
                  {members?.map((item) => (
                    <Avatar
                      alt={item.user.fullName}
                      src={item.user.avatar}
                      key={item.user.avatar}
                    />
                  ))}
                  {/* <Avatar alt="Leader" src={'/img/Beckam.png'} />
                  <Avatar alt="Quan que" src={'/img/avatar.jpg'} />
                  <Avatar alt="Quan que" src={'/img/Flo.jpg'} /> */}
                </AvatarGroup>
                <p className="text">{members?.length} members are already in</p>
              </GroupMembers>
            </Letter>
            <Buttons>
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  handleRespond(false)
                }}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleRespond(true)
                }}
              >
                ✨ Accept the invitation
              </Button>
            </Buttons>
          </Modal>
        </BlurLayer>
      </Background>
    </Container>
  )
}
export default Invitation
