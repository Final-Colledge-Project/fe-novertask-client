import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'

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

// services
import { IAllMemberInBoard, IBoard } from '~/services/types'
import { getAllMemberInBoard, getBoardDetail } from '~/services/boardService'

const BoardDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [viewType, setViewType] = useState('Kanban')
  const [board, setBoard] = useState<IBoard | undefined>(undefined)
  const [members, setMembers] = useState<IAllMemberInBoard | undefined>(
    undefined
  )
  const [shouldShowHeader, setShouldShowHeader] = useState(true)

  const viewList = ['Kanban', 'List']

  const handleToggleCover = () => {
    setShouldShowHeader((prev) => !prev)
  }

  useEffect(() => {
    const getData = async () => {
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
    getData()
  }, [id])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllMemberInBoard({ id: id as string })
        if (res && res?.data) {
          setMembers(res.data)
        }
      } catch (err) {
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      }
    }
    board && getData()
  }, [id, board])

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
          <Button
            color="primary"
            variant="contained"
            startIcon={<RiUserAddLine />}
          >
            Invite
          </Button>
        </Members>
      </TypeHeader>
      <Body>
        {!board?.columns && <BoardDetailLoading />}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        {board?.columns &&
          board.columns.map((column) => <Column column={column} />)}
        <AddColumnButton />
      </Body>
    </BoardDetailContainer>
  )
}

export default BoardDetail
