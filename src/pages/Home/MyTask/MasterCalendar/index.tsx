import './style.scss'
import { RiCalendarEventLine } from 'react-icons/ri'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dayjsLocalizer, Event, Views } from 'react-big-calendar'
import withDragAndDrop, {
  withDragAndDropProps
} from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery } from '@tanstack/react-query'
import { DATE_FORMAT, OPTION_VIEWS, QUERY_KEY } from '~/utils/constant'
import { cardAssignToMe } from '~/services/cardService'
import { EventItem, ITaskEvent } from '~/services/types'
import AssignedTaskEvent from './Components/AssignedTaskEvent'
import { useState, useEffect } from 'react'
import { convertTaskEvent } from './helper'
import { getGoogleCalendar } from '~/services/scheduleService'
import ToolbarCalendar from './Components/ToolbarCalendar'
const localizer = dayjsLocalizer(dayjs)
const DnDCalendar = withDragAndDrop(Calendar)

type Keys = keyof typeof Views

interface IMasterCalendarProps {
  date: Date
  setDate: (date: Date) => void
}

const MasterCalendar = ({ date, setDate }: IMasterCalendarProps) => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.MONTH)
  const [contextMenuInfo, setContextMenuInfo] = useState<{
    xPosition: number
    yPosition: number
    selectedTime: string
    resourceId: number
  }>()
  // const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
  //   const { start, end } = data

  //   setEvents((currentEvents) => {
  //     const firstEvent = {
  //       start: new Date(start),
  //       end: new Date(end)
  //     }
  //     return [...currentEvents, firstEvent]
  //   })
  // }

  // const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
  //   console.log(data)
  // }

  const components = {
    event: ({ event }) => {
      if (event) {
        return <AssignedTaskEvent event={event} />
      }
      // return null
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
      console.log('🚀 ~ useEffect ~ newEvents:', newEvents)
      setEvents(newEvents)
    }
  }, [assignedTask])

  useEffect(() => {
    console.log('==========>events', events)
  }, [events])

  // const events = [
  //   {
  //     start: dayjs('2024-04-01T10:00:00').toDate(),
  //     end: dayjs('2024-04-01T11:00:00').toDate(),
  //     title: 'MRI Registration'
  //   }
  // ]

  // const { data: googleCalendar } = useQuery({
  //   queryKey: [QUERY_KEY.google_calendar],
  //   queryFn: () => {
  //     return getGoogleCalendar()
  //   },
  //   refetchOnWindowFocus: false
  // })

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
        // onEventDrop={onEventDrop}
        // onEventResize={onEventResize}
        // resizable
        style={{ height: '80vh', marginTop: '10px' }}
        components={components}
        toolbar={false}
        view={view}
        onView={setView}
        date={date}
        popup
        // startAccessor={(event: object) => (event as Event).start as Date}
        // endAccessor={(event: object) => (event as Event).end as Date}
      />
      {/* <Calendar events={events} style={{ height: '100vh' }} /> */}
    </div>
  )
}

export default MasterCalendar
