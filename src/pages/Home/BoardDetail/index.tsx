import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

// component libraries
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { RiFilter3Fill, RiMore2Fill, RiUserAddLine } from 'react-icons/ri'

// components
import {
  BoardDetailContainer,
  Body,
  Header,
  MemberAvatarGroup,
  Members,
  ProjectType,
  TitleHeader,
  TypeHeader,
  TypeItem,
  TypeMenu,
  YellowTooltip
} from './styles'
import SearchBox from '~/components/SearchBox'
import Column from './Column'
import AddColumnButton from './AddColumnButton'
import BoardDetailLoading from '../components/BoardDetailLoading'
import AddMenu from './AddMenu'
import AddMemberPopup from './AddMemberPopup'

// services
import { IAllMemberInBoard, IBoard } from '~/services/types'
import { getAllMemberInBoard, getBoardDetail } from '~/services/boardService'
import { StoreType } from '~/redux'
import {
  setCreateColumn,
  setShouldRefreshBoardDetail
} from '~/redux/boardSlice'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'

const BoardDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [viewType, setViewType] = useState('Kanban')
  const [board, setBoard] = useState<IBoard | undefined>(undefined)
  const [members, setMembers] = useState<IAllMemberInBoard | undefined>(
    undefined
  )
  const [shouldShowHeader, setShouldShowHeader] = useState(true)
  const [addingColumn, setAddingColumn] = useState(false)

  const { success } = useSelector(
    (state: StoreType) => state.board.creatingBoard
  )
  const { shouldRefreshBoardDetail } = useSelector(
    (state: StoreType) => state.board
  )
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  const viewList = ['Kanban', 'List']
  const items = [
    {
      title: 'Add task',
      onChoose: () => {}
    },
    {
      title: 'Add column',
      onChoose: () => {
        setAddingColumn(true)
      }
    }
  ]

  const handleAddingColumn = (nextState: boolean) => {
    setAddingColumn(nextState)
  }

  const handleToggleCover = () => {
    setShouldShowHeader((prev) => !prev)
  }

  const getBoard = async () => {
    try {
      const res = await getBoardDetail({ id: id as string })
      if (res && res?.data) {
        setBoard(res.data)
      }
    } catch (err) {
      const message = (err as AxiosError).message
      if (message === 'UNAUTHORIZED') {
        enqueueSnackbar('You cannot access this board', { variant: 'error' })
        navigate('/u', { replace: true })
      }
    }
  }

  const getMembers = async () => {
    try {
      const res = await getAllMemberInBoard({ id: id as string })
      if (res && res?.data) {
        setMembers(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  useEffect(() => {
    getBoard()
  }, [id])

  useEffect(() => {
    board && getMembers()
  }, [id, board])

  useEffect(() => {
    if (success) {
      getBoard()
      dispatch(setCreateColumn({ success: false }))
    }
  }, [success])

  useEffect(() => {
    if (shouldRefreshBoardDetail) {
      getBoard()
      dispatch(setShouldRefreshBoardDetail(false))
    }
  }, [shouldRefreshBoardDetail])

  const isUserAnAdmin = () => {
    return members?.oweners.find((owner) => owner._id === currentUser?._id)
  }

  const handleShowAddMemberPopup = () => {
    dispatch(
      setPopupAddMemberToBoard({
        show: true,
        data: {
          currentWsID: board?.teamWorkspaceId,
          currentBoardID: board?._id,
          currentMembers: members
        }
      })
    )
  }

  return (
    <BoardDetailContainer>
      <Header
        $img={board?.cover || ''}
        className={clsx(!shouldShowHeader && 'hidden')}
      >
        <div className="show-header" onClick={handleToggleCover}>
          {shouldShowHeader ? 'Hide cover' : 'Show cover'}
        </div>
      </Header>

      <TitleHeader>
        <div className="left-block">
          <div className="title">
            {board?.title}{' '}
            <ProjectType $type={(board?.type as string) || 'public'}>
              {board?.type}
            </ProjectType>
          </div>
          <p className="description">{board?.description}</p>
        </div>
        <div className="right-block">
          <AddMenu items={items} />
          <SearchBox label="" sx={{ height: '35px' }} />
          <IconButton>
            <RiMore2Fill />
          </IconButton>
        </div>
      </TitleHeader>
      <TypeHeader>
        <TypeMenu>
          {viewList.map((type) => (
            <TypeItem
              className={clsx(viewType === type && 'index')}
              onClick={() => setViewType(type)}
            >
              {type}
            </TypeItem>
          ))}
        </TypeMenu>
        <Members>
          <Button color="primary" variant="text" startIcon={<RiFilter3Fill />}>
            Filter
          </Button>
          <MemberAvatarGroup>
            {members?.oweners &&
              members.oweners.map((mem) => (
                <YellowTooltip title={'Owner | ' + mem.firstName}>
                  <Avatar alt={mem.firstName} src={mem.avatar} />
                </YellowTooltip>
              ))}
            {members?.members &&
              members.members.map((mem) => (
                <Tooltip title={mem.firstName}>
                  <Avatar alt={mem.firstName} src={mem.avatar} />
                </Tooltip>
              ))}
          </MemberAvatarGroup>
          {isUserAnAdmin() && (
            <Button
              color="primary"
              variant="contained"
              startIcon={<RiUserAddLine />}
              onClick={handleShowAddMemberPopup}
            >
              Invite
            </Button>
          )}
        </Members>
      </TypeHeader>
      <Body>
        {!board?.columns && <BoardDetailLoading />}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        <AddColumnButton
          addingColumn={addingColumn}
          setFocus={handleAddingColumn}
          boardId={board?._id as string}
        />
      </Body>
      <AddMemberPopup />
    </BoardDetailContainer>
  )
}

export default BoardDetail
