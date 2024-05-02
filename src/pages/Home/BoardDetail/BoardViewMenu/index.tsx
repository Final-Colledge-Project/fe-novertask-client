/* eslint-disable indent */
import { MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { BoardViewMenuContainer } from './style'
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'
import allRoutes from '~/utils/routes'
import { TITLE } from '~/utils/constant/common'

export default function BoardViewMenu() {
  const [currentView, setCurrentView] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  /*
    path: path to navigate
    name: name of the route
    title: title of the route will be show in board detail
  */
  const navigateTo = (path: string, name: string, title?: string) => {
    navigate(generatePath(path, { boardId: id as string }), {
      state: { name, title }
    })
  }

  const onChoose = (name: string) => {
    if (!name || !id) return
    let path = ''
    let title = ''
    switch (name) {
      case allRoutes.home.board.boardOverView.name:
        path = allRoutes.home.board.boardOverView.path
        title = TITLE.board.boardOverView
        break
      case allRoutes.home.board.boardDetail.name:
        path = allRoutes.home.board.boardDetail.path
        title = TITLE.board.boardDetail
        break
      case allRoutes.home.board.boardMember.name:
        path = allRoutes.home.board.boardMember.path
        title = TITLE.board.boardMember
        break
      case allRoutes.home.board.boardSettings.name:
        path = allRoutes.home.board.boardSettings.path
        title = TITLE.board.boardSettings
        break
      default:
        break
    }
    navigateTo(path, name, title)
    setCurrentView(name)
  }

  useEffect(() => {
    const segment = location.pathname.split('/').pop()
    let name = ''
    switch (segment) {
      case allRoutes.home.board.boardOverView.segment:
        name = allRoutes.home.board.boardOverView.name
        break
      case allRoutes.home.board.boardDetail.segment || '':
        name = allRoutes.home.board.boardDetail.name
        break
      case allRoutes.home.board.boardMember.segment:
        name = allRoutes.home.board.boardMember.name
        break
      case allRoutes.home.board.boardSettings.segment:
        name = allRoutes.home.board.boardSettings.name
        break
      default:
        name = allRoutes.home.board.boardDetail.name
        break
    }
    setCurrentView(name)
  }, [location.pathname])

  return (
    <BoardViewMenuContainer>
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
        <MenuItem dense value={allRoutes.home.board.boardOverView.name}>
          {TITLE.board.boardOverView}
        </MenuItem>
        <MenuItem dense value={allRoutes.home.board.boardDetail.name}>
          {TITLE.board.boardDetail}
        </MenuItem>
        <MenuItem dense value={allRoutes.home.board.boardMember.name}>
          {TITLE.board.boardMember}
        </MenuItem>
        <MenuItem dense value={allRoutes.home.board.boardSettings.name}>
          {TITLE.board.boardSettings}
        </MenuItem>
      </Select>
    </BoardViewMenuContainer>
  )
}
