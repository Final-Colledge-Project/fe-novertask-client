import './style.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY, TYPE_EVENT } from '~/utils/constant'
import { cardAssignToMe } from '~/services/cardService'
import { EventItem } from '~/services/types'
import AssignedTaskEvent from './Components/AssignedTaskEvent'
import { useState, useEffect } from 'react'
import { convertGoogleEvent, convertTaskEvent } from './helper'
import ToolbarCalendar from './Components/ToolbarCalendar'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { uniqBy } from 'lodash'
import GoogleEvent from './Components/GoogleEvent'
const localizer = dayjsLocalizer(dayjs)
// const DnDCalendar = withDragAndDrop(Calendar)

type Keys = keyof typeof Views

interface IMasterCalendarProps {
  date: Date
  setDate: (date: Date) => void
}

const MasterCalendar = ({ date, setDate }: IMasterCalendarProps) => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.MONTH)
  const { googleEvents } = useSelector((state: StoreType) => state.schedule)
  const [assignedEvent, setAssignedEvent] = useState<EventItem[]>([])
  const [googleEvent, setGoogleEvent] = useState<EventItem[]>([])
  const components = {
    event: ({ event }) => {
      if (event && event.type === TYPE_EVENT.assignedTask) {
        return <AssignedTaskEvent event={event} />
      }
      if (event && event.type === TYPE_EVENT.googleEvent) {
        return <GoogleEvent event={event} />
      }
    }
  }

  const { data: assignedTask } = useQuery({
    queryKey: [QUERY_KEY.assigned_task],
    queryFn: () => {
      return cardAssignToMe()
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (assignedTask) {
      const newEvents = assignedTask?.data.map((task) => convertTaskEvent(task))
      setAssignedEvent((prev) => uniqBy([...prev, ...newEvents], 'id'))
    }
  }, [assignedTask])

  useEffect(() => {
    if (googleEvents) {
      const googleTask = googleEvents.map((event) => convertGoogleEvent(event))
      setGoogleEvent(googleTask)
    }
  }, [googleEvents])

  useEffect(() => {
    const newEvents = [...assignedEvent, ...googleEvent]
    setEvents(newEvents)
  }, [assignedEvent, googleEvent, view])

  return (
    <div className="myTask-calendar">
      <ToolbarCalendar
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
      />
      <Calendar
        defaultView="week"
        events={events}
        localizer={localizer}
        style={{ height: '80vh', marginTop: '10px' }}
        components={components}
        toolbar={false}
        view={view}
        onView={setView}
        date={date}
        popup
      />
    </div>
  )
}

export default MasterCalendar
