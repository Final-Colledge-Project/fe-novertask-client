import { ITaskEvent } from '~/services/types'

const AssignedTaskEvent = ({ event }: { event: ITaskEvent }) => {
  return (
    <div className="assignTaskEvent">
      <div>{event?.title}</div>
    </div>
  )
}

export default AssignedTaskEvent
