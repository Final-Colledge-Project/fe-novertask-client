import { Tag } from 'antd'
import { ITaskPopoverProps } from './ITaskPopoverProps'
import { Button } from '@mui/material'
import './style.scss'
const taskPopOver = (props: ITaskPopoverProps) => {
  const { task, controlHide } = props
  const handleClick = () => {
    window.open(
      `http://localhost:5173/u/boards/${task.board._id}/cards/${task._id}`,
      '_blank'
    )
    controlHide()
  }
  return (
    <div className="taskPop-container">
      <div className="taskPop-info">
        <b>Task:</b> {task.title}
      </div>
      <div className="taskPop-info">
        <b>Board:</b> {task.board.title}
      </div>
      <div className="taskPop-info">
        <b>Priority:</b>{' '}
        <Tag
          color={
            (task.priority === 'lowest' && 'default') ||
            (task.priority === 'low' && 'processing') ||
            (task.priority === 'medium' && 'success') ||
            (task.priority === 'high' && 'warning') ||
            (task.priority === 'highest' && 'error') ||
            'default'
          }
        >
          {task.priority}
        </Tag>
      </div>
      <div className="taskPop-button" onClick={handleClick}>
        Detail
      </div>
    </div>
  )
}

export default taskPopOver
