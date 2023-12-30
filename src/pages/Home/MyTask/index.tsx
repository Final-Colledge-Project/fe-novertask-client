import { useEffect, useState } from 'react'
import MasterCalendar from './MasterCalendar'
import UpcomingTask from './UpcomingTask'
import './style.scss'
import { getTaskAssignedToMe } from '~/redux/cardSlice/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { IAssignedCard } from '~/services/types'
const MyTask = () => {
  const dispatch = useDispatch<StoreDispatchType>()
  useEffect(() => {
    const fetchAssignedTask = async () => {
      await dispatch(getTaskAssignedToMe())
    }
    fetchAssignedTask()
  }, [dispatch])
  return (
    <div className="myTask-container">
      <header className="myTask-header">My task</header>
      <div className="myTask-body">
        <div className="myTask-left">
          <MasterCalendar />
        </div>
        <div className="myTask-right">
          <UpcomingTask />
        </div>
      </div>
    </div>
  )
}

export default MyTask
