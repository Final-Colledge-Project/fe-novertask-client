import { WorkSpaceDetailContainer } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'

import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'
import OverviewSection from './OverviewSection'
import MemberSection from './MemberSection'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { useState } from 'react'
import { deleteWorkspace } from '~/services/workspaceService'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { enqueueSnackbar } from 'notistack'

const WorkSpaceDetails = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const allBoardInfoOfCurrentUser = useSelector(
    (state: StoreType) => state.board
  )

  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()

  const togglePopup = () => {
    setShowPopup((prev) => !prev)
  }

  const onDeleteWorkspace = async () => {
    if (!id) return
    dispatch(showLoading())
    try {
      const res = await deleteWorkspace({ id })
      if (res) {
        setShowPopup(false)
        enqueueSnackbar('Delete workspace successfully', { variant: 'info' })
        navigate('/')
      }
    } catch (err) {
      enqueueSnackbar((err as Error).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const { id } = useParams()

  const joinWorkspacesName = () => {
    const { boards } = allBoardInfoOfCurrentUser
    const result = boards.map((w) => ({
      _id: w._id,
      name: w.name
    }))
    return result
  }

  return (
    <WorkSpaceDetailContainer>
      <Header
        items={[
          {
            title: 'Delete this workspace',
            onChoose: togglePopup
          }
        ]}
        title={joinWorkspacesName().find((b) => b._id === id)?.name as string}
      />
      <Routes>
        <Route index element={<OverviewSection />} />
        <Route path="members" element={<MemberSection />} />
      </Routes>

      {/* Popup confirm delete */}
      <ConfirmDialog
        onClose={togglePopup}
        open={showPopup}
        content={'Are you sure to delete this workspace?'}
        onConfirm={onDeleteWorkspace}
      />
    </WorkSpaceDetailContainer>
  )
}

export default WorkSpaceDetails
