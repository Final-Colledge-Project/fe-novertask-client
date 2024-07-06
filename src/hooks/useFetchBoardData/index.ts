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
import { fetchColumns } from '~/redux/columnSlice/actions'
import { setColumns } from '~/redux/columnSlice'
const useFetchBoardData = (props: IProps) => {
  const { key, boardId } = props
  const dispatch: StoreDispatchType = useDispatch<StoreDispatchType>()
  const allSprints = useSelector((state: StoreType) => state.sprint.allSprints)
  const allPriorities = useSelector(
    (state: StoreType) => state.priority.allPriorities
  )
  const allIssueTypes = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )
  const allColumns = useSelector((state: StoreType) => state.column.allColumns)

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
      case BOARD_RESOURCES.column: {
        dispatch(setColumns([]))
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
      case BOARD_RESOURCES.column: {
        if (!allColumns.length) {
          console.log('======> fetchColumns ')
          dispatch(fetchColumns(boardId))
        }
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
