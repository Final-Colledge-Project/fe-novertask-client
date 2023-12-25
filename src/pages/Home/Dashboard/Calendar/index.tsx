import { Badge, Button, Typography } from '@mui/material'
import {
  CalendarContainer,
  Loading,
  Priority,
  TaskContainerHeader,
  TaskItem,
  TasksContainer
} from './style'
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { getTaskAssignedToMe } from '~/redux/cardSlice/actions'
import { useNavigate } from 'react-router-dom'

const Calendar = () => {
  const DATE_FORMAT = 'YYYY-MM-DD'
  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()
  const tasks = useSelector((state: StoreType) => state.card.cardsAssignedToMe)
  const [chosenDate, setChosenDate] = useState<Dayjs>(dayjs())
  useEffect(() => {
    dispatch(getTaskAssignedToMe())
  }, [])

  const formatedDate = (date: Dayjs | Date | string) => {
    return dayjs(date).format(DATE_FORMAT)
  }

  const tasksDate = tasks.map((task) => formatedDate(task.dueDate))

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { _highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected =
      !props.outsideCurrentMonth &&
      tasksDate.find((td) => td === formatedDate(day))

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '✨' : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
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
        {tasks
          .filter(
            (task) => formatedDate(task.dueDate) === formatedDate(chosenDate)
          )
          .map((task) => (
            <TaskItem
              onClick={() =>
                navigate(`/u/boards/${task.board._id}/cards/${task._id}`)
              }
              key={task._id}
            >
              <Priority className={task.priority}>{task.priority}</Priority>
              <div className="item__title">{task.title}</div>
              <div className="item__due-date">
                {task.dueDate && dayjs(task.dueDate).format('LLL')}
              </div>
              <div className="item__board-name">{task.board.title}</div>
            </TaskItem>
          ))}
      </TasksContainer>
    </CalendarContainer>
  )
}

export default Calendar
