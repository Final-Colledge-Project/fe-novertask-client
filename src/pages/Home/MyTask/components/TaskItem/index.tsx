import { Button, Dropdown, Tag, Menu } from 'antd'
import './style.scss'
import { RiMore2Line } from 'react-icons/ri'
import type { MenuProps } from 'antd'
import { ITaskItemProps } from './ITaskItemProps'
import dayjs from 'dayjs'
import AddToCalendar from 'react-add-to-calendar'
const TaskItem = (props: ITaskItemProps) => {
  const { task } = props
  // const handleClick = () => {
  //   window.open(
  //     `http://localhost:5173/u/boards/${task.board._id}/cards/${task._id}`,
  //     '_blank'
  //   )
  // }

  // const items: MenuProps['items'] = [
  //   {
  //     label: <div>View Detail</div>,
  //     key: '0'
  //   },
  //   {
  //     label: <div>Add to Calendar</div>,
  //     key: '1'
  //   }
  // ]

  // const event = {
  //   description:
  //     'Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.',
  //   duration: { hours: 1, minutes: 30 },
  //   endDatetime: dayjs(task?.dueDate).format('YYYYMMDDTHHmmssZ'),
  //   location: 'NYC',
  //   startDatetime: dayjs(task?.startDate).format('YYYYMMDDTHHmmssZ'),
  //   title: 'Super Fun Event'
  // }

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
          </div>
        </div>
        <div className="card-body">
          <div className="card-content">
            <div>
              <b>Board:</b> {task?.board?.title}
            </div>
            <div>
              <b>Start Date:</b> {dayjs(task?.startDate).format('MMMM D, YYYY')}
            </div>
            <div>
              <b>Due Date:</b> {dayjs(task?.dueDate).format('MMMM D, YYYY')}
            </div>
          </div>
          <div className="card-addCalendar">
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default TaskItem
