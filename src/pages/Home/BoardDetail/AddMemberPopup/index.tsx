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
  IconButton
} from '@mui/material'
import { RiCloseFill } from 'react-icons/ri'

// components
import TextInput from '~/components/TextInput'
import {
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
import { addMember, getAllMemberInBoard } from '~/services/boardService'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'

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
        const res = await addMember({
          boardId: popup.data.currentBoardID as string,
          memberIds: chosenList.map((mem) => mem._id)
        })
        if (res && res.data) {
          dispatch(setShouldRefreshBoardDetail(true))
          setChosenList([])
          setSearchString('')
          // dispatch(setShouldRefreshMemberInBoard(true))
          await getMemberInBoard()
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

  // wait for a while to trigger the callback
  // const typewatch = (function () {
  //   let timer = 0
  //   return function (callback: () => void, ms: number) {
  //     clearTimeout(timer)
  //     timer = setTimeout(callback, ms) as unknown as number
  //   }
  // })()

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
            <p className="note">State</p>
          </MemberSectionTitle>

          {cleanedWSMembers?.map((member) => (
            <MemberItem key={member?.user?._id}>
              <Checkbox
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
                  <div className={clsx('role', member?.role)}>
                    {member?.role === 'superAdmin' && 'Workspace lead'}
                    {member?.role === 'admin' && 'Workspace Admin'}
                    {!member?.role && 'Workspace member'}
                  </div>
                </div>
                <div className="email">{member?.user?.email}</div>
              </div>
              {isMemberInBoard(member?.user?._id as string) && (
                <p className="plaintext">Already in board</p>
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
