import WindowDialog from '~/components/dialog/WIndowDialog'
import IProps from './IProps'
import { ActionButtonsGroup, Body, Container, Group, SubTitle } from './styles'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import TextInput from '~/components/TextInput'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { SPRINT_DURATION_IN_WEEK } from '~/utils/constant/sprint'
import DateInput from '~/components/DateInput'
import { calculateEndDate } from '~/utils/helper'

export default function AddSprintDialog(props: IProps) {
  // ----------------PROPS----------------
  const { open, onCancel, board } = props
  const [sprint, setSprint] = useState({
    title: '',
    duration: 0,
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
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
    onCancel()
  }

  const handleCreateSprint = () => {}

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
            />
          </Group>

          {/* ----------DURATION--------- */}
          <Group>
            <SubTitle $isRequired>Duration</SubTitle>
            <Select
              label=""
              placeholder="Duration"
              size="small"
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

          {/* ----------DATE--------- */}
          <Group className="row c-gap-5">
            <Group className="level-2 mb-0">
              <SubTitle $isRequired={true}>Start date</SubTitle>
              {sprint.startDate.toString()}
              <DateInput
                label=""
                size="small"
                sx={{ height: '35px' }}
                onChange={(date: Date) => handleUpdateSprint('startDate', date)}
                value={dayjs(sprint.startDate)}
              />
            </Group>
            <Group className="level-2 mb-0">
              <SubTitle $isRequired>End date</SubTitle>
              <DateInput
                label=""
                size="small"
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

          {/* ----------GOAL--------- */}
          <Group>
            <SubTitle>Goal</SubTitle>
            <TextField
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
            Add
          </Button>
        </ActionButtonsGroup>
      </Container>
    </WindowDialog>
  )
}
