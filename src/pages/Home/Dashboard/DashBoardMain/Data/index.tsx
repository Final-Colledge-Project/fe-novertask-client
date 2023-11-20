import WorkSpaceSummary from '../../components/WorkSpaceSummary'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import LoadingSkelelton from '~/pages/Home/components/LoadingSkeleton'
import { getAllByUserId } from '~/redux/boardSlice/actions'
import { enqueueSnackbar } from 'notistack'

const Data = () => {
  const {
    boards,
    getAllBoard: { error }
  } = useSelector((state: StoreType) => state.board)
  const dispatch = useDispatch<StoreDispatchType>()

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAllByUserId())
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error as string, { variant: 'error' })
    }
  }, [error])

  return boards ? (
    <>
      {boards?.map((workspace) => (
        <WorkSpaceSummary data={workspace} key={workspace._id} />
      ))}
    </>
  ) : (
    <LoadingSkelelton />
  )
}
export default Data
