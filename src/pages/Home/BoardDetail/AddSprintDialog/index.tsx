/* eslint-disable indent */
import WindowDialog from '~/components/dialog/WIndowDialog'
import IProps from './IProps'
import {
  ActionButtonsGroup,
  Body,
  Container,
  Error,
  Group,
  SubTitle
} from './styles'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  SPRINT_DURATION_IN_WEEK,
  SPRINT_MODAL_VIEW_MODE
} from '~/utils/constant/sprint'
import DateInput from '~/components/DateInput'
import { calculateEndDate } from '~/utils/helper'
import { createSprint, updateSprint } from '~/services/sprintService'
import { enqueueSnackbar } from 'notistack'
import { cloneDeep } from 'lodash'
import { DATE_FORMAT, SPRINT_STATUS } from '~/utils/constant'

export default function AddSprintDialog(props: IProps) {
  // ----------------PROPS----------------
  const { open, onCancel, board, createSuccessCb, mode, defaultSprint } = props
  const isCreateMode = () => mode === SPRINT_MODAL_VIEW_MODE.create
  const isEditMode = () => mode === SPRINT_MODAL_VIEW_MODE.edit
  const isStartMode = () => mode === SPRINT_MODAL_VIEW_MODE.start
  const emptySprint = {
    name: '',
    duration: 0,
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
    goal: '',
    status: '',
    _id: ''
  }
  const emptyError = {
    name: '',
    duration: '',
    startDate: '',
    endDate: '',
    goal: '',
    status: ''
  }
  const initSprint = isCreateMode()
    ? cloneDeep(emptySprint)
    : cloneDeep(defaultSprint)
  const [sprint, setSprint] = useState(initSprint)
  const [error, setError] = useState(cloneDeep(emptyError))

  // ----------------FUNCTIONS----------------
  const handleCloseDialog = () => {
    setSprint(initSprint)
    setError(cloneDeep(emptyError))
    onCancel()
  }

  const validate = () => {
    let isValid = true
    const newError = cloneDeep(emptyError)

    if (!sprint?.name) {
      newError.name = 'Title is required'
      isValid = false
    } else {
      if (sprint?.name.length < 2) {
        newError.name = 'Title must be at least 2 characters long'
        isValid = false
      }
      if (sprint?.name.length > 100) {
        newError.name = 'Title must be at most 100 characters long'
        isValid = false
      }
    }

    if (!sprint?.startDate) {
      newError.startDate = 'Start date is required'
      isValid = false
    }

    if (!sprint?.endDate) {
      newError.endDate = 'End date is required'
      isValid = false
    }

    // check if start date is before now
    if (dayjs(sprint?.startDate).isBefore(dayjs().startOf('day'))) {
      newError.startDate = 'Start date must be after today'
      isValid = false
    }

    // check if end date is before now
    if (dayjs(sprint?.endDate).isBefore(dayjs().startOf('day'))) {
      newError.endDate = 'End date must be after today'
      isValid = false
    }

    if (isCustomDuration()) {
      // check if end date is before or equal start date
      if (dayjs(sprint?.endDate).isBefore(dayjs(sprint?.startDate))) {
        newError.endDate = 'End date must be after start date'
        isValid = false
      }
    }
    if (sprint?.goal) {
      if (sprint?.goal.length < 2) {
        newError.goal = 'Goal must be at least 2 characters long'
        isValid = false
      }
      if (sprint?.goal.length > 2000) {
        newError.goal = 'Goal must be at most 2000 characters long'
        isValid = false
      }
    }

    setError(newError)
    return isValid
  }

  const handleCreateSprint = async () => {
    if (!validate()) return
    try {
      const data: {
        name: string
        goal?: string
      } = {
        name: sprint?.name as string
      }
      if (sprint?.goal) {
        data['goal'] = sprint?.goal
      }
      await createSprint({
        boardId: board._id,
        sprint: {
          ...data
        }
      })
      enqueueSnackbar('Create sprint successfully', { variant: 'success' })
      createSuccessCb()
      handleCloseDialog()
    } catch (e) {
      enqueueSnackbar('Create sprint failed', { variant: 'error' })
    }
  }

  const handleStartSprint = async () => {
    if (!validate()) return
    if (!board?._id || !sprint?._id) return
    try {
      if (isEditMode()) {
        const data: {
          name: string
          goal?: string
        } = {
          name: sprint?.name as string
        }
        if (sprint?.goal) {
          data['goal'] = sprint?.goal
        }
        await updateSprint({
          boardId: board._id,
          sprint: {
            _id: sprint._id,
            ...data
          }
        })
        enqueueSnackbar('Edit sprint successfully', { variant: 'success' })
      } else {
        await updateSprint({
          boardId: board._id,
          sprint: {
            name: sprint.name,
            duration:
              sprint?.duration === 'custom' ? 0 : (sprint?.duration as number),
            startDate: dayjs(sprint?.startDate).format(DATE_FORMAT).toString(),
            endDate: dayjs(sprint?.endDate).format(DATE_FORMAT).toString(),
            goal: sprint?.goal,
            _id: sprint._id,
            status: SPRINT_STATUS.active
          }
        })
        enqueueSnackbar('Start sprint successfully', { variant: 'success' })
      }

      createSuccessCb()
      handleCloseDialog()
    } catch (e) {
      enqueueSnackbar('Start sprint failed', { variant: 'error' })
    }
  }

  const onSubmit = () => {
    switch (mode) {
      case SPRINT_MODAL_VIEW_MODE.create:
        handleCreateSprint()
        break
      case SPRINT_MODAL_VIEW_MODE.edit:
      case SPRINT_MODAL_VIEW_MODE.start:
        handleStartSprint()
        break
      default:
        break
    }
  }

  const handleUpdateSprint = (key: string, value: string | number | Date) => {
    setSprint({
      ...sprint,
      [key]: value
    })
  }

  const displayDuration = (duration: number | string) => {
    // if 0 show 'custom'
    if (duration === 0 || duration === 'custom') {
      return 'Custom'
    }
    if (typeof duration === 'number')
      return `${duration} week${duration > 1 ? 's' : ''}`
  }

  const isCustomDuration = () => {
    return sprint?.duration === 0 || sprint?.duration === 'custom'
  }

  const windowTitle = () => {
    if (isStartMode()) return 'Start Sprint'
    if (isEditMode()) return 'Edit Sprint'
    return 'Create Sprint'
  }

  const submitButtonText = () => {
    if (isStartMode()) return 'Start'
    if (isEditMode()) return 'Save'
    return 'Create'
  }

  // ----------------EFFECT----------------
  useEffect(() => {
    if (isCustomDuration()) return
    else {
      if (!board?.workingDays.length) return
      const endDate = calculateEndDate(
        sprint?.startDate as Date,
        sprint?.duration as number,
        board.workingDays
      )
      setSprint({ ...sprint, endDate: endDate })
    }
  }, [board, sprint?.duration, sprint?.startDate])

  useEffect(() => {
    if (
      (isStartMode() || isEditMode()) &&
      !sprint?.endDate &&
      !sprint?.startDate &&
      sprint
    ) {
      const initEndDate = dayjs().toDate()
      const initStartDate = dayjs().toDate()
      setSprint({ ...sprint, endDate: initEndDate, startDate: initStartDate })
    }
  }, [])
  return (
    <WindowDialog open={open} onClose={handleCloseDialog} title={windowTitle()}>
      <Container>
        <Body>
          {/* ----------TITLE--------- */}
          <Group>
            <SubTitle $isRequired>Title</SubTitle>
            <TextField
              label=""
              placeholder="Sprint name..."
              size="small"
              value={sprint?.name}
              onChange={(e) => handleUpdateSprint('name', e.target.value)}
              error={!!error.name}
              helperText={error.name}
            />
          </Group>

          {/* ----------DURATION--------- */}
          {isStartMode() && (
            <Group>
              <SubTitle $isRequired>Duration</SubTitle>
              <Select
                label=""
                placeholder="Duration"
                size="small"
                error={!!error.duration}
                value={sprint?.duration}
                onChange={(e) =>
                  handleUpdateSprint(
                    'duration',
                    e.target.value !== 'custom' ? Number(e.target.value) : 0
                  )
                }>
                {SPRINT_DURATION_IN_WEEK.map((duration) => (
                  <MenuItem value={duration !== 'custom' ? duration : 0} key={duration}>
                    {displayDuration(duration)}
                  </MenuItem>
                ))}
              </Select>
            </Group>
          )}

          {/* ----------DATE--------- */}
          {isStartMode() && (
            <Group className="row c-gap-5">
              <Group className="level-2 mb-0">
                <SubTitle $isRequired={true}>Start date</SubTitle>
                <DateInput
                  label=""
                  disablePast
                  size="small"
                  error={!!error.startDate}
                  sx={{ height: '35px' }}
                  onChange={(date: Date) =>
                    handleUpdateSprint('startDate', date)
                  }
                  value={dayjs(sprint?.startDate)}
                />
                {error.startDate && <Error>{error.startDate}</Error>}
              </Group>
              <Group className="level-2 mb-0">
                <SubTitle $isRequired>End date</SubTitle>
                <DateInput
                  label=""
                  size="small"
                  error={!!error.endDate}
                  minDate={dayjs(sprint?.startDate)}
                  sx={{
                    height: '35px',
                    '.Mui-disabled': {
                      cursor: isCustomDuration() ? '' : 'not-allowed'
                    }
                  }}
                  onChange={(date: Date) => handleUpdateSprint('endDate', date)}
                  value={dayjs(sprint?.endDate)}
                  disabled={!isCustomDuration()}
                />
                {error.endDate && <Error>{error.endDate}</Error>}
              </Group>
            </Group>
          )}

          {/* ----------GOAL--------- */}
          <Group>
            <SubTitle>Goal</SubTitle>
            <TextField
              error={!!error.goal}
              helperText={error.goal}
              label=""
              multiline
              rows={4}
              placeholder="Sprint goal..."
              size="small"
              value={sprint?.goal}
              onChange={(e) => handleUpdateSprint('goal', e.target.value)}
            />
          </Group>
        </Body>
        <ActionButtonsGroup>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button size="small" variant="contained" onClick={onSubmit}>
            {submitButtonText()}
          </Button>
        </ActionButtonsGroup>
      </Container>
    </WindowDialog>
  )
}
