import WorkSpaceSummary from '../../components/WorkSpaceSummary'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { getFakeData } from '~/services/workspaceService'
import { IWSSummary } from '~/services/types'
import LoadingSkelelton from '~/pages/Home/components/LoadingSkeleton'

const Data = () => {
  const { currentTeamWS } = useSelector(
    (state: StoreType) => state.teamWorkspace
  )

  const [workspaceDatas, setWorkspaceDatas] = useState<
    IWSSummary[] | undefined
  >(undefined)

  useEffect(() => {
    const getData = async () => {
      // dispatch(showLoading())
      try {
        const res = await getFakeData()
        if (res) {
          setWorkspaceDatas(res as IWSSummary[])
        }
      } catch (err) {
        console.log(err)
      } finally {
        // dispatch(hideLoading())
      }
    }
    getData()
  }, [])

  return workspaceDatas ? (
    <>
      {workspaceDatas.map((workspace) => (
        <WorkSpaceSummary data={workspace} key={workspace.id} />
      ))}
      {currentTeamWS &&
        currentTeamWS.map((workspace) => (
          <WorkSpaceSummary
            key={workspace.id}
            data={{
              title: workspace.name,
              projects: [],
              id: workspace.id
            }}
          />
        ))}
    </>
  ) : (
    <LoadingSkelelton />
  )
}
export default Data
