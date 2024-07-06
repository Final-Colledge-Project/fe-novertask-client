import { Divider, Tabs } from 'antd'
import './style.scss'
import { StoreType } from '~/redux'
import { useSelector } from 'react-redux'
import GeneralSchedule from './GeneralSchedule'
import { EventItem } from '~/services/types'

interface ISchedulePanelProps {
  date: Date
  setDate: (event: Date) => void
}

const SchedulePanel = ({ date, setDate }: ISchedulePanelProps) => {
  const { cardsAssignedToMe, getCardAssignedToMe } = useSelector(
    (state: StoreType) => state.card
  )
  const items = [
    {
      key: 'general',
      label: 'General',
      children: <GeneralSchedule date={date} setDate={setDate} />
    },
    {
      key: 'upcomingEvent',
      label: 'Upcoming Events',
      children: 'Content of Tab Pane 2'
    }
  ]

  const onChange = (key: string) => {
    // console.log(key)
  }

  return (
    <div className="schedule__right">
      <Tabs defaultActiveKey="general" items={items} onChange={onChange} />
    </div>
  )
}

export default SchedulePanel
