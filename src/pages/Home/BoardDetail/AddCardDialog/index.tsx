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
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material'
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
import { createCard } from '~/services/cardService'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { SPRINT_STATUS } from '~/utils/constant'

const AddCardDialog = (props: IProps) => {
  const defaultCard = {
    reporterId: undefined,
    assigneeId: undefined,
    issueTypeId: undefined,
    priorityId: undefined,
    sprintId: undefined,
    labelId: undefined,
    storyPoint: undefined,
    columnId: undefined,
    epicId: undefined
  }
  const { board } = props
  const [issue, setIssue] = useState<{
    reporterId?: string
    assigneeId?: string
    issueTypeId?: string
    priorityId?: string
    sprintId?: string
    labelId?: string
    storyPoint?: number
    columnId?: string
    epicId?: string
  }>(cloneDeep(defaultCard))

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
  ).filter((issue) => issue.hierarchy === 2)
  const sprintData = useSelector((state: StoreType) => state.sprint.allSprints)

  // TOOLS
  const dispatch = useDispatch<StoreDispatchType>()
  const isScrum = () => board?.template === BOARD_TEMPLATE.SCRUM

  // EVENTS
  const handleCloseDialog = () => {
    dispatch(hideAddCardDialog())
    reset()
    setIssue(cloneDeep(defaultCard))
  }

  const { control, handleSubmit, reset } = useForm<IFormFields>({
    defaultValues: cloneDeep(emptyCard),
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    if (board && issue && issue.reporterId && issue.issueTypeId) {
      // Call api to create card
      dispatch(showLoading())
      try {
        const formattedDescription = JSON.stringify({
          content: data.description,
          formatter: `<p>${data.description}</p>`
        })

        const card = {
          ...data,
          ...issue,
          description: formattedDescription,
          columnId: board.initColumnId,
          boardId: board._id
        }
        const res = await createCard(card)
        if (res?.message) {
          handleCloseDialog()
          dispatch(setShouldRefreshBoardDetail(true))
          enqueueSnackbar('Create card successfully!', { variant: 'success' })
        }
      } catch (err) {
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  const handleChange = (field: string, newValue: string | number) => {
    setIssue((prevState) => ({
      ...prevState,
      [field]: newValue
    }))
  }

  const handleAssignToMe = () => {
    if (!userInfo?._id) return
    if (issue.assigneeId === userInfo._id) return
    if (
      board.memberIds.includes(userInfo._id) === false &&
      board.ownerIds.includes(userInfo._id) === false
    )
      return
    handleChange('assigneeId', userInfo._id)
  }

  // EFFECTS
  useEffect(() => {
    if (userInfo && issue.reporterId === undefined) {
      handleChange('reporterId', userInfo._id)
    }
    if (board && issue.assigneeId === undefined) {
      handleChange('assigneeId', board.defaultAssigneeId)
    }
    if (
      issueTypesData &&
      issueTypesData.length > 0 &&
      issue.issueTypeId === undefined
    ) {
      handleChange('issueTypeId', issueTypesData[0]._id)
    }
    if (
      priorityData &&
      priorityData.length > 0 &&
      issue.priorityId === undefined
    ) {
      handleChange('priorityId', priorityData[0]._id)
    }
    if (sprintData && sprintData.length > 0 && issue.sprintId === undefined) {
      const backlog = sprintData.find(
        (sprint) => sprint.status === SPRINT_STATUS.backlog
      )
      if (backlog) {
        handleChange('sprintId', backlog._id)
      } else {
        handleChange('sprintId', sprintData[0]._id)
      }
    }
  }, [board, openDialog])

  return (
    <WindowDialog
      open={openDialog}
      onClose={handleCloseDialog}
      title="Add issue"
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
                value={issue.sprintId}
                onChange={(e) =>
                  handleChange('sprintId', e.target.value as string)
                }
                sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
                {sprintData
                  .filter((sprint) => sprint.status !== SPRINT_STATUS.completed)
                  .map((sprint) => (
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
            <Select
              value={issue.issueTypeId}
              onChange={(e) =>
                handleChange('issueTypeId', e.target.value as string)
              }
              sx={{ height: '35px', 'MuiInputBase-root': { width: '100%' } }}>
              {issueTypesData.map((issue) => (
                <MenuItem key={issue._id} value={issue._id}>
                  <IssueType name={issue.name} icon={issue.icon} />
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
                value={issue.labelId}
                onChange={(e) =>
                  handleChange('labelId', e.target.value as string)
                }
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
                value={issue.priorityId}
                onChange={(e) =>
                  handleChange('priorityId', e.target.value as string)
                }
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
              value={issue.reporterId}
              onChange={(e) =>
                handleChange('reporterId', e.target.value as string)
              }
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
            <Stack direction="column" spacing={1} alignItems={'flex-start'}>
              <Select
                value={issue.assigneeId}
                onChange={(e) =>
                  handleChange('assigneeId', e.target.value as string)
                }
                sx={{
                  height: '40px',
                  width: '100%',
                  'MuiInputBase-root': { width: '100%', flex: 1 }
                }}>
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
                  <Empty
                    description="No priority available!"
                    pY={30}
                    size={60}
                  />
                )}
              </Select>
              <Button
                variant="text"
                color="primary"
                onClick={handleAssignToMe}
                size="small">
                Assign to me
              </Button>
            </Stack>
          </Group>

          {/* STORY POINT */}
          <Group>
            <SubTitle>Story point estimate</SubTitle>
            <TextField
              inputProps={{ type: 'number', min: 0 }}
              value={issue.storyPoint ?? null}
              size="small"
              helperText="Measurement of complexity and/or size of a requirement."
            />
          </Group>

          {/* ACTION BUTTONS */}
          <ActionButtons>
            <Button variant="text" color="error" onClick={handleCloseDialog}>
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
