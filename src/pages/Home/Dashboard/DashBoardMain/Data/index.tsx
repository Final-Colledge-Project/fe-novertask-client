import WorkSpaceSummary from '../../components/WorkSpaceSummary'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import LoadingSkelelton from '~/pages/Home/components/LoadingSkeleton'

const Data = () => {
  const { boards } = useSelector((state: StoreType) => state.board)

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
