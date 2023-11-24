import { Button, IconButton } from '@mui/material'
import {
  Board,
  Container,
  Header,
  Title,
  BoardHeader,
  BoardHeaderItem,
  BoardBody
} from './style'
import { RiArrowLeftSLine, RiArrowUpSLine } from 'react-icons/ri'
import { useState } from 'react'
import { IBoardMembers } from '~/services/types'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMembers as getMembersList } from '~/services/workspaceService'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import LineMemberItem from '../components/LineMemberItem'
import { useDispatch } from 'react-redux'
import { setPopupInvitePeople } from '~/redux/popupSlice'

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
    { title: 'Action', shouldSort: false },
    { title: '', shouldSort: false }
  ]

  const [members, setMembers] = useState<IBoardMembers | undefined>(undefined)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await getMembersList({ id: id as string })
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
        if (message === 'UNAUTHORIZED') {
          return
        }
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
    getMembers()
  }, [id])

  const adjustMemberList = () => {
    const generalList = members?.workspaceAdmins.concat(
      (members.workspaceMembers &&
        members.workspaceMembers.map((mem) => ({ ...mem, role: 'member' }))) ||
        []
    )

    return generalList
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
            <p className="text">Members</p>
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
        <BoardHeader>
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
        </BoardHeader>
        <BoardBody>
          {adjustMemberList()?.map((mem) => (
            <LineMemberItem
              key={mem.user._id}
              data={mem}
              superAdminId={
                members?.workspaceAdmins.find((m) => m.role === 'superAdmin')
                  ?.user._id || ''
              }
            />
          ))}
          {adjustMemberList()?.length === 0 && <p>There is no members</p>}
        </BoardBody>
      </Board>
    </Container>
  )
}
export default MemberSection
