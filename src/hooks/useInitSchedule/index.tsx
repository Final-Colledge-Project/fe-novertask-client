import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { addSchedule } from '~/redux/scheduleSlice/actions'
import { TYPE_EVENT } from '~/utils/constant'

// const useInitSchedule = () => {
//   const dispatch = useDispatch<StoreDispatchType>()
//   const { schedules, isFetching } = useSelector(
//     (state: StoreType) => state.schedule
//   )

//   useEffect(() => {
//     if (!isFetching) return
//     // const hasAssignedSchedule = (schedules || []).some(
//     //   (schedule) => schedule.type === TYPE_EVENT.assignedTask
//     // )
//     // if (!hasAssignedSchedule) {
//     //   dispatch(
//     //     addSchedule({
//     //       name: 'Assigned Task',
//     //       type: TYPE_EVENT.assignedTask
//     //     })
//     //   )
//     // }
//   }, [isFetching, schedules])
// }

export default useInitSchedule
