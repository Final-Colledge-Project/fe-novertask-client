import React, { useEffect, useState } from 'react'
import { RiTaskLine } from 'react-icons/ri'
import { Empty, Segmented, Spin } from 'antd'
import './style.scss'
import TaskItem from '../components/TaskItem'
import { StoreType } from '~/redux'
import { useSelector } from 'react-redux'
import { IAssignedCard } from '~/services/types'
import { isDateInCountNextDays } from '~/utils/helper'
const UpcomingTask = () => {
  const [value, setValue] = useState<string | number>('today')
  const { cardsAssignedToMe, getCardAssignedToMe } = useSelector(
    (state: StoreType) => state.card
  )
  const [listCards, setListCards] = useState<IAssignedCard[]>([])
  const segmentOptions = [
    {
      label: (
        <div style={{ padding: 4 }}>
          <div>Today</div>
        </div>
      ),
      value: 'today'
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <div>Tomorrow</div>
        </div>
      ),
      value: 'tomorrow'
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <div>7 days after</div>
        </div>
      ),
      value: 'inWeek'
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <div>30 days after</div>
        </div>
      ),
      value: 'inMonth'
    }
  ]
  const handleChangeOption = (value: string | number) => {
    setValue(value)
  }
  useEffect(() => {
    const listCardToday = cardsAssignedToMe.filter((item) => {
      return (
        item.dueDate !== null &&
        new Date(item.dueDate).getDate() === new Date().getDate()
      )
    })
    setListCards(listCardToday)
  }, [cardsAssignedToMe])
  useEffect(() => {
    if (value === 'today') {
      const listCardToday = cardsAssignedToMe.filter((item) => {
        return (
          item.dueDate !== null &&
          new Date(item.dueDate).getDate() === new Date().getDate()
        )
      })
      setListCards(listCardToday)
    } else if (value === 'tomorrow') {
      const listCardTomorrow = cardsAssignedToMe.filter((item) => {
        return (
          item.dueDate !== null &&
          isDateInCountNextDays(new Date(item.dueDate).toDateString(), 1)
        )
      })
      setListCards(listCardTomorrow)
    } else if (value === 'inWeek') {
      const listCardInWeek = cardsAssignedToMe.filter((item) => {
        return (
          item.dueDate !== null &&
          isDateInCountNextDays(new Date(item.dueDate).toDateString(), 7)
        )
      })
      setListCards(listCardInWeek)
    } else if (value === 'inMonth') {
      const listCardInMonth = cardsAssignedToMe.filter((item) => {
        const date = new Date(item.dueDate)
        return (
          item.dueDate !== null &&
          isDateInCountNextDays(date.toDateString(), 30)
        )
      })
      setListCards(listCardInMonth)
    }
  }, [value])
  return (
    <div className="upcomingTask">
      <div className="upcomingTask-header">
        <RiTaskLine className="upcomingTask-header__icon" />
        <span>My tasks</span>
      </div>
      <div className="upcomingTask-body">
        <Segmented
          options={segmentOptions}
          value={value}
          onChange={handleChangeOption}
        />
        <div className="upcomingTask-listCards">
          {getCardAssignedToMe.loading ? (
            <Spin tip="Loading">
              <div className="assigned-loading" />
            </Spin>
          ) : listCards.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            listCards.map(item => <TaskItem task={item}/>)
          )}
        </div>
      </div>
    </div>
  )
}

export default UpcomingTask
