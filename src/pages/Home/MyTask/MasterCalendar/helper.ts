import dayjs from 'dayjs'
import { EventItem, IAssignedCard } from '~/services/types'
export const convertTaskEvent = (task: IAssignedCard): EventItem => {
  return {
    start: dayjs(task.startDate || '').toDate(),
    end: task.dueDate
      ? dayjs(task.dueDate).toDate()
      : dayjs(task.startDate).add(1, 'second').toDate(),
    data: {
      assignedTask: {
        id: task._id,
        title: task.title
      }
    }

    // isDraggable: true
  }
}
