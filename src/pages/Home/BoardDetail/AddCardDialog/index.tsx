import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import {
  ActionButtons,
  Form,
  Group,
  HorizontalDivider,
  Label,
  Modal,
  Priority,
  SubTitle
} from './style'
import { Button, MenuItem, Select } from '@mui/material'
import WindowDialog from '~/components/dialog/WIndowDialog'
import { hideAddCardDialog } from '~/redux/cardSlice'
import WithController from '~/components/InputWithController'
import TextInput from '~/components/TextInput'
import IFormFields from './IFormFields'
import { cloneDeep } from 'lodash'
import emptyCard from './emptyCard'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import Empty from '~/components/Empty'
import IProps from './IProps'
import useInfo from '~/hooks/useInfo'
import { useEffect, useState } from 'react'
import User from './User'
import IssueType from './Issue'
import { BOARD_TEMPLATE } from '~/utils/constant/board'

const AddCardDialog = (props: IProps) => {
  const { board } = props
  const [reporter, setReporter] = useState<string>()
  const [assignee, setAssignee] = useState<string>()
  const [issueTypeId, setIssueTypeId] = useState<string>()
  const [priorityId, setPriorityId] = useState<string>()
  const [sprintId, setSprintId] = useState<string>()

  // DATA
  const openDialog = useSelector(
    (state: StoreType) => state.card.openAddCardDialog
  )
  const labelData = useSelector((state: StoreType) => state.label.labels)
  const priorityData = useSelector(
    (state: StoreType) => state.priority.allPriorities
  )
  const boardMembers = useSelector((state: StoreType) => state.board.members)
  const userInfo = useInfo() // logged user info
  const issueTypesData = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )
  const sprintData = useSelector((state: StoreType) => state.sprint.allSprints)

  // TOOLS
  const dispatch = useDispatch<StoreDispatchType>()
  const isScrum = () => board?.template === BOARD_TEMPLATE.SCRUM

  // EVENTS
  const handleCloseDialog = () => {
    dispatch(hideAddCardDialog())
    reset()
  }

  const { control, handleSubmit, reset, getValues } = useForm<IFormFields>({
    defaultValues: cloneDeep(emptyCard),
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {}

  const handleChangeReporter = (newValue: string) => {
    setReporter(newValue)
  }

  const handleChangeAssignee = (newValue: string) => {
    setAssignee(newValue)
  }

  const handleChangeIssueType = (newValue: string) => {
    setIssueTypeId(newValue)
  }

  const handleChangePriority = (newValue: string) => {
    setPriorityId(newValue)
  }

  const handleChangeSprint = (newValue: string) => {
    setSprintId(newValue)
  }

  // EFFECTS
  useEffect(() => {
    if (userInfo && reporter === undefined) {
      setReporter(userInfo._id)
    }
    if (board && assignee === undefined) {
      setAssignee(board.defaultAssigneeId)
    }
    if (
      issueTypesData &&
      issueTypesData.length > 0 &&
      issueTypeId === undefined
    ) {
      setIssueTypeId(issueTypesData[0]._id)
    }
    if (priorityData && priorityData.length > 0 && priorityId === undefined) {
      setPriorityId(priorityData[0]._id)
    }
    if (sprintData && sprintData.length > 0 && sprintId === undefined) {
      setSprintId(sprintData[0]._id)
    }
  }, [board])

  return (
    <WindowDialog
      open={openDialog}
      onClose={handleCloseDialog}
      title="Add card"
      sx={{ padding: '12px 0' }}
      cancelBtnText="Cancel"
      dialogContentProp={{ sx: { padding: '20px 0' } }}
      confirmBtnText="Create">
      <Modal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* SPRINT */}
          {isScrum() && (
            <Group>
              <SubTitle $isRequired={true}>Sprint</SubTitle>
              <Select
                value={sprintId}
                sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
                {sprintData.map((sprint) => (
                  <MenuItem key={sprint._id} value={sprint._id}>
                    {sprint.name}
                  </MenuItem>
                ))}
                {sprintData.length === 0 && (
                  <Empty
                    description="No issue type available!"
                    pY={30}
                    size={60}
                  />
                )}
              </Select>
            </Group>
          )}

          {/* ISSUE TYPE */}
          <Group>
            <SubTitle $isRequired={true}>Issue type</SubTitle>
            {board?.template}
            <Select
              value={issueTypeId}
              sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
              {issueTypesData.map((issue) => (
                <MenuItem key={issue._id} value={issue._id}>
                  <IssueType
                    color={issue.color}
                    name={issue.name}
                    icon={issue.icon}
                  />
                </MenuItem>
              ))}
              {issueTypesData.length === 0 && (
                <Empty
                  description="No issue type available!"
                  pY={30}
                  size={60}
                />
              )}
            </Select>
          </Group>

          <HorizontalDivider />

          {/* TITLE */}
          <Group>
            <SubTitle $isRequired={true}>Title</SubTitle>
            <WithController control={control} name="title">
              <TextInput
                label=""
                placeHolder="Issue name..."
                sx={{ height: '35px' }}
              />
            </WithController>
          </Group>

          {/* DESCRIPTION */}
          <Group>
            <SubTitle $isRequired={true}>Description</SubTitle>
            <WithController control={control} name="description">
              <TextInput label="" multiple placeholder="Add description..." />
            </WithController>
          </Group>

          <Group className="row">
            {/* LABELS */}
            <Group className="level-2">
              <SubTitle>Label</SubTitle>
              <Select
                sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
                {labelData.map((label) => (
                  <MenuItem key={label._id} value={label._id}>
                    <Label $color={label.color}>{label.name}</Label>
                  </MenuItem>
                ))}
                {labelData.length === 0 && (
                  <Empty description="No labels available!" pY={30} size={60} />
                )}
              </Select>
            </Group>

            {/* PRIORITY */}
            <Group className="level-2">
              <SubTitle $isRequired>Priority</SubTitle>
              <Select
                value={priorityId}
                sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
                {priorityData.map((priority) => (
                  <MenuItem dense key={priority._id} value={priority._id}>
                    <Priority $color={priority.color}>{priority.name}</Priority>
                  </MenuItem>
                ))}
                {priorityData.length === 0 && (
                  <Empty
                    description="No priority available!"
                    pY={30}
                    size={60}
                  />
                )}
              </Select>
            </Group>
          </Group>

          {/* REPORTER */}
          <Group>
            <SubTitle>Reporter</SubTitle>
            <Select
              value={reporter}
              onChange={(e) => handleChangeReporter(e.target.value as string)}
              sx={{ height: '40px', 'MuiInputBase-root': { width: '100%' } }}>
              {boardMembers?.oweners.map((member) => (
                <MenuItem dense key={member._id} value={member._id}>
                  <User
                    avt={member.avatar}
                    fullName={member.firstName + ' ' + member.lastName}
                  />
                </MenuItem>
              ))}
              {boardMembers?.members.map((member) => (
                <MenuItem dense key={member._id} value={member._id}>
                  <User
                    avt={member.avatar}
                    fullName={member.firstName + ' ' + member.lastName}
                  />
                </MenuItem>
              ))}
              {priorityData.length === 0 && (
                <Empty description="No reporter available!" pY={30} size={60} />
              )}
            </Select>
          </Group>

          {/* ASSIGNEE */}
          <Group>
            <SubTitle>Assignee</SubTitle>
            {board?.defaultAssigneeId}
            <Select
              value={assignee}
              onChange={(e) => handleChangeAssignee(e.target.value as string)}
              sx={{ height: '40px', 'MuiInputBase-root': { width: '100%' } }}>
              {boardMembers?.oweners.map((member) => (
                <MenuItem dense key={member._id} value={member._id}>
                  <User
                    avt={member.avatar}
                    fullName={member.firstName + ' ' + member.lastName}
                  />
                </MenuItem>
              ))}
              {boardMembers?.members.map((member) => (
                <MenuItem dense key={member._id} value={member._id}>
                  <User
                    avt={member.avatar}
                    fullName={member.firstName + ' ' + member.lastName}
                  />
                </MenuItem>
              ))}
              {priorityData.length === 0 && (
                <Empty description="No priority available!" pY={30} size={60} />
              )}
            </Select>
          </Group>

          {/* ACTION BUTTONS */}
          <ActionButtons>
            <Button variant="text" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </ActionButtons>
        </Form>
      </Modal>
    </WindowDialog>
  )
}
export default AddCardDialog
