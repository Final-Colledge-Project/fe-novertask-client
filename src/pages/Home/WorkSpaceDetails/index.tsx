import { WorkSpaceDetailContainer } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'

import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'
import OverviewSection from './OverviewSection'
import MemberSection from './MemberSection'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { useCallback, useEffect, useState } from 'react'
import { deleteWorkspace } from '~/services/workspaceService'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { enqueueSnackbar } from 'notistack'
import {
  getUserPermissionOnWS,
  getWSPermission
} from '~/redux/permissionSlice/actions'
import {
  resetCurrentWSPermission,
  resetCurrentWSPermissionState,
  resetUserPermissionOnWS
} from '~/redux/permissionSlice'
import { AxiosError } from 'axios'
import { getAllMembers } from '~/redux/teamWSSlice/actions'
import { resetGetAllMember } from '~/redux/teamWSSlice'
import useWSPermission from '~/hooks/useWSPermission'

const WorkSpaceDetails = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const allBoardInfoOfCurrentUser = useSelector(
    (state: StoreType) => state.board
  )

  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()
  const { id } = useParams()
  const permissionStore = useSelector((state: StoreType) => state.permission)
  const { getAllMember } = useSelector(
    (state: StoreType) => state.teamWorkspace
  )
  const togglePopup = () => {
    setShowPopup((prev) => !prev)
  }
  const userPermissionOnWS = useWSPermission()
  const userInfo = useSelector((state: StoreType) => state.auth.userInfo)
  const wsMember = useSelector(
    (state: StoreType) => state.teamWorkspace.currTeamMembers
  )
  const isWSMember = useCallback(() => {
    if (!userInfo?._id || !wsMember) return false
    return (
      wsMember.workspaceAdmins.find(
        (user) => user.user?._id === userInfo?._id
      ) ||
      wsMember.workspaceMembers.find((user) => user.user?._id === userInfo?._id)
    )
  }, [userInfo?._id, wsMember])

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

  const joinWorkspacesName = () => {
    const { boards } = allBoardInfoOfCurrentUser
    const result = boards.map((w) => ({
      _id: w._id,
      name: w.name
    }))
    return result
  }

  const getAllPermission = async () => {
    if (!id) return
    try {
      // dispatch(showLoading())
      await dispatch(getWSPermission(id as string))
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    } finally {
      // dispatch(hideLoading())
    }
  }

  const getUserPermission = async () => {
    try {
      // dispatch(showLoading())
      await dispatch(getUserPermissionOnWS(id as string))
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    } finally {
      // dispatch(hideLoading())
    }
  }

  const initData = async () => {
    if (wsMember && isWSMember()) {
      await getUserPermission()
    }
    await getAllPermission()
  }

  const getWSMembers = async () => {
    try {
      dispatch(showLoading())
      await dispatch(getAllMembers({ id: id as string }))
      await initData()
    } catch (err) {
      const message = (err as Error).message
      enqueueSnackbar(message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  // show error message when get all ws permission failed
  useEffect(() => {
    if (permissionStore.getWSPermissionStatus === 'error') {
      enqueueSnackbar(
        `Get permission error: ${permissionStore.getWSPermissionErrMessage}`,
        { variant: 'error' }
      )
      dispatch(resetCurrentWSPermissionState())
    }
  }, [
    permissionStore.getWSPermissionStatus,
    permissionStore.getWSPermissionErrMessage
  ])

  // show error message when get user ws permission failed
  useEffect(() => {
    if (permissionStore.getUserPermissionOnWSStatus === 'error') {
      enqueueSnackbar(
        `Get permission error: ${permissionStore.getUserPermissionOnWSErrMsg}`,
        { variant: 'error' }
      )
      dispatch(resetUserPermissionOnWS())
    }
  }, [
    permissionStore.getUserPermissionOnWSStatus,
    permissionStore.getUserPermissionOnWSErrMsg
  ])

  useEffect(() => {
    initData()
  }, [wsMember])

  useEffect(() => {
    // reset current ws permission when out of this page
    return () => {
      dispatch(resetCurrentWSPermission())
      dispatch(resetUserPermissionOnWS())
    }
  }, [])

  useEffect(() => {
    getWSMembers()

    // reset all member when out of this page
    return () => {
      dispatch(resetGetAllMember())
    }
  }, [id])

  // just catch the error
  useEffect(() => {
    if (getAllMember.error) {
      if (getAllMember.error === 'UNAUTHORIZED') {
        return
      }
      enqueueSnackbar(getAllMember.error, { variant: 'error' })
      dispatch(resetGetAllMember())
    }
  }, [getAllMember.error])

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
