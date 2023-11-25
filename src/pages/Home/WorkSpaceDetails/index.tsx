import { WorkSpaceDetailContainer } from './style'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

import { Route, Routes, useParams } from 'react-router-dom'

import Header from './Header'
import OverviewSection from './OverviewSection'
import MemberSection from './MemberSection'

const WorkSpaceDetails = () => {
  const allBoardInfoOfCurrentUser = useSelector(
    (state: StoreType) => state.board
  )

  const { id } = useParams()

  const joinWorkspacesName = () => {
    const {
      boards: { workspaceHasBoards, workspaceWithNoBoard }
    } = allBoardInfoOfCurrentUser
    const result = workspaceHasBoards.map((w) => ({
      _id: w._id,
      name: w.name
    }))
    result.push(
      ...workspaceWithNoBoard.map((w) => ({ _id: w._id, name: w.name }))
    )
    return result
  }

  return (
    <WorkSpaceDetailContainer>
      <Header
        title={joinWorkspacesName().find((b) => b._id === id)?.name as string}
      />
      <Routes>
        <Route index element={<OverviewSection />} />
        <Route path="members" element={<MemberSection />} />
      </Routes>
    </WorkSpaceDetailContainer>
  )
}

export default WorkSpaceDetails
