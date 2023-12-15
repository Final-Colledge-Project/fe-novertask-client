import WorkSpaceSummary from '../../components/WorkSpaceSummary'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import LoadingSkelelton from '~/pages/Home/components/LoadingSkeleton'
import { Placeholder } from './style'

const Data = () => {
  const { boards } = useSelector((state: StoreType) => state.board)
  return boards ? (
    <>
      {boards?.map((workspace) => (
        <WorkSpaceSummary data={workspace} key={workspace._id} />
      ))}
      {boards.length === 0 && (
        <Placeholder>You don't have any workspace yet!</Placeholder>
      )}
    </>
  ) : (
    <LoadingSkelelton />
  )
}
export default Data
