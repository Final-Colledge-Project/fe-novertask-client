import './style.scss'
import { RiCalendarEventLine } from 'react-icons/ri'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dayjsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop, {
  withDragAndDropProps
} from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useQuery } from '@tanstack/react-query'
import { DATE_FORMAT, QUERY_KEY } from '~/utils/constant'
import { cardAssignToMe } from '~/services/cardService'
import { EventItem } from '~/services/types'
import AssignedTaskEvent from './Components/AssignedTaskEvent'
import { useState, useEffect } from 'react'
import { convertTaskEvent } from './helper'
import { getGoogleCalendar } from '~/services/scheduleService'
import ToolbarCalendar from './Components/ToolbarCalendar'
// import Calendar from './Components/Calendar'
const localizer = dayjsLocalizer(dayjs)
const DnDCalendar = withDragAndDrop(Calendar)

const MasterCalendar = () => {
  const [events, setEvents] = useState<EventItem[]>([])

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
      const data = event?.data
      console.log('~~~~~~~~~>testEvent', event)
      if (data?.assignedTask) {
        console.log('~~~~~~~>data?.assignedTask', data?.assignedTask)
        return <AssignedTaskEvent event={data?.assignedTask} />
      }

      return null
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
      console.log('~~~~~~~>newEvents', newEvents)
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

  const { data: googleCalendar } = useQuery({
    queryKey: [QUERY_KEY.google_calendar],
    queryFn: () => {
      return getGoogleCalendar()
    },
    refetchOnWindowFocus: false
  })

  console.log('~~~~~~~~~~~>googleCalendar', googleCalendar)

  return (
    <div className="myTask-calendar">
      <ToolbarCalendar />
      <DnDCalendar
        defaultView="week"
        events={events}
        localizer={localizer}
        // onEventDrop={onEventDrop}
        // onEventResize={onEventResize}
        resizable
        style={{ height: '100vh', marginTop: '10px' }}
        components={components}
        toolbar={false}
        // startAccessor={(event: object) => (event as Event).start as Date}
        // endAccessor={(event: object) => (event as Event).end as Date}
      />
      {/* <Calendar events={events} style={{ height: '100vh' }} /> */}
    </div>
  )
}

export default MasterCalendar
