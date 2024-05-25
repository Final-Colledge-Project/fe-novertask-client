import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  ActionButtons,
  CloseButton,
  Content,
  Divider,
  Container,
  Mode,
  Overlay,
  RightPanel,
  SubTitle,
  Title,
  User,
  UserList,
  Group,
  Panel,
  AddUserButton,
  SubTitle2,
  CheckBoxList,
  TransitionList,
  TransitionItem
} from './style'
import IProps from './IProps'
import WindowDialog from '~/components/dialog/WIndowDialog'
import randomCover from '~/utils/randomCover'
import { RiAddLine, RiCloseLine, RiExternalLinkLine } from 'react-icons/ri'
import TextInput from '~/components/TextInput'
import ColorPicker from '~/components/ColorPicker'
import { useState } from 'react'
import { COLOR } from '~/utils/constant'
import { cloneDeep } from 'lodash'
import AddUserToGroupPopup from '../AddUserToGroupPopup'

interface IItem {
  title: string
  value: boolean
}

export default function PermissionGroupEdit({ open, closeCallback }: IProps) {
  const defaultPermission = [
    {
      title: 'All',
      value: false
    },
    {
      title: 'Create',
      value: false
    },
    {
      title: 'Update',
      value: false
    },
    {
      title: 'Delete',
      value: false
    }
  ]

  const [color, setColor] = useState<string>(COLOR.BLUE.main)
  const [columnPermission, setColumnPermission] = useState<IItem[]>(
    cloneDeep(defaultPermission)
  )
  const [userPermission, setUserPermission] = useState<IItem[]>([
    {
      title: 'Invite',
      value: false
    }
  ])
  const [issueTypePermission, setIssueTypePermission] = useState<IItem[]>(
    cloneDeep(defaultPermission)
  )
  const [priorityPermission, setPriorityPermission] = useState<IItem[]>(
    cloneDeep(defaultPermission)
  )
  const [labelPermission, setLabelPermission] = useState<IItem[]>(
    cloneDeep(defaultPermission)
  )
  const [cardPermission, setCardPermission] = useState<IItem[]>(
    cloneDeep(defaultPermission)
  )
  // handle open state of add user to group popup
  const [openAddUserToGroupPopup, setOpenAddUserToGroupPopup] =
    useState<boolean>(false)

  /*
   * Generic function to handle permission
   */
  const handlePermission = (prevState: IItem[], index: number) => {
    // Clone previous state
    const newColumnPermission = cloneDeep(prevState)

    // Choose [All]
    if (index === 0) {
      if (newColumnPermission[0].value) {
        newColumnPermission.forEach((_, index) => {
          newColumnPermission[index].value = false
        })
        return newColumnPermission
      } else {
        newColumnPermission.forEach((_, index) => {
          newColumnPermission[index].value = true
        })
        return newColumnPermission
      }
    }

    // Choose [Create], [Update], [Delete]
    newColumnPermission[index].value = !newColumnPermission[index].value
    const count = newColumnPermission.filter(
      (item, index) => item.value && index !== 0
    ).length
    if (count === prevState.length - 1) {
      newColumnPermission[0].value = true
    } else {
      newColumnPermission[0].value = false
    }
    return newColumnPermission
  }

  const changePermissionColumn = (index: number) => {
    setColumnPermission((prev) => handlePermission(prev, index))
  }

  const changePermissionIssueTypes = (index: number) => {
    setIssueTypePermission((prev) => handlePermission(prev, index))
  }
  const changePermissionPriority = (index: number) => {
    setPriorityPermission((prev) => handlePermission(prev, index))
  }
  const changePermissionLabel = (index: number) => {
    setLabelPermission((prev) => handlePermission(prev, index))
  }
  const changePermissionCards = (index: number) => {
    setCardPermission((prev) => handlePermission(prev, index))
  }

  const changePermissionUser = (index: number) => {
    setUserPermission((prev) => {
      const newUserPermission = cloneDeep(prev)
      newUserPermission[index].value = !newUserPermission[index].value
      return newUserPermission
    })
  }

  const handleCloseAddUserToGroupPopup = () => {
    setOpenAddUserToGroupPopup(false)
  }

  const handleOpenAddUserToGroupPopup = () => {
    setOpenAddUserToGroupPopup(true)
  }

  return (
    // <Overlay>
    // </Overlay>
    <WindowDialog
      open={open}
      onClose={() => closeCallback && closeCallback()}
      dialogTitleProp={{ sx: { padding: '0 8px' } }}
      dialogContentProp={{ sx: { padding: '0 8px 8px', overflowY: 'visible' } }}
      title={
        <Title>
          TITLE<Mode> • Edit</Mode>
        </Title>
      }>
      <Container onClick={(e) => e.stopPropagation()}>
        {/* MAIN CONTENT */}
        <Content>
          <Panel className="left">
            {/* TITLE */}
            <Group className="row c-gap-5">
              <Group>
                <SubTitle>Title</SubTitle>
                <TextInput label="" value="Title" sx={{ height: '35px' }} />
              </Group>
              <Group>
                <SubTitle>Color</SubTitle>
                <ColorPicker
                  chosenColor={color}
                  onChange={(color) => setColor(color)}
                />
              </Group>
            </Group>

            {/* DESCRIPTION */}
            <Group>
              <SubTitle>Description</SubTitle>
              <TextInput label="" value="Lorem lorem lorem" multiple />
            </Group>

            {/* USER LIST */}
            <Group>
              <SubTitle>
                Users<SubTitle2> • 8</SubTitle2>
              </SubTitle>
              <UserList>
                {/* {Array.from({ length: 8 }).map(() => (
                  <User>
                    <Tooltip arrow title="Lorem hjas diuasd aiusd aiosd asiod">
                      <Avatar
                        sx={{ width: '40px', height: '40px' }}
                        src={randomCover()}></Avatar>
                    </Tooltip>
                    <CloseButton style={{ width: '20px', height: '20px' }}>
                      <IconButton
                        sx={{
                          width: '35px',
                          height: '35px'
                        }}
                        color="inherit">
                        <RiCloseLine />
                      </IconButton>
                    </CloseButton>
                  </User>
                ))} */}

                {/* ADD USER BUTTON */}
                <AddUserButton onClick={handleOpenAddUserToGroupPopup}>
                  <RiAddLine />
                </AddUserButton>
              </UserList>
            </Group>
          </Panel>

          <Divider />

          <Panel className="right">
            <Group className="gap-0">
              <SubTitle className="mb-3">Permission</SubTitle>
              {/* COLUMNS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Columns
                </SubTitle>
                <CheckBoxList>
                  {columnPermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionColumn(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* ISSUE TYPES */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Issue types
                </SubTitle>
                <CheckBoxList>
                  {issueTypePermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionIssueTypes(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* PRIORITY */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Priority
                </SubTitle>
                <CheckBoxList>
                  {priorityPermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionPriority(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* LABEL */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Labels
                </SubTitle>
                <CheckBoxList>
                  {labelPermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionLabel(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* CARDS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Cards
                </SubTitle>
                <CheckBoxList>
                  {cardPermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionCards(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* MEMBERS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Users
                </SubTitle>
                <CheckBoxList>
                  {userPermission.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={item.value}
                          onChange={() => changePermissionUser(index)}
                        />
                      }
                      key={item.title}
                      label={item.title}
                      sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                    />
                  ))}
                </CheckBoxList>
              </Group>

              {/* TRANSITION */}
              <Group className="mt-3">
                <SubTitle>
                  Transition
                  <Tooltip title="Open flow page">
                    <IconButton size="small" color="primary">
                      <RiExternalLinkLine />
                    </IconButton>
                  </Tooltip>
                </SubTitle>
                <TransitionList>
                  <TransitionItem>Doraemon</TransitionItem>
                  <TransitionItem>Nobita</TransitionItem>
                </TransitionList>
              </Group>
            </Group>
          </Panel>
        </Content>

        <AddUserToGroupPopup
          open={openAddUserToGroupPopup}
          onClose={handleCloseAddUserToGroupPopup}
        />
        {/* ACTIONS */}
        <ActionButtons>
          <Button
            variant="text"
            color="error"
            onClick={() => closeCallback && closeCallback()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </ActionButtons>
      </Container>
    </WindowDialog>
  )
}
