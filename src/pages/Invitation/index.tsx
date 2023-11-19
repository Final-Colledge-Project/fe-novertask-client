import { Avatar, AvatarGroup } from '@mui/material'
import {
  Background,
  BlurLayer,
  Buttons,
  Container,
  GroupMembers,
  Image,
  Letter,
  Modal
} from './styles'
import Button from '@mui/material/Button'

const Invitation = () => {
  return (
    <Container>
      <Background $img="/img/item-cover-3.jpg">
        <BlurLayer>
          <Modal>
            <p className="title">Invitation</p>
            <Letter>
              <Image>
                <img src="/img/item-cover-3.jpg" />
              </Image>
              <p className="invitation-source">Finance</p>
              <p className="invitation-text">
                <b>Giang Hoang</b> has invited you to participate in this
                workspace
              </p>
              <GroupMembers>
                <AvatarGroup
                  // max={5}
                  total={10}
                  sx={{
                    ml: '8px',
                    flexDirection: 'row',
                    '& .MuiAvatar-root': {
                      width: '35px',
                      height: '35px',
                      ml: '-8px'
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
                  <Avatar alt="Admin" src={'/img/Annie.jpg'} />
                  <Avatar alt="Leader" src={'/img/Beckam.png'} />
                  <Avatar alt="Quan que" src={'/img/avatar.jpg'} />
                  <Avatar alt="Quan que" src={'/img/Flo.jpg'} />
                </AvatarGroup>
                <p className="text">10 members are already in</p>
              </GroupMembers>
            </Letter>
            <Buttons>
              <Button variant="text" color="error">
                Decline
              </Button>
              <Button variant="contained" color="primary">
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
