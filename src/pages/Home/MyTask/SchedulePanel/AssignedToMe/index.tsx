import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { cardAssignToMe } from '~/services/cardService'
import { QUERY_KEY } from '~/utils/constant'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
export default function AssignedTasks() {
  const { data: assignedTask, isLoading } = useQuery({
    queryKey: [QUERY_KEY.assigned_task],
    queryFn: () => {
      return cardAssignToMe()
    },
    refetchOnWindowFocus: false
  })
  const navigate = useNavigate()
  return (
    <div className="taskEvents">
      {isLoading && <div>Loading...</div>}
      {assignedTask &&
        assignedTask.data.map((task) => (
          <div
            key={task._id}
            className="taskWrapper"
            onClick={() =>
              navigate(`/u/boards/${task.board._id}/cards/${task._id}`)
            }>
            <div className="boardInfo">
              <div>
                <b>
                  {task.board.key}-{task.cardId}
                </b>
              </div>
              <div>Project: {task.board.title}</div>
            </div>
            <div className="taskHeader">
              <img src={task.issueType.icon} width={15} height={15} />
              <div className="taskTitle">{task.title}</div>
            </div>
            <div className="taskFooter">
              <div>Status: {task.column.title}</div>
              <div>
                {task.startDate && task.dueDate
                  ? `${dayjs(task.startDate).format('YYYY.MM.DD')} - ${dayjs(
                      task.dueDate
                    ).format('YYYY.MM.DD')}`
                  : task.startDate
                  ? dayjs(task.startDate).format('YYYY.MM.DD')
                  : task.dueDate
                  ? dayjs(task.dueDate).format('YYYY.MM.DD')
                  : ''}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
