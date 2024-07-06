/* eslint-disable indent */
import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { WSViewMenuContainer } from './style'
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'
import allRoutes from '~/utils/routes'
import { TITLE } from '~/utils/constant/common'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import useWSPermission from '~/hooks/useWSPermission'

export default function WSViewMenu() {
  const [currentView, setCurrentView] = useState('')
  const navigate = useNavigate()
  const { id: wsId } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  /*
    path: path to navigate
    name: name of the route
    title: title of the route will be show in board detail
  */
  const navigateTo = (path: string, name: string, title?: string) => {
    dispatch(showLoading())
    navigate(generatePath(path, { workspaceId: wsId as string }), {
      state: { name, title }
    })
    setTimeout(() => {
      dispatch(hideLoading())
    }, 700)
  }

  const userPermissionOnWS = useWSPermission()
  const isWSAdmin = () => userPermissionOnWS?.isWSAdmin

  const onChoose = (name: string) => {
    if (!name || !wsId) return
    let path = ''
    let title = ''
    switch (name) {
      case allRoutes.home.workspace.workspaceDetail.name:
        path = allRoutes.home.workspace.workspaceDetail.path
        title = TITLE.workspace.workspaceDetail
        break
      case allRoutes.home.workspace.workspaceOverview.name:
        path = allRoutes.home.workspace.workspaceOverview.path
        title = TITLE.workspace.workspaceOverview
        break
      case allRoutes.home.workspace.workspaceMember.name:
        path = allRoutes.home.workspace.workspaceMember.path
        title = TITLE.workspace.workspaceMember
        break
      case allRoutes.home.workspace.workspaceSettings.name:
        path = allRoutes.home.workspace.workspaceSettings.path
        title = TITLE.workspace.workspaceSettings
        break
      default:
        break
    }
    navigateTo(path, name, title)
    setCurrentView(name)
  }

  const routeName = (route: string) => {
    let name = ''
    switch (route) {
      case allRoutes.home.workspace.workspaceOverview.name:
        name = TITLE.workspace.workspaceOverview
        break
      case allRoutes.home.workspace.workspaceDetail.name:
        name = TITLE.workspace.workspaceDetail
        break
      case allRoutes.home.workspace.workspaceMember.name:
        name = TITLE.workspace.workspaceMember
        break
      case allRoutes.home.workspace.workspaceSettings.name:
        name = TITLE.workspace.workspaceSettings
        break
      default:
        name = TITLE.workspace.workspaceDetail
        break
    }
    return name
  }

  useEffect(() => {
    const segment = location.pathname.split('/').pop()
    let name = ''
    switch (segment) {
      case allRoutes.home.workspace.workspaceOverview.segment:
        name = allRoutes.home.workspace.workspaceOverview.name
        break
      case allRoutes.home.workspace.workspaceDetail.segment || '':
        name = allRoutes.home.workspace.workspaceDetail.name
        break
      case allRoutes.home.workspace.workspaceMember.segment:
        name = allRoutes.home.workspace.workspaceMember.name
        break
      case allRoutes.home.workspace.workspaceSettings.segment:
        name = allRoutes.home.workspace.workspaceSettings.name
        break
      default:
        name = allRoutes.home.workspace.workspaceDetail.name
        break
    }
    setCurrentView(name)
  }, [location.pathname])

  return (
    <WSViewMenuContainer>
      <div className="menu-title">View: </div>
      <Select
        id="board-view-menu-select-label"
        labelId=""
        sx={{
          height: '25px',
          'fieldset.MuiOutlinedInput-notchedOutline': { border: 'none' }
        }}
        size="small"
        value={currentView}
        variant="outlined"
        onChange={(e) => onChoose(e.target.value)}>
        {Object.values(allRoutes.home.workspace)
          .filter((route) => {
            return route.adminOnly ? isWSAdmin() : true
          })
          .map((route) => {
            return (
              <MenuItem dense value={route.name}>
                {routeName(route.name)}
              </MenuItem>
            )
          })}
      </Select>
    </WSViewMenuContainer>
  )
}
