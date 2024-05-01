import dayjs from 'dayjs'
import { EventItem, IAssignedCard, IGoogleEvent } from '~/services/types'
import { TYPE_EVENT } from '~/utils/constant'
export const convertTaskEvent = (task: IAssignedCard): EventItem => {
  return {
    id: task._id,
    start: dayjs(task.startDate || '').toDate(),
    end: task.dueDate
      ? dayjs(task.dueDate).toDate()
      : dayjs(task.startDate).add(1, 'second').toDate(),
    data: {
      assignedTask: {
        id: task._id,
        title: task.title
      }
    },
    type: TYPE_EVENT.assignedTask
  }
}

export const convertGoogleEvent = (event: IGoogleEvent): EventItem => {
  return {
    id: event.id,
    start: event.start,
    end: event.end,
    data: {
      googleEvent: event
    },
    type: TYPE_EVENT.googleEvent
  }
}
