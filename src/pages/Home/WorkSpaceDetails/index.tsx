import SearchBox from '~/components/SearchBox'
import {
  FilterSection,
  LineTitle,
  LineTitleItem,
  MemberPart,
  Members,
  MembersSummary,
  ProjectBoard,
  ProjectContainer,
  ProjectSection,
  ProjectSummary,
  Summary,
  Title,
  Total,
  WorkSpaceDetailContainer
} from './style'
import { RiArrowUpSLine, RiMoreFill, RiQuestionLine } from 'react-icons/ri'
import IconButton from '@mui/material/IconButton'
import {
  Avatar,
  AvatarGroup,
  Button,
  Tooltip,
  TooltipProps,
  styled
} from '@mui/material'
import BlockItem from './components/BlockProjectItem'
import LineItem from './components/LineProjectItem'
import { setPopupAddPJ, setPopupInvitePeople } from '~/redux/popupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import ToggleViewButton from '../components/ToggleViewButton'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ColumnMenu from './components/ColumnMenu'
import { IBoard, IBoardMembers } from '~/services/types'

import * as workspaceService from '~/services/workspaceService'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { getAllByWSId } from '~/services/boardService'
import LoadingSkeleton from '../components/LoadingSkeleton'
import InvitePeoplePopup from '../components/InvitePeoplePopup'
const AdminTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: #ffcc02;
  }

  & .MuiTooltip-arrow {
    /* top: -10px !important; */
    &::before {
      background: #ffcc02;
    }
  }
`

const WorkSpaceDetails = () => {
  const dispatch = useDispatch<StoreDispatchType>()

  const [viewType, setViewType] = useState<'list' | 'block'>('block')
  const [viewState, setViewState] = useState<{
    pageSize: number
    page: number
    sortBy: 'name' | 'createdAt' | 'dueDate' | undefined
    isAsc: boolean
  }>({
    pageSize: 5,
    page: 1,
    sortBy: undefined,
    isAsc: true
  })

  const [members, setMembers] = useState<IBoardMembers | undefined>(undefined)
  const [boards, setBoards] = useState<IBoard[] | undefined>(undefined)
  const currentUser = useSelector((state: StoreType) => state.auth)
  const allBoardInfoOfCurrentUser = useSelector(
    (state: StoreType) => state.board
  )

  const handleShowAddPJPopup = () => {
    dispatch(setPopupAddPJ(true))
  }

  const handleShowPopupInvite = () => {
    dispatch(setPopupInvitePeople(true))
  }

  const handleChangeViewType = (viewType: 'list' | 'block') => {
    setViewType(viewType)
  }

  const handleChangeSort = (toSortBy: 'name' | 'createdAt' | 'dueDate') => {
    const fromSortBy = viewState.sortBy
    const fromSortType = viewState.isAsc
    setViewState((prev) => {
      const newState = { ...prev }
      newState.sortBy = toSortBy
      if (fromSortBy !== toSortBy) {
        newState.isAsc = true
      } else {
        if (!fromSortType) {
          newState.isAsc = false
        }
        newState.isAsc = !fromSortType
      }
      return newState
    })
  }

  const { id } = useParams()

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await workspaceService.getMembers({ id: id as string })
        if (res && res.data) {
          const { workspaceAdmins, workspaceMembers } = res.data

          // clean members list
          const cleanedMemberList = workspaceMembers?.filter(
            (member) =>
              workspaceAdmins.findIndex(
                (admin) => admin.user._id === member.user._id
              ) === -1
          )

          setMembers({
            workspaceAdmins,
            workspaceMembers: cleanedMemberList || []
          })
        }
      } catch (err) {
        const message = (err as AxiosError).message
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
    getMembers()
  }, [id])

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await getAllByWSId({ wsId: id as string })
        if (res && res.data) {
          setBoards(res.data)
        }
      } catch (error) {
        const message = (error as AxiosError).message
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
    getBoards()
  }, [id])

  const checkIsUserInBoard = useCallback(
    (board: IBoard) => {
      if (board.type === 'public') return true
      const { ownerIds, memberIds } = board
      const members = [...ownerIds, ...memberIds]
      return members.includes(currentUser.userInfo?._id as string)
    },
    [currentUser]
  )

  const checkIsUserAnAdmin = useCallback(() => {
    return (
      members?.workspaceAdmins.findIndex(
        (admin) => admin.user._id === currentUser.userInfo?._id
      ) !== -1
    )
  }, [members?.workspaceAdmins, currentUser.userInfo?._id])

  const countMembers = useMemo(() => {
    if (members) {
      const { workspaceAdmins, workspaceMembers } = members
      let count = workspaceAdmins.length
      if (workspaceMembers) count += workspaceMembers.length
      return count
    }
    return 0
  }, [members])

  return (
    <WorkSpaceDetailContainer>
      <div className="header">
        <h2 className="name">
          {allBoardInfoOfCurrentUser.boards.find((b) => b._id === id)?.name}
        </h2>
        <div className="search-box">
          <SearchBox label="" />
        </div>
        <div className="more-icon">
          <IconButton aria-label="">
            <RiMoreFill />
          </IconButton>
        </div>
      </div>

      <Summary>
        <ProjectSummary>
          <div className="header">
            <p className="title">Projects</p>
            <Button
              variant="contained"
              color="primary"
              sx={{ p: '2px 8px' }}
              onClick={() => handleShowAddPJPopup()}
            >
              Create new
            </Button>
          </div>
          <Total>
            <div className="count">{boards?.length}</div>
            <div className="label">Total</div>
          </Total>
        </ProjectSummary>
        <MembersSummary>
          <div className="header">
            <p className="title">Members</p>
            <Button variant="text" color="primary" sx={{ p: '2px 8px' }}>
              See all
            </Button>
          </div>
          <div className="content">
            <Total>
              <div className="count">{countMembers}</div>
              <div className="label">Total</div>
            </Total>
            <div className="image-group">
              <Members>
                <MemberPart className="admin">
                  <div className="label">Admins</div>
                  <AvatarGroup
                    max={4}
                    sx={{
                      ml: '8px',
                      // flexDirection: 'row',
                      '& .MuiAvatar-root': {
                        width: '35px',
                        height: '35px',
                        ml: '-8px',
                        boxShadow: '0 0 2px 1px rgba(0,0,0, 0.2)'
                      },
                      '& .MuiAvatar-root:last-child': {
                        ml: '-8px'
                      }
                    }}
                  >
                    {members?.workspaceAdmins.map((mem) => {
                      if (mem.role === 'superAdmin')
                        return (
                          <AdminTooltip
                            title={'Super admin | ' + mem.user.fullName}
                            arrow
                            key={mem.user._id}
                          >
                            <Avatar
                              alt={mem.user.fullName}
                              src={mem.user.avatar}
                              sx={{
                                '&.MuiAvatar-root': {
                                  // order: 2,
                                  border: (theme) =>
                                    `3px solid ${theme.palette.yellow.main} !important`
                                }
                              }}
                            />
                          </AdminTooltip>
                        )
                      else
                        return (
                          <Tooltip title={mem.user.fullName}>
                            <Avatar
                              key={mem.user._id}
                              alt={mem.user.fullName}
                              src={mem.user.avatar}
                            />
                          </Tooltip>
                        )
                    })}
                  </AvatarGroup>
                </MemberPart>
                <MemberPart className="members">
                  <div className="label">Members</div>
                  <AvatarGroup
                    max={5}
                    sx={{
                      ml: '8px',
                      flexDirection: 'row',
                      '& .MuiAvatar-root': {
                        width: '35px',
                        height: '35px',
                        ml: '-8px',
                        boxShadow: '0 0 2px 1px rgba(0,0,0, 0.2)'
                      },

                      '& .MuiAvatar-root:first-child': {
                        order: 3,
                        fontSize: '14px'
                      },
                      '& .MuiAvatar-root:last-child': {
                        ml: '-8px'
                      }
                    }}
                  >
                    {members?.workspaceMembers?.map((mem) => (
                      <Tooltip title={mem.user.fullName}>
                        <Avatar
                          key={mem.user._id}
                          alt={mem.user.fullName}
                          src={mem.user.avatar}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </MemberPart>
              </Members>
              {checkIsUserAnAdmin() && (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={
                    <img className="icon" src="/img/plane_2.png" alt="" />
                  }
                  onClick={handleShowPopupInvite}
                  sx={{
                    '&.MuiButton-root': {
                      backgroundImage:
                        'linear-gradient(45deg, #0B84FF -15.23%, #0040DD 102.22%);'
                    }
                  }}
                >
                  Invite new people
                </Button>
              )}
            </div>
          </div>
        </MembersSummary>
      </Summary>

      {boards ? (
        <ProjectSection>
          <Title>
            <div className="title">
              <p>Projects</p>
              {boards.filter((b) => !checkIsUserInBoard(b)).length > 0 && (
                <Tooltip
                  title={`You only see the projects you have access to or public projects`}
                >
                  <div className="icon">
                    <RiQuestionLine />
                  </div>
                </Tooltip>
              )}
            </div>
            <FilterSection>
              <SearchBox
                label=""
                sx={{ height: '35px', width: 'auto' }}
                placeHolder="Search"
              />
              {viewType === 'list' && <ColumnMenu />}
              <ToggleViewButton onChange={handleChangeViewType} />
            </FilterSection>
          </Title>
          {/* <WorkSpaceSummary data={{ id: '123', title: 'title', projects: [] }} /> */}
          <ProjectBoard $display={viewType}>
            {viewType === 'list' ? (
              <LineTitle>
                <LineTitleItem></LineTitleItem>
                <LineTitleItem
                  active={viewState.sortBy === 'name'}
                  isAsc={viewState.sortBy === 'name' ? viewState.isAsc : true}
                  onClick={() => handleChangeSort('name')}
                >
                  <p>Name</p>
                  <div className="icon">
                    <IconButton aria-label="sort">
                      <RiArrowUpSLine />
                    </IconButton>
                  </div>
                </LineTitleItem>
                <LineTitleItem className="center">Type</LineTitleItem>
                <LineTitleItem className="center">Members</LineTitleItem>
                <LineTitleItem
                  className="center"
                  active={viewState.sortBy === 'createdAt'}
                  isAsc={
                    viewState.sortBy === 'createdAt' ? viewState.isAsc : true
                  }
                  onClick={() => handleChangeSort('createdAt')}
                >
                  <p>Created at</p>
                  <div className="icon">
                    <IconButton aria-label="sort">
                      <RiArrowUpSLine />
                    </IconButton>
                  </div>
                </LineTitleItem>
                <LineTitleItem
                  className="center"
                  active={viewState.sortBy === 'dueDate'}
                  isAsc={
                    viewState.sortBy === 'dueDate' ? viewState.isAsc : true
                  }
                  onClick={() => handleChangeSort('dueDate')}
                >
                  <p>Due date</p>
                  <div className="icon">
                    <IconButton aria-label="sort">
                      <RiArrowUpSLine />
                    </IconButton>
                  </div>
                </LineTitleItem>
                <LineTitleItem></LineTitleItem>
              </LineTitle>
            ) : (
              <></>
            )}
            <ProjectContainer $display={viewType === 'list' ? 'flex' : 'grid'}>
              {viewType === 'list' ? (
                <>
                  {boards?.map(
                    (board) =>
                      checkIsUserInBoard(board) && (
                        <LineItem data={board} key={board._id} />
                      )
                  )}
                </>
              ) : (
                <>
                  {boards?.map(
                    (board) =>
                      checkIsUserInBoard(board) && (
                        <BlockItem data={board} key={board._id} />
                      )
                  )}
                </>
              )}
            </ProjectContainer>
          </ProjectBoard>
        </ProjectSection>
      ) : (
        <LoadingSkeleton />
      )}
      <InvitePeoplePopup wsID={id as string} />
    </WorkSpaceDetailContainer>
  )
}

export default WorkSpaceDetails
