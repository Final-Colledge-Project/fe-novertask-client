import IconButton from '@mui/material/IconButton'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'
import './style.scss'
import { Dropdown, Space } from 'antd'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiCalendarLine } from 'react-icons/ri'
import { RiAddCircleLine } from 'react-icons/ri'
import { RiVideoAddLine } from 'react-icons/ri'
import type { MenuProps } from 'antd'
import { capitalize } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Views } from 'react-big-calendar'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import { MenuItem, Select } from '@mui/material'
interface ToolbarCalendarProps {
  setView: (view: 'day' | 'week' | 'month' | 'work_week' | 'agenda') => void
  view: 'day' | 'week' | 'month' | 'work_week' | 'agenda'
  date: Date
  setDate: (date: Date) => void
}

const ToolbarCalendar = ({
  view,
  setView,
  date,
  setDate
}: ToolbarCalendarProps) => {
  const items = [
    {
      key: 'day',
      label: <span>Day</span>
    },
    {
      key: 'week',
      label: <span>Week</span>
    },
    {
      key: 'month',
      label: <span>Month</span>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setView(key as 'day' | 'week' | 'month' | 'work_week' | 'agenda')
  }

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) setDate(dayjs(date).add(1, 'day').toDate())
    if (view === Views.WEEK) setDate(dayjs(date).add(1, 'week').toDate())
    if (view === Views.MONTH) setDate(dayjs(date).add(1, 'month').toDate())
  }, [view, date])

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) setDate(dayjs(date).subtract(1, 'day').toDate())
    if (view === Views.WEEK) setDate(dayjs(date).subtract(1, 'week').toDate())
    if (view === Views.MONTH) setDate(dayjs(date).subtract(1, 'month').toDate())
  }, [view, date])

  const dateText = useMemo(() => {
    if (view === Views.DAY) return dayjs(date).format('MMMM DD')
    if (view === Views.WEEK)
      return (
        dayjs(date).format('MMM DD') +
        ' - ' +
        dayjs(date).add(6, 'day').format('MMM DD')
      )
    if (view === Views.MONTH) return dayjs(date).format('MMMM YYYY')
  }, [view, date])

  return (
    <div className="toolbarCalendar">
      <div className="toolbarCalendar__left">
        <div className="toolbar__views">
          <Select
            value={view}
            onChange={(e) => {
              setView(
                e.target.value as
                  | 'day'
                  | 'week'
                  | 'month'
                  | 'work_week'
                  | 'agenda'
              )
            }}
            size="small">
            {items.map((item, index) => (
              <MenuItem key={index} value={item.key}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          variant="outlined"
          className="toolbar_today"
          onClick={() => {
            setDate(dayjs().toDate())
          }}>
          Today
        </Button>
      </div>
      <div className="toolbarCalendar__center">
        <div className="toolbar__changeDate">
          <IconButton aria-label="previous" size="small" onClick={onPrevClick}>
            <RiArrowLeftSLine />
          </IconButton>
          <span className="currentDate">{dateText}</span>
          <IconButton aria-label="next" size="small" onClick={onNextClick}>
            <RiArrowRightSLine />
          </IconButton>
        </div>
      </div>
      <div className="toolbarCalendar__right">
        <Button
          variant="outlined"
          startIcon={<RiVideoAddLine style={{ fontSize: '16px' }} />}>
          <span>New Meeting</span>
        </Button>
        <Button
          variant="contained"
          startIcon={<RiAddCircleLine className="toolbar-icon" />}>
          Add event
        </Button>
      </div>
    </div>
  )
}

export default ToolbarCalendar
