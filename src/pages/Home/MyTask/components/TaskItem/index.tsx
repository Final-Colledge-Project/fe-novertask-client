import { Dropdown, Tag } from 'antd'
import './style.scss'
import { RiMore2Line } from 'react-icons/ri'
import type { MenuProps } from 'antd'
import { ITaskItemProps } from './ITaskItemProps'
import dayjs from 'dayjs'

const TaskItem = (props: ITaskItemProps) => {
  const { task } = props
  const handleClick = () => {
    window.open(
      `http://localhost:5173/u/boards/${task.board._id}/cards/${task._id}`,
      '_blank'
    )
  }
  const items: MenuProps['items'] = [
    {
      label: <div onClick={handleClick}>View Detail</div>,
      key: '0'
    },
    {
      label: <div>Add to Google Calendar</div>,
      key: '1'
    }
  ]
  return (
    <div className="upcomingTask-card">
      <div className="card-time">
        <span className="startDate">
          {dayjs(task?.startDate).format('hh:mm a')}
        </span>
        <span className="dueDate">
          {dayjs(task?.dueDate).format('hh:mm a')}
        </span>
      </div>
      <div className="verticalLine"></div>
      <div className="card-info">
        <div className="card-header">
          <div className="cardTitle">{task?.title}</div>
          <div className="card-header__option">
            <Tag
              className="card-priority"
              color={
                (task.priority === 'lowest' && 'default') ||
                (task.priority === 'low' && 'processing') ||
                (task.priority === 'medium' && 'success') ||
                (task.priority === 'high' && 'warning') ||
                (task.priority === 'highest' && 'error') ||
                'success'
              }
            >
              {task?.priority}
            </Tag>
            <Dropdown menu={{ items }} trigger={['click']}>
              <RiMore2Line className="moreIcon"/>
            </Dropdown>
          </div>
        </div>
        <span className="card-content">
          <b>Board:</b> {task?.board?.title}
        </span>
        <span className="card-content">
          <b>Start Date:</b> {dayjs(task?.startDate).format('MMMM D, YYYY')}
        </span>
        <span className="card-content">
          <b>Due Date:</b> {dayjs(task?.dueDate).format('MMMM D, YYYY')}
        </span>
      </div>
    </div>
  )
}
export default TaskItem
