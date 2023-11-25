import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import clsx from 'clsx'

// component libraries
import { Button, IconButton } from '@mui/material'
import { RiArrowLeftSLine, RiArrowUpSLine } from 'react-icons/ri'

// components
import {
  Board,
  Container,
  Header,
  Title,
  BoardHeader,
  BoardHeaderItem,
  BoardBody,
  TabHeader
} from './style'
import LineMemberItem from '../components/LineMemberItem'

// services
import { setPopupInvitePeople } from '~/redux/popupSlice'
import { StoreDispatchType, StoreType } from '~/redux'
import { getAllMembers } from '~/redux/teamWSSlice/actions'
import { resetAssignAdmin } from '~/redux/teamWSSlice'

const MemberSection = () => {
  const [viewState, setViewState] = useState<{
    pageSize: number
    page: number
    sortBy: string | undefined
    isAsc: boolean
  }>({
    pageSize: 5,
    page: 1,
    sortBy: undefined,
    isAsc: true
  })

  const handleChangeSort = (toSortBy: string) => {
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

  const boardColumnTitles = [
    { title: '', shouldSort: false },
    { title: 'Member', shouldSort: true },
    { title: 'Email', shouldSort: true },
    { title: 'Role', shouldSort: false },
    { title: 'Action', shouldSort: false }
  ]

  const tabHeaderTitle = [
    {
      value: 'all',
      title: 'All'
    },
    {
      value: 'superAdmin',
      title: 'Super admin'
    },
    {
      value: 'admin',
      title: 'Admin'
    },
    {
      value: 'member',
      title: 'Member'
    }
  ]

  const {
    getAllMember,
    currTeamMembers: members,
    assignAdmin
  } = useSelector((state: StoreType) => state.teamWorkspace)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<StoreDispatchType>()
  const [tab, setTab] = useState('all')

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

  useEffect(() => {
    if (getAllMember.error) {
      if (getAllMember.error === 'UNAUTHORIZED') {
        return
      }
      enqueueSnackbar(getAllMember.error, { variant: 'error' })
    }
  }, [getAllMember.error])

  useEffect(() => {
    if (assignAdmin.success) {
      enqueueSnackbar('Assign admin successfully', { variant: 'success' })
      dispatch(resetAssignAdmin())
    }
  }, [assignAdmin.success])

  const superAdmin = () => {
    if (members) {
      return members?.workspaceAdmins.find((m) => m.role === 'superAdmin')
    }
  }

  const handleShowPopupInvite = () => {
    dispatch(
      setPopupInvitePeople({
        show: true,
        data: { wsID: id, members: members }
      })
    )
  }

  return (
    <Container>
      <Header>
        <Title>
          <div className="title">
            <IconButton size="small" onClick={() => navigate('../')}>
              <RiArrowLeftSLine />
            </IconButton>
            <p className="text">Members in this workspace</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleShowPopupInvite}
          >
            Invite more people
          </Button>
        </Title>
        <p className="describe">
          Workspace member can see all <b>public</b> projects. Only those who
          have been added to private projects can see them
        </p>
      </Header>
      <Board>
        {/* <BoardHeader>
          {boardColumnTitles.map((c, i) => (
            <BoardHeaderItem
              key={c.title + i}
              active={viewState.sortBy === c.title}
              isAsc={viewState.sortBy === c.title ? viewState.isAsc : true}
              onClick={() => c.shouldSort && handleChangeSort(c.title)}
            >
              <p>{c.title}</p>
              {c.shouldSort && (
                <div className="icon">
                  <IconButton aria-label="sort">
                    <RiArrowUpSLine />
                  </IconButton>
                </div>
              )}
            </BoardHeaderItem>
          ))}
        </BoardHeader> */}
        <TabHeader>
          {tabHeaderTitle.map((item) => (
            <div
              className={clsx('item', tab === item.value && 'index')}
              onClick={() => setTab(item.value)}
            >
              {item.title}
            </div>
          ))}
        </TabHeader>
        <BoardBody>
          {/* show super admin */}
          {(tab === 'all' || tab === 'superAdmin') && superAdmin() && (
            <LineMemberItem
              key={superAdmin()?.user?._id}
              data={superAdmin()!}
              superAdminId={superAdmin()?.user?._id || ''}
            />
          )}
          {/* show admin */}
          {(tab === 'all' || tab === 'admin') &&
            members &&
            members?.workspaceAdmins
              .filter((mem) => mem.role === 'admin')
              .map((mem) => (
                <LineMemberItem
                  key={mem?.user?._id}
                  data={mem}
                  superAdminId={mem.user?._id || ''}
                />
              ))}
          {/* show member */}
          {(tab === 'all' || tab === 'member') &&
            members &&
            members.workspaceMembers &&
            members.workspaceMembers.map((mem) => (
              <LineMemberItem
                key={mem.user._id}
                data={{ ...mem, role: 'member' }}
                superAdminId={superAdmin()?.user._id || ''}
              />
            ))}
          {/* show placeholder */}
          {tab === 'admin' &&
            members?.workspaceAdmins.filter((mem) => mem.role === 'admin')
              .length === 0 && (
              <p className="placeholder">There is no one here</p>
            )}
          {tab === 'member' && members?.workspaceMembers?.length === 0 && (
            <p className="placeholder">There is no one here</p>
          )}
        </BoardBody>
      </Board>
    </Container>
  )
}
export default MemberSection
