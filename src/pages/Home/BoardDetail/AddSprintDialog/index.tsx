import WindowDialog from '~/components/dialog/WIndowDialog'
import IProps from './IProps'
import { ActionButtonsGroup, Body, Container, Group, SubTitle } from './styles'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  SPRINT_DURATION_IN_WEEK,
  SPRINT_MODAL_VIEW_MODE
} from '~/utils/constant/sprint'
import DateInput from '~/components/DateInput'
import { calculateEndDate } from '~/utils/helper'
import { createSprint } from '~/services/sprintService'
import { enqueueSnackbar } from 'notistack'

export default function AddSprintDialog(props: IProps) {
  // ----------------PROPS----------------
  const { open, onCancel, board, createSuccessCb, mode } = props
  const [sprint, setSprint] = useState({
    title: '',
    duration: 0,
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
    goal: ''
  })
  const [error, setError] = useState({
    title: '',
    duration: '',
    startDate: '',
    endDate: '',
    goal: ''
  })

  // ----------------FUNCTIONS----------------
  const handleCloseDialog = () => {
    setSprint({
      title: '',
      duration: 0,
      startDate: dayjs().toDate(),
      endDate: dayjs().toDate(),
      goal: ''
    })
    setError({
      title: '',
      duration: '',
      startDate: '',
      endDate: '',
      goal: ''
    })
    onCancel()
  }

  const validate = () => {
    let isValid = true
    const newError = {
      title: '',
      duration: '',
      startDate: '',
      endDate: '',
      goal: ''
    }

    if (!sprint.title) {
      newError.title = 'Title is required'
      isValid = false
    } else {
      if (sprint.title.length < 2) {
        newError.title = 'Title must be at least 2 characters long'
        isValid = false
      }
      if (sprint.title.length > 100) {
        newError.title = 'Title must be at most 100 characters long'
        isValid = false
      }
    }

    if (!sprint.startDate) {
      newError.startDate = 'Start date is required'
      isValid = false
    }

    if (!sprint.endDate) {
      newError.endDate = 'End date is required'
      isValid = false
    }

    if (sprint.goal) {
      if (sprint.goal.length < 2) {
        newError.goal = 'Goal must be at least 2 characters long'
        isValid = false
      }
      if (sprint.goal.length > 2000) {
        newError.goal = 'Goal must be at most 2000 characters long'
        isValid = false
      }
    } else {
      newError.goal = 'Goal is required'
      isValid = false
    }

    setError(newError)
    return isValid
  }

  const handleCreateSprint = async () => {
    if (!validate()) return
    try {
      await createSprint({
        boardId: board._id,
        sprint: {
          name: sprint.title,
          goal: sprint.goal
        }
      })
      createSuccessCb()
      handleCloseDialog()
    } catch (e) {
      enqueueSnackbar('Create sprint failed', { variant: 'error' })
    }
  }

  const handleUpdateSprint = (key: string, value: string | number | Date) => {
    setSprint({
      ...sprint,
      [key]: value
    })
  }

  const displayDuration = (duration: number) => {
    // if 0 show 'custom'
    if (duration === 0) {
      return 'Custom'
    }
    return `${duration} week${duration > 1 ? 's' : ''}`
  }

  const isCustomDuration = () => {
    return sprint.duration === 0
  }

  const isCreateMode = () => mode === SPRINT_MODAL_VIEW_MODE.create
  const isEditMode = () => mode === SPRINT_MODAL_VIEW_MODE.edit

  // ----------------EFFECT----------------
  useEffect(() => {
    if (isCustomDuration()) return
    else {
      if (!board?.workingDays.length) return
      const endDate = calculateEndDate(
        sprint.startDate,
        sprint.duration,
        board.workingDays
      )
      setSprint({ ...sprint, endDate: endDate })
    }
  }, [sprint, board])

  return (
    <WindowDialog open={open} onClose={handleCloseDialog} title="Create sprint">
      <Container>
        <Body>
          {/* ----------TITLE--------- */}
          <Group>
            <SubTitle $isRequired>Title</SubTitle>
            <TextField
              label=""
              placeholder="Sprint name..."
              size="small"
              value={sprint.title}
              onChange={(e) => handleUpdateSprint('title', e.target.value)}
              error={!!error.title}
              helperText={error.title}
            />
          </Group>

          {/* ----------DURATION--------- */}
          {isEditMode() && (
            <Group>
              <SubTitle $isRequired>Duration</SubTitle>
              <Select
                label=""
                placeholder="Duration"
                size="small"
                error={!!error.duration}
                value={sprint.duration}
                onChange={(e) =>
                  handleUpdateSprint('duration', Number(e.target.value))
                }>
                {SPRINT_DURATION_IN_WEEK.map((duration) => (
                  <MenuItem value={duration} key={duration}>
                    {displayDuration(duration)}
                  </MenuItem>
                ))}
              </Select>
            </Group>
          )}

          {/* ----------DATE--------- */}
          {isEditMode() && (
            <Group className="row c-gap-5">
              <Group className="level-2 mb-0">
                <SubTitle $isRequired={true}>Start date</SubTitle>
                <DateInput
                  label=""
                  disablePast
                  size="small"
                  sx={{ height: '35px' }}
                  onChange={(date: Date) =>
                    handleUpdateSprint('startDate', date)
                  }
                  value={dayjs(sprint.startDate)}
                />
              </Group>
              <Group className="level-2 mb-0">
                <SubTitle $isRequired>End date</SubTitle>
                <DateInput
                  label=""
                  size="small"
                  minDate={dayjs(sprint.startDate)}
                  sx={{
                    height: '35px',
                    '.Mui-disabled': {
                      cursor: isCustomDuration() ? '' : 'not-allowed'
                    }
                  }}
                  onChange={(date: Date) => handleUpdateSprint('endDate', date)}
                  value={dayjs(sprint.endDate)}
                  disabled={!isCustomDuration()}
                />
              </Group>
            </Group>
          )}

          {/* ----------GOAL--------- */}
          <Group>
            <SubTitle $isRequired>Goal</SubTitle>
            <TextField
              error={!!error.goal}
              helperText={error.goal}
              label=""
              multiline
              rows={4}
              placeholder="Sprint goal..."
              size="small"
              value={sprint.goal}
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
          <Button size="small" variant="contained" onClick={handleCreateSprint}>
            {isEditMode() ? 'Start' : 'Create'}
          </Button>
        </ActionButtonsGroup>
      </Container>
    </WindowDialog>
  )
}
