import { useEffect } from 'react'
import IProps from './IProps'
import { useSelector, useDispatch } from 'react-redux'
import { StoreType, StoreDispatchType } from '~/redux'
import { BOARD_RESOURCES } from '~/utils/constant/board'
import { fetchSprints } from '~/redux/sprintSlice/actions'
import { fetchPriorities } from '~/redux/prioritySlice/actions'
import { fetchIssueTypes } from '~/redux/issueTypeSlice/actions'
import { setSprints } from '~/redux/sprintSlice'
import { setPriorities } from '~/redux/prioritySlice'
import { setIssueTypes } from '~/redux/issueTypeSlice'
const useFetchBoardData = (props: IProps) => {
  const { key, boardId } = props
  const dispatch = useDispatch<StoreDispatchType>()
  const allSprints = useSelector((state: StoreType) => state.sprint.allSprints)
  const allPriorities = useSelector(
    (state: StoreType) => state.priority.allPriorities
  )
  const allIssueTypes = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )

  const resetData = () => {
    switch (key) {
      case BOARD_RESOURCES.sprint: {
        dispatch(setSprints([]))
        break
      }
      case BOARD_RESOURCES.priority: {
        dispatch(setPriorities([]))
        break
      }
      case BOARD_RESOURCES.issueType: {
        dispatch(setIssueTypes([]))
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    switch (key) {
      case BOARD_RESOURCES.sprint: {
        if (!allSprints.length) {
          dispatch(fetchSprints(boardId))
        }
        break
      }
      case BOARD_RESOURCES.priority: {
        if (!allPriorities.length) dispatch(fetchPriorities(boardId))
        break
      }
      case BOARD_RESOURCES.issueType: {
        if (!allIssueTypes.length) dispatch(fetchIssueTypes(boardId))
        break
      }
      default:
        break
    }
    return () => {
      // cleanup
      resetData()
    }
  }, [])
}

export default useFetchBoardData
