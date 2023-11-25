import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'

// component libraries
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import {
  AdminAvatarGroup,
  AdminTooltip,
  FilterSection,
  LineTitle,
  LineTitleItem,
  MemberAvatarGroup,
  MemberPart,
  Members,
  MembersSummary,
  ProjectBoard,
  ProjectContainer,
  ProjectSection,
  ProjectSummary,
  Summary,
  Title,
  Total
} from './style'
import { RiArrowUpSLine, RiQuestionLine } from 'react-icons/ri'

//component
import SearchBox from '~/components/SearchBox'
import ColumnMenu from '../components/ColumnMenu'
import ToggleViewButton from '../../components/ToggleViewButton'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import BlockItem from '../components/BlockProjectItem'
import LineItem from '../components/LineProjectItem'

//services
import { StoreDispatchType, StoreType } from '~/redux'
import { setPopupAddPJ, setPopupInvitePeople } from '~/redux/popupSlice'
import { getAllByWSId } from '~/services/boardService'
import { IBoard } from '~/services/types'
import { getAllMembers } from '~/redux/teamWSSlice/actions'
import { resetGetAllMember } from '~/redux/teamWSSlice'

const OverviewSection = () => {
  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()

  // manage show type of project item
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

  const [boards, setBoards] = useState<IBoard[] | undefined>(undefined)
  const currentUser = useSelector((state: StoreType) => state.auth)
  const { getAllMember, currTeamMembers } = useSelector(
    (state: StoreType) => state.teamWorkspace
  )

  // show popup add project
  const handleShowAddPJPopup = () => {
    dispatch(
      setPopupAddPJ({
        show: true,
        data: {
          currentWsID: id
        }
      })
    )
  }

  // show popup invite people
  const handleShowPopupInvite = () => {
    dispatch(
      setPopupInvitePeople({
        show: true,
        data: { wsID: id, members: currTeamMembers }
      })
    )
  }

  // handle change project view type
  const handleChangeViewType = (viewType: 'list' | 'block') => {
    setViewType(viewType)
  }

  // handle change sort order of projects
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

  // get current workspace id via url parameter
  const { id } = useParams()

  // get members of current workspace
  useEffect(() => {
    const getMembers = async () => {
      try {
        await dispatch(getAllMembers({ id: id as string }))
      } catch (err) {
        const message = (err as Error).message
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
    getMembers()
  }, [id])

  // get board of current workspace
  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await getAllByWSId({ wsId: id as string })
        if (res && res.data) {
          setBoards(res.data)
        }
      } catch (error) {
        const message = (error as AxiosError).message
        if (message === 'UNAUTHORIZED') {
          enqueueSnackbar('Unauthorized! Switching to home', {
            variant: 'info'
          })
          navigate('/u/home', { replace: true })
          return
        }
        if (message === 'Something went wrong! Please try later.') {
          navigate('/u/home', { replace: true })
          enqueueSnackbar(message, { variant: 'error' })
        }
      }
    }
    getBoards()
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

  // the name is really meaningful already :)
  const checkIsUserInBoard = useCallback(
    (board: IBoard) => {
      if (board.type === 'public') return true
      const { ownerIds, memberIds } = board
      const members = [...ownerIds, ...memberIds]
      return members.includes(currentUser.userInfo?._id as string)
    },
    [currentUser]
  )

  // the name is really meaningful already :)
  const checkIsUserAnAdmin = useCallback(() => {
    return (
      currTeamMembers?.workspaceAdmins.findIndex(
        (admin) => admin.user._id === currentUser.userInfo?._id
      ) !== -1
    )
  }, [currTeamMembers?.workspaceAdmins, currentUser.userInfo?._id])

  // count members, 2 lists are not duplicate the item
  const countMembers = useMemo(() => {
    if (currTeamMembers) {
      const { workspaceAdmins, workspaceMembers } = currTeamMembers
      let count = workspaceAdmins.length
      if (workspaceMembers) count += workspaceMembers.length
      return count
    }
    return 0
  }, [currTeamMembers])

  // find the super admin of current workspace
  const superAdmin = () => {
    if (currTeamMembers) {
      return currTeamMembers?.workspaceAdmins.find(
        (m) => m.role === 'superAdmin'
      )
    }
  }

  return (
    <>
      <Summary>
        <ProjectSummary>
          <div className="header">
            <p className="title">Projects</p>
            {checkIsUserAnAdmin() && (
              <Button
                variant="contained"
                color="primary"
                sx={{ p: '2px 8px' }}
                onClick={() => handleShowAddPJPopup()}
              >
                Create new
              </Button>
            )}
          </div>
          <Total>
            <div className="count">{boards?.length}</div>
            <div className="label">Total</div>
          </Total>
        </ProjectSummary>
        <MembersSummary>
          <div className="header">
            <p className="title">Members</p>
            <Button
              variant="text"
              color="primary"
              sx={{ p: '2px 8px' }}
              onClick={() => navigate('members')}
            >
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
                  <AdminAvatarGroup>
                    <AdminTooltip
                      title={'Super admin | ' + superAdmin()?.user.fullName}
                      arrow
                      key={superAdmin()?.user._id}
                    >
                      <Avatar
                        alt={superAdmin()?.user.fullName}
                        src={superAdmin()?.user.avatar}
                        sx={{
                          '&.MuiAvatar-root': {
                            // order: 2,
                            border: (theme) =>
                              `3px solid ${theme.palette.yellow.main} !important`
                          }
                        }}
                      />
                    </AdminTooltip>
                    {currTeamMembers?.workspaceAdmins.map(
                      (mem) =>
                        mem.role === 'admin' && (
                          <Tooltip title={mem.user.fullName} key={mem.user._id}>
                            <Avatar
                              key={mem.user._id}
                              alt={mem.user.fullName}
                              src={mem.user.avatar}
                            />
                          </Tooltip>
                        )
                    )}
                  </AdminAvatarGroup>
                </MemberPart>
                <MemberPart className="members">
                  <div className="label">Members</div>
                  <MemberAvatarGroup>
                    {currTeamMembers?.workspaceMembers?.map((mem) => (
                      <Tooltip title={mem.user.fullName} key={mem.user._id}>
                        <Avatar
                          key={mem.user._id}
                          alt={mem.user.fullName}
                          src={mem.user.avatar}
                        />
                      </Tooltip>
                    ))}
                  </MemberAvatarGroup>
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
              {boards.filter((b) => !checkIsUserInBoard(b)).length > 0 &&
                !checkIsUserAnAdmin() && (
                  <Tooltip
                    title={
                      'You only see the projects you have access to or public projects'
                    }
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
                      (checkIsUserInBoard(board) || checkIsUserAnAdmin()) && (
                        <LineItem data={board} key={board._id} />
                      )
                  )}
                </>
              ) : (
                <>
                  {boards?.map(
                    (board) =>
                      (checkIsUserInBoard(board) || checkIsUserAnAdmin()) && (
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
    </>
  )
}
export default OverviewSection
