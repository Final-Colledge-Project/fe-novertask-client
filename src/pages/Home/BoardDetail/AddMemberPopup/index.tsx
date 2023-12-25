import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'

// component libraries
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  RiCloseFill,
  RiCloseLine,
  RiUserStarLine,
  RiUserUnfollowLine
} from 'react-icons/ri'

// components
import TextInput from '~/components/TextInput'
import {
  ActionButtonsGroup,
  Container,
  Footer,
  Header,
  MemberItem,
  MemberSectionTitle,
  Members,
  Modal
} from './styles'

// services
import { StoreType } from '~/redux'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'
import { IAllMemberInBoard, IBoardMembers } from '~/services/types'
import { getMembers } from '~/services/workspaceService'
import {
  addMember,
  assignMemberToAdmin,
  getAllMemberInBoard,
  revokeAdmin as revokeAdminInBoard
} from '~/services/boardService'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import socketIoClient from 'socket.io-client'

const ROLES = {
  member: 'member',
  leader: 'boardLead',
  admin: 'boardAdmin'
}

export default function AddMemberPopup() {
  const dispatch = useDispatch()
  const popup = useSelector(
    (state: StoreType) => state.popup.PopupAddMemberToBoard
  )
  const [searchString, setSearchString] = useState('')
  const [WSMembers, setWSMembers] = useState<IBoardMembers | undefined>()
  const [boardMembers, setBoardMembers] = useState<
    IAllMemberInBoard | undefined
  >(popup.data.currentMembers)
  const [chosenList, setChosenList] = useState<{ _id: string; name: string }[]>(
    []
  )

  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  const handleSocket = (memberIds: string[]) => {
    const socket = socketIoClient('http://localhost:5000')
    socket.emit('add_boardMembers', memberIds)
  }

  const handleClose = () => {
    setChosenList([])
    setSearchString('')
    dispatch(
      setPopupAddMemberToBoard({
        show: false,
        data: {
          currentWsID: undefined,
          currentBoardID: undefined,
          currentMembers: {}
        }
      })
    )
  }

  const getWSMembers = async () => {
    try {
      const res = await getMembers({ id: popup.data.currentWsID as string })
      if (res && res.data) {
        setWSMembers(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getMemberInBoard = async () => {
    try {
      const res = await getAllMemberInBoard({
        id: popup.data.currentBoardID as string
      })
      if (res && res?.data) {
        setBoardMembers(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const cleanedWSMembers = useMemo(() => {
    if (WSMembers) {
      const { workspaceAdmins, workspaceMembers } = WSMembers as IBoardMembers
      const mergedList = [
        workspaceAdmins.find((mem) => mem.role === 'superAdmin')
      ]
      mergedList.push(...workspaceAdmins.filter((mem) => mem.role === 'admin'))

      if (workspaceMembers) {
        mergedList.push(
          ...workspaceMembers
            .filter((mem) => {
              return (
                mem.user &&
                !workspaceAdmins.find(
                  (admin) => admin.user?._id === mem?.user?._id
                )
              )
            })
            .map((mem) => ({ ...mem, role: '' as 'admin' }))
        )
      }

      const filteredList = mergedList.filter((mem) => {
        if (!searchString) return true
        else {
          return (
            mem?.user?.fullName.includes(searchString) ||
            mem?.user?.email.includes(searchString)
          )
        }
      })

      return filteredList
    }
  }, [WSMembers, searchString])

  const isMemberInBoard = (id: string) => {
    if (!id || !boardMembers) return
    return (
      !!boardMembers?.oweners?.find(({ user }) => user._id === id) ||
      !!boardMembers?.members?.find((user) => user._id === id)
    )
  }

  const roleInBoard = (id: string) => {
    if (!id || !boardMembers) return
    const foundUser = boardMembers?.oweners?.find(({ user }) => user._id === id)
    if (!foundUser) return ROLES.member
    else if (foundUser.role === ROLES.leader) return ROLES.leader
    else return ROLES.admin
  }

  const isAdminOrLeader = (id: string) => {
    return roleInBoard(id) === ROLES.admin || roleInBoard(id) === ROLES.leader
  }

  useEffect(() => {
    if (popup.show) getWSMembers()
  }, [popup.data.currentWsID])

  useEffect(() => {
    setBoardMembers(popup.data.currentMembers)
  }, [popup.show])

  useEffect(() => {
    // if search string change -> chosen list have to be updated
    setChosenList((prev) => {
      return prev.filter((item) =>
        availableToChooseList()?.find((mem) => mem?.user?._id === item._id)
      )
    })
  }, [searchString])

  const checkIsChosen = (id: string) => {
    if (!id || chosenList.length === 0) return false
    return !!chosenList.find((item) => item._id === id)
  }

  const handleAddMemberToBoard = async () => {
    if (popup.data && chosenList?.length > 0)
      try {
        dispatch(showLoading())
        const memberIds = chosenList.map((mem) => mem._id)
        const res = await addMember({
          boardId: popup.data.currentBoardID as string,
          memberIds
        })
        if (res && res.data) {
          dispatch(setShouldRefreshBoardDetail(true))
          setChosenList([])
          setSearchString('')
          // dispatch(setShouldRefreshMemberInBoard(true))
          await getMemberInBoard()
          handleSocket(memberIds)
          enqueueSnackbar('Add member successfully', { variant: 'success' })
        }
      } catch (err) {
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      } finally {
        dispatch(hideLoading())
      }
  }

  const availableToChooseList = () => {
    return cleanedWSMembers?.filter(
      (mem) => !isMemberInBoard(mem?.user?._id as string)
    )
  }

  const assignMember = async (id: string) => {
    dispatch(showLoading())
    try {
      const res = await assignMemberToAdmin({
        boardId: popup.data.currentBoardID as string,
        memberId: id
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
        setChosenList([])
        setSearchString('')
        // dispatch(setShouldRefreshMemberInBoard(true))
        await getMemberInBoard()
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const revokeAdmin = async (id: string) => {
    dispatch(showLoading())
    try {
      const res = await revokeAdminInBoard({
        boardId: popup.data.currentBoardID as string,
        memberId: id
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
        setChosenList([])
        setSearchString('')
        // dispatch(setShouldRefreshMemberInBoard(true))
        await getMemberInBoard()
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleChooseAll = () => {
    if (chosenList.length === availableToChooseList()?.length) {
      // have chosen all
      setChosenList([])
    } else {
      setChosenList((prev) => {
        if (availableToChooseList()) {
          return availableToChooseList()!.map((mem) => ({
            _id: mem?.user?._id as string,
            name: mem?.user?.fullName as string
          }))
        } else {
          return prev
        }
      })
    }
  }

  const handleChooseOne = (id: string, name: string) => {
    setChosenList((prev) => {
      if (prev.find((mem) => mem._id === id)) {
        return prev.filter((mem) => mem._id !== id)
      } else return [...prev, { _id: id, name }]
    })
  }

  const shouldShowAssignButton = (memberId: string) => {
    if (!isAdminOrLeader(currentUser?._id as string)) return false
    if (roleInBoard(memberId) !== ROLES.member) return false
    return true
  }

  const shouldShowRevokeButton = (memberId: string) => {
    if (roleInBoard(memberId) !== ROLES.admin) return false
    if (roleInBoard(currentUser?._id as string) !== ROLES.leader) return false

    return true
  }

  return (
    <Container className={clsx(!popup.show && 'hidden')} onClick={handleClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <div className="title">
            <p>Add member to board</p>
          </div>
          <IconButton onClick={handleClose}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <TextInput
          label=""
          placeHolder="Search by name or email..."
          value={searchString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // typewatch(() => setSearchString(e.target.value), 500)
            setSearchString(e.target.value)
          }}
        />
        <Members>
          <MemberSectionTitle>
            <FormControlLabel
              sx={{
                marginLeft: '0',
                '& .MuiTypography-root': {
                  display: 'block',
                  fontSize: '14px',
                  color: (theme) => theme.palette.gray.main,
                  marginLeft: '20px'
                }
              }}
              control={
                <Checkbox
                  checked={
                    availableToChooseList()?.length === chosenList.length &&
                    chosenList.length !== 0
                  }
                  onChange={handleChooseAll}
                />
              }
              label="Select all"
            />
            <p className="note">Action</p>
          </MemberSectionTitle>

          {cleanedWSMembers?.map((member) => (
            <MemberItem key={member?.user?._id}>
              <Checkbox
                style={{
                  opacity: !isMemberInBoard(member?.user?._id as string)
                    ? '1'
                    : '0'
                }}
                checked={checkIsChosen(member?.user?._id as string)}
                disabled={isMemberInBoard(member?.user?._id as string)}
                onChange={() =>
                  handleChooseOne(
                    member?.user?._id as string,
                    member?.user?.fullName as string
                  )
                }
              />

              <div className="image">
                <Avatar
                  src={member?.user?.avatar}
                  alt=""
                  sx={{
                    width: '30px',
                    height: '30px'
                  }}
                />
              </div>
              <div className="info">
                <div className="name-role-group">
                  <div className="name">{member?.user?.fullName}</div>
                  <div
                    className={clsx(
                      'role',
                      roleInBoard(member?.user?._id as string)
                    )}
                  >
                    {roleInBoard(member?.user?._id as string) ===
                      ROLES.leader && 'Lead'}
                    {roleInBoard(member?.user?._id as string) === ROLES.admin &&
                      'Admin'}
                    {roleInBoard(member?.user?._id as string) ===
                      ROLES.member && 'Member'}
                  </div>
                </div>
                <div className="email">{member?.user?.email}</div>
              </div>
              {/* {isMemberInBoard(member?.user?._id as string) && (
                <p className="plaintext">Already in board</p>
              )} */}
              {isAdminOrLeader(currentUser?._id as string) &&
                isMemberInBoard(member?.user?._id as string) && (
                  <ActionButtonsGroup>
                    {shouldShowAssignButton(member?.user?._id as string) && (
                      <Tooltip title="Assign to be admin">
                        <IconButton
                          color="info"
                          onClick={() =>
                            assignMember(member?.user?._id as string)
                          }
                        >
                          <RiUserStarLine />
                        </IconButton>
                      </Tooltip>
                    )}
                    {shouldShowRevokeButton(member?.user?._id as string) && (
                      <Tooltip title="Revoke admin role">
                        <IconButton
                          color="error"
                          onClick={() =>
                            revokeAdmin(member?.user?._id as string)
                          }
                        >
                          <RiUserUnfollowLine />
                        </IconButton>
                      </Tooltip>
                    )}
                    {currentUser?._id !== member?.user?._id && (
                      <Tooltip title="Delete from board">
                        <IconButton color="error">
                          <RiCloseLine />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ActionButtonsGroup>
                )}
            </MemberItem>
          ))}
          {(!cleanedWSMembers || cleanedWSMembers?.length === 0) && (
            <p className="placeholder">There is no one here</p>
          )}
        </Members>
        <Footer>
          <div className="total">
            Total{' '}
            <big>
              <b>{chosenList.length}</b>
            </big>{' '}
            member(s)
          </div>
          <div className="action-group">
            <Button variant="text" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={chosenList.length <= 0}
              onClick={handleAddMemberToBoard}
            >
              Add
            </Button>
          </div>
        </Footer>
      </Modal>
    </Container>
  )
}
