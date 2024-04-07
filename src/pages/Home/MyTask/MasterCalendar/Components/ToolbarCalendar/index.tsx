import IconButton from '@mui/material/IconButton'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'
import './style.scss'
import { Button, Dropdown, Space } from 'antd'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiCalendarLine } from 'react-icons/ri'
const ToolbarCalendar = () => {
  const items = [
    {
      key: '1',
      label: <span>Day</span>
    },
    {
      key: '2',
      label: <span>Week</span>
    },
    {
      key: '3',
      label: <span>Month</span>
    }
  ]
  return (
    <div className="toolbarCalendar">
      <div className="toolbarCalendar__left">
        <div className="toolbar__changeDate">
          <IconButton aria-label="previous" size="small">
            <RiArrowLeftSLine />
          </IconButton>
          <span className="currentDate">April 7</span>
          <IconButton aria-label="next" size="small">
            <RiArrowRightSLine />
          </IconButton>
        </div>
        <div className="toolbar__views">
          <Dropdown
            menu={{ items, selectable: true }}
            placement="bottom"
            trigger={['click']}
          >
            <Button className="changeDate_btn">
              <Space>
                <RiCalendarLine />
                Day
                <RiArrowDownSLine style={{ fontSize: '16px' }} />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <Button className="toolbar_today">Today</Button>
      </div>
      <div className="toolbarCalendar__right">
        <button className="toolbarCalendar__button">Add Event</button>
      </div>
    </div>
  )
}

export default ToolbarCalendar
