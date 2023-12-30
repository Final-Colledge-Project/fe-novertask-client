import dayjs, { Dayjs } from 'dayjs'
import './style.scss'
import type { CalendarProps } from 'antd'
import { Calendar, Popover } from 'antd'
import { useSelector } from 'react-redux'
import {  StoreType } from '~/redux'
import { useEffect, useState } from 'react'
import { IAssignedCard } from '~/services/types'
import TaskPopover from '../components/TaskPopover'
import { RiCalendarEventLine } from 'react-icons/ri'
const MasterCalendar = () => {
  const { cardsAssignedToMe } = useSelector((state: StoreType) => state.card)
  const [assignedTask, setAssignedTask] =
    useState<IAssignedCard[]>(cardsAssignedToMe)
  const [clicked, setClicked] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  useEffect(() => {
    setAssignedTask(cardsAssignedToMe)
  }, [cardsAssignedToMe])

  const assignedArray = assignedTask
    .filter((item) => item.dueDate !== null)
    .map((card) => {
      return {
        id: dayjs(card.dueDate).format('YYYY-MM-DD'),
        value: card
      }
    })
  const dueDateTasks = Object.assign(
    {},
    ...assignedArray.map((item) => ({ [item.id]: item.value }))
  )
  const hide = () => {
    setClicked(false)
  }

  const dateCellRender = (value: dayjs.Dayjs): React.ReactNode => {
    const dateString = value.format('YYYY-MM-DD')
    const cellData = dueDateTasks[dateString]
    const handleClickChange = (open: boolean) => {
      setClicked(open)
    }
    return (
      <div>
        {cellData ? (
          <div className="event-personal">
            <div className="event-dot"></div>
            <div className="event-content">
              <Popover
                content={<TaskPopover task={cellData} controlHide={hide} />}
                title={dayjs(cellData.dueDate).format('LLL')}
                trigger="click"
                open={
                  dayjs(cellData.dueDate).format('YYYY-MM-DD').toString() ===
                  dayjs(selectedDate?.toString())
                    .format('YYYY-MM-DD')
                    .toString()
                }
                onOpenChange={handleClickChange}
              >
                <span style={{ display: 'block', height: '100%' }}>
                  {cellData.title}
                </span>
              </Popover>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date)
    console.log('Selected Date:', date.format('YYYY-MM-DD'))
  }
  return (
    <div className="myTask-calendar">
      <div className="myTask-masterCalendar">
        <RiCalendarEventLine className="myTask-masterCalendar__icon" />
        <span className='"myTask-masterCalendar__title'>Master Calendar</span>
      </div>
      <Calendar
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
        onSelect={handleDateSelect}
      />
    </div>
  )
}

export default MasterCalendar
