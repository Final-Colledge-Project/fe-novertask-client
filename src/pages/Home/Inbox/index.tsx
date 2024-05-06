import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Conversation,
  Sidebar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
  Search,
  ConversationList,
  AvatarGroup
} from '@chatscope/chat-ui-kit-react'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { FALLBACK_IMAGE } from '~/utils/constant/common'
import { CustomAvatar, WorkspaceGroupTitle } from './styles'
import { Avatar as MuiAvatar } from '@mui/material'
import SearchBox from '~/components/SearchBox'
import TextInput from '~/components/TextInput'
import { RiSearch2Fill, RiSearch2Line } from 'react-icons/ri'

export default function Inbox() {
  const { boards: workspaces } = useSelector((state: StoreType) => state.board)

  // style for avatar when src is undefined
  const placeholderImageStyle = (image: string) => {
    const style = {
      background: `url(${image}), url(${FALLBACK_IMAGE})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
    if (!image) {
      style.background = `url(${FALLBACK_IMAGE})`
    } else {
      style.background = `url(${image}), url(${FALLBACK_IMAGE})`
    }
    return style
  }

  return (
    <MainContainer responsive style={{ width: '100%' }}>
      <Sidebar position="left">
        <TextInput
          placeHolder="Search..."
          label=""
          as={Search}
          sx={{ height: '30px', mt: '12px', px: '12px'}}
          startIcon={<RiSearch2Line />}
        />
        <ConversationList>
          {workspaces.map((workspace) => {
            return (
              <>
                <WorkspaceGroupTitle>
                  <span className="title-content">{workspace.name}</span>
                  <span className="title-line"></span>
                </WorkspaceGroupTitle>
                <Conversation
                  info="Yes i can do it for you"
                  lastSenderName="Lilly"
                  name={workspace.name}>
                  <MuiAvatar
                    component="div" // Add the missing component prop with the value of 'div'
                    sizes="42"
                    as={Avatar}
                    alt={workspace.name}
                    sx={{
                      marginRight: 2,
                      bgcolor: (theme) => theme.palette.blue.main
                    }}>
                    {workspace.name[0]}
                  </MuiAvatar>
                </Conversation>
                {workspace.boards?.map((board) => (
                  <Conversation
                    info="Yes i can do it for you"
                    lastSenderName="Lilly"
                    name={board.title}>
                    {/* <Avatar
                      name={''}
                      src={board.cover as string}

                      style={placeholderImageStyle(board.cover as string)}
                    /> */}
                    <CustomAvatar
                      as={Avatar}
                      style={placeholderImageStyle(
                        board.cover as string
                      )}></CustomAvatar>
                  </Conversation>
                ))}
              </>
            )
          })}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name="Zoe"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Zoe"
          />
          {/* <ConversationHeader.Actions>
            <VoiceCallButton />
            <VideoCallButton />
            <InfoButton />
          </ConversationHeader.Actions> */}
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}>
          <MessageSeparator content="Saturday, 30 November 2019" />
          <Message
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'single',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}>
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            avatarSpacer
            model={{
              direction: 'outgoing',
              message: 'Hello my friend',
              position: 'single',
              sender: 'Patrik',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'first',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'normal',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'normal',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'last',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}>
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
          <Message
            model={{
              direction: 'outgoing',
              message: 'Hello my friend',
              position: 'first',
              sender: 'Patrik',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            model={{
              direction: 'outgoing',
              message: 'Hello my friend',
              position: 'normal',
              sender: 'Patrik',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            model={{
              direction: 'outgoing',
              message: 'Hello my friend',
              position: 'normal',
              sender: 'Patrik',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            model={{
              direction: 'outgoing',
              message: 'Hello my friend',
              position: 'last',
              sender: 'Patrik',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            avatarSpacer
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'first',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}
          />
          <Message
            model={{
              direction: 'incoming',
              message: 'Hello my friend',
              position: 'last',
              sender: 'Zoe',
              sentTime: '15 mins ago'
            }}>
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Message>
        </MessageList>
        <MessageInput placeholder="Type message here" />
      </ChatContainer>
    </MainContainer>
  )
}
