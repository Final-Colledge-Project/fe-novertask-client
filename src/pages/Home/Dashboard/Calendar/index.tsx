import { Badge, Button, Typography } from '@mui/material'
import {
  CalendarContainer,
  Priority,
  RedFlag,
  TaskContainerHeader,
  TaskItem,
  TaskOfDatePlaceholder,
  TasksContainer
} from './style'
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { getTaskAssignedToMe } from '~/redux/cardSlice/actions'
import { useNavigate } from 'react-router-dom'
import CheckListSVG from '~/assets/calendar_placeholder.svg'

const Calendar = () => {
  const DATE_FORMAT = 'YYYY-MM-DD'
  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()
  const tasks = useSelector((state: StoreType) => state.card.cardsAssignedToMe)
  const [chosenDate, setChosenDate] = useState<Dayjs>(dayjs())
  useEffect(() => {
    dispatch(getTaskAssignedToMe())
  }, [])

  const formattedDate = (date: Dayjs | Date | string) => {
    return dayjs(date).format(DATE_FORMAT)
  }

  const tasksDate = tasks.map((task) => formattedDate(task.dueDate))

  const taskOfChoosenDate = () => {
    return tasks.filter(
      (task) => formattedDate(task.dueDate) === formattedDate(chosenDate)
    )
  }

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected =
      !props.outsideCurrentMonth &&
      tasksDate.find((td) => td === formattedDate(day))

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <RedFlag /> : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{
            '&.MuiPickersDay-root': {
              padding: '0'
              // height: '20px',
              // width: '20px'
            }
          }}
        />
      </Badge>
    )
  }

  return (
    <CalendarContainer>
      <Typography fontWeight={700} padding={'10px 20px 0'}>
        Calendar
      </Typography>
      <DateCalendar
        value={chosenDate}
        onChange={(newValue) => setChosenDate(newValue as Dayjs)}
        sx={{
          paddingRight: '20px'
        }}
        disableHighlightToday
        slots={{
          day: ServerDay
        }}
      />
      <TasksContainer>
        <TaskContainerHeader>
          <Typography fontWeight={700}>
            Tasks
            <span className="title__date">
              {dayjs(chosenDate).format('YYYY/MM/DD')}
            </span>
            {/* <Loading /> */}
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={() => setChosenDate(dayjs())}
          >
            Today
          </Button>
        </TaskContainerHeader>
        {taskOfChoosenDate().length > 0 &&
          taskOfChoosenDate().map((task) => (
            <TaskItem
              onClick={() =>
                navigate(`/u/boards/${task.board._id}/cards/${task._id}`)
              }
              key={task._id}
              className={task.priority}
            >
              <Priority className={task.priority}>{task.priority}</Priority>
              <div className="item__title">{task.title}</div>
              <div className="item__due-date">
                {task.dueDate && dayjs(task.dueDate).format('LLL')}
              </div>
              <div className="item__board-name">Board: {task.board.title}</div>
            </TaskItem>
          ))}
        {taskOfChoosenDate().length <= 0 && (
          <TaskOfDatePlaceholder>
            <img src={CheckListSVG} alt="Checklist image" />
            <Typography
              fontSize={16}
              color={(theme) => theme.palette.gray.main}
            >
              No tasks for this day
            </Typography>
          </TaskOfDatePlaceholder>
        )}
      </TasksContainer>
    </CalendarContainer>
  )
}

export default Calendar
