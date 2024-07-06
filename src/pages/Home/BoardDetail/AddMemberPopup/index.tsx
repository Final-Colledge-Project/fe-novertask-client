/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo, ChangeEvent } from 'react'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'

// component libraries
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip
} from '@mui/material'
import { RiCloseFill, RiInformationLine } from 'react-icons/ri'

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
  Modal,
  Placeholder,
  Role
} from './styles'

// services
import { StoreType } from '~/redux'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'
import { IAllMemberInBoard, IBoardMembers } from '~/services/types'
import { getMembers } from '~/services/workspaceService'
import {
  addMember,
  assignMemberToAdmin,
  deleteMember,
  getAllMemberInBoard,
  revokeAdmin as revokeAdminInBoard
} from '~/services/boardService'
import {
  refreshMembers,
  setMembers,
  setShouldRefreshBoardDetail
} from '~/redux/boardSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import socketIoClient from 'socket.io-client'
import { useDebounceCallback } from 'usehooks-ts'
import { cloneDeep } from 'lodash'
import usePermission from '~/hooks/usePermission'
import Empty from '~/components/Empty'

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
  const [chosenList, setChosenList] = useState<
    { _id: string; name: string; role: string }[]
  >([])
  const currentBoardPermission = useSelector(
    (store: StoreType) => store.permission.currentBoardPermission
  )
  const userPermissionOnBoard = usePermission()
  const isAdmin = () => userPermissionOnBoard?.isAdmin

  const [roleList, setRoleList] = useState<string[]>([])
  const [startSearch, setStartSearch] = useState<boolean>(false)

  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const memberData = useSelector((state: StoreType) => state.board.members)
  const currentPermission = useSelector(
    (state: StoreType) => state.permission.currentBoardPermission
  )
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
      // in case member data is already fetched
      if (memberData) {
        setBoardMembers(memberData)
        return
      }
      const res = await getAllMemberInBoard({
        id: popup.data.currentBoardID as string
      })
      if (res && res?.data) {
        setBoardMembers(res.data)
        dispatch(refreshMembers())
        dispatch(setMembers(res.data))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const isMemberInBoard = (id: string) => {
    if (!id || !boardMembers) return
    return (
      !!boardMembers?.oweners?.find((user) => user._id === id) ||
      !!boardMembers?.members?.find((user) => user._id === id)
    )
  }

  const cleanedWSMembers = useMemo(() => {
    if (WSMembers) {
      const { workspaceAdmins, workspaceMembers } = WSMembers as IBoardMembers
      const mergedList = [...workspaceAdmins]

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
            .map((mem) => ({ ...mem }))
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

      return filteredList.filter(
        (user) => !isMemberInBoard(user.user?._id as string)
      )
    }
  }, [WSMembers, searchString, boardMembers])

  const roleInBoard = (id: string) => {
    if (!id || !boardMembers) return
    // if (!foundUser) return ROLES.member
    const foundGroup = currentPermission?.find((group) => {
      return group.memberIds.includes(id)
    })
    if (foundGroup) {
      return { name: foundGroup.name, color: foundGroup.color }
    }
    // return empty value if not found
    return { name: '', color: '' }
  }

  const checkIsChosen = (id: string) => {
    if (!id || chosenList.length === 0) return false
    return !!chosenList.find((item) => item._id === id)
  }

  const handleAddMemberToBoard = async () => {
    if (popup.data && chosenList?.length > 0)
      try {
        dispatch(showLoading())
        const memberIds = chosenList.map((mem) => mem._id)
        const data = chosenList.map((item, index) => ({
          memberId: item._id,
          permissionId: item.role
        }))
        const res = await addMember({
          boardId: popup.data.currentBoardID as string,
          members: data
        })
        if (res && res.data) {
          dispatch(setShouldRefreshBoardDetail(true))
          setChosenList([])
          setSearchString('')
          // dispatch(setShouldRefreshMemberInBoard(true))
          await getMemberInBoard()
          handleSocket(memberIds)
          enqueueSnackbar('Add member successfully', { variant: 'success' })
          handleClose()
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

  const findUserInviteRole = (userId: string) => {
    if (userId && cleanedWSMembers) {
      const foundUserIndex = cleanedWSMembers.findIndex(
        (user) => user.user?._id === userId
      )
      if (foundUserIndex !== -1) return roleList[foundUserIndex]
    }
    return undefined
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
            name: mem?.user?.fullName as string,
            role: findUserInviteRole(mem.user?._id as string) || ''
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
      } else
        return [...prev, { _id: id, name, role: findUserInviteRole(id) || '' }]
    })
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)

    setTimeout(() => {
      setStartSearch(false)
    }, 500)
  }

  const debouncedSearch = useDebounceCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleSearch(event)
      setStartSearch(true)
    },
    500
  )

  // index: index of updated user
  // userId: id of updated user
  // value: new role id
  const setRole = (index: number, userId: string, value: string) => {
    setRoleList((prev) => {
      const newRoleList = cloneDeep(prev)
      newRoleList[index] = value
      return newRoleList
    })
    setChosenList((prev) => {
      const foundUserIndex = prev.findIndex((user) => user._id === userId)
      if (foundUserIndex !== -1) {
        prev[foundUserIndex].role = value
      }
      return cloneDeep(prev)
    })
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

  // init role data
  useEffect(() => {
    if (cleanedWSMembers && currentBoardPermission) {
      const defaultValue = currentBoardPermission?.find(
        (role) => role.isViewer
      )?._id
      if (defaultValue) {
        setRoleList([...cleanedWSMembers.map(() => defaultValue)])
      }
    }
  }, [cleanedWSMembers, popup.show, currentBoardPermission])

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
          size="small"
          sx={{ height: 40 }}
          placeHolder="Search by name or email..."
          value={searchString}
          onChange={debouncedSearch}
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
            <div className="note">Add with role</div>
          </MemberSectionTitle>

          {!startSearch &&
            cleanedWSMembers?.map((member, index) => (
              <MemberItem key={member?.user?._id}>
                <Checkbox
                  style={{
                    opacity: !isMemberInBoard(member?.user?._id as string)
                      ? '1'
                      : ''
                  }}
                  checked={
                    checkIsChosen(member?.user?._id as string) ||
                    isMemberInBoard(member?.user?._id as string)
                  }
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
                    <Role
                      $color={
                        roleInBoard(member?.user?._id as string)
                          ?.color as string
                      }>
                      {roleInBoard(member?.user?._id as string)?.name}
                    </Role>
                  </div>
                  <div className="email">{member?.user?.email}</div>
                </div>

                {/* ROLE SELECT BOX: ACTIVE */}
                {isAdmin() && roleList && roleList.length > 0 && (
                  <Select
                    sx={{ height: 35 }}
                    value={roleList[index]}
                    onChange={(event) =>
                      setRole(
                        index,
                        member.user?._id as string,
                        event.target.value
                      )
                    }>
                    {currentBoardPermission?.map((role) => (
                      <MenuItem key={role._id} value={role._id} dense>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                {/* ROLE SELECT BOX */}
                {!isAdmin() && roleList && roleList.length > 0 && (
                  <Tooltip title="Only admin can choose invited role">
                    <span>
                      <Select
                        sx={{ height: 35 }}
                        value={roleList[index]}
                        disabled={true}
                        onChange={(event) =>
                          setRole(
                            index,
                            member.user?._id as string,
                            event.target.value
                          )
                        }>
                        {currentBoardPermission?.map((role) => (
                          <MenuItem key={role._id} value={role._id} dense>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </span>
                  </Tooltip>
                )}
              </MemberItem>
            ))}
          {(!cleanedWSMembers || cleanedWSMembers?.length === 0) &&
            !startSearch && (
              <Empty description="No result matched!" isFullWidth pY={50} />
            )}

          {startSearch && (
            <Placeholder>
              <CircularProgress size={30} />
            </Placeholder>
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
              onClick={handleAddMemberToBoard}>
              Add
            </Button>
          </div>
        </Footer>
      </Modal>
    </Container>
  )
}
