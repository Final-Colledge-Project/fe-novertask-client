/* eslint-disable indent */
import LineMemberItem from '../../components/LineMemberItem'
import Header from './Header'
import {
  BoardMenuContainer,
  Body,
  MemberListTypeContainer,
  Placeholder
} from './style'
import { useCallback, useState } from 'react'
import { CircularProgress } from '@mui/material'
import AddMemberPopup from '../AddMemberPopup'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'
import { IMainProps } from './IProps'
import {
  BOARD_MEMBER_VIEW_MODE,
  BOARD_VIEW_ALL_ROLE
} from '~/utils/constant/board'
import PermissionSetting from './PermissionSetting'
import { clearDuplicateByKey, mapData } from '~/utils/helper'
import { IMemberInBoard } from '~/services/types'
import usePermission from '~/hooks/usePermission'
import { deleteMember } from '~/services/boardService'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export default function BoardMember({ members, leaderId, board }: IMainProps) {
  const dispatch = useDispatch<StoreDispatchType>()

  const [currentRole, setCurrentRole] = useState<string>(BOARD_VIEW_ALL_ROLE)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [startSearch, setStartSearch] = useState<boolean>(false)
  // 0: see, 1: edit
  const [currentViewMode, setCurrentViewMode] = useState<number>(
    BOARD_MEMBER_VIEW_MODE.VIEW
  )
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const currentBoardPermission = useSelector(
    (state: StoreType) => state.permission.currentBoardPermission
  )
  const currentBoardMembers = useSelector(
    (state: StoreType) => state.board.members
  )
  const userPermission = usePermission()

  // #region group members by role
  const adminList = () => {
    if (!members?.oweners || members.oweners.length === 0) return []

    // 2024-05-26 update permission
    // return members?.oweners
    //   .filter((member) => member.role === 'boardAdmin')
    //   .map((member) => ({
    //     ...member,
    //     user: {
    //       ...member.user,
    //       fullName: `${member.user.firstName} ${member.user.lastName}`
    //     }
    //   }))
    // 2024-05-26 update permission
    return []
  }

  const owner = () => {
    const bareOwnerData = members?.oweners[0]

    if (!bareOwnerData) return null

    return {
      ...bareOwnerData,
      user: {
        ...bareOwnerData,
        fullName: `${bareOwnerData.firstName} ${bareOwnerData.lastName}`
      }
    }
  }

  // const memberList = () => {
  //   if (!members?.members || members.members.length === 0) return []

  //   return members?.members.map((member) => ({
  //     role: 'member',
  //     user: {
  //       ...member,
  //       fullName: `${member.firstName} ${member.lastName}`
  //     }
  //   }))
  // }

  const getMembersInGroup = (groupId: string) => {
    if (!currentBoardPermission || !currentBoardMembers) return []
    const group = currentBoardPermission.find(
      (permission) => permission._id === groupId
    )
    if (!group) return []
    else {
      const idList = group.memberIds
      const rawMemberList = mapData(currentBoardMembers.members, '_id', idList)
      rawMemberList.push(...mapData(currentBoardMembers.oweners, '_id', idList))
      return clearDuplicateByKey(rawMemberList, '_id').map(
        (member: IMemberInBoard) => ({
          role: group.name,
          user: {
            ...member,
            fullName: `${member.firstName} ${member.lastName}`
          },
          color: group.color
        })
      )
    }
  }

  // generate list of members to render
  const generateRenderList = useCallback(() => {
    const list = []

    if (!currentBoardMembers || !currentBoardPermission || owner() === null)
      return list

    if (currentRole === BOARD_VIEW_ALL_ROLE) {
      currentBoardPermission.forEach((permission) => {
        list.push(...getMembersInGroup(permission._id))
      })
    } else {
      list.push(...getMembersInGroup(currentRole))
    }

    return onSearchMember(list)
  }, [currentRole, members, searchTerm])
  // #endregion

  const onRoleListChange = (newRole: string) => {
    setCurrentRole(newRole)
  }
  const onSearchMember = <T,>(list: Array<T>) => {
    const filteredMembers = list.filter((member: T) => {
      if (member) {
        const fullNameMatch = (
          member as T & { user: { fullName: string } }
        ).user.fullName
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase())
        const emailMatch = (
          member as T & { user: { email: string } }
        ).user.email
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase())
        return fullNameMatch !== -1 || emailMatch !== -1
      } else {
        return false
      }
    })
    return filteredMembers
  }

  const isViewMode = () => {
    return currentViewMode === BOARD_MEMBER_VIEW_MODE.VIEW
  }

  const isPermissionSettingMode = () => {
    return currentViewMode === BOARD_MEMBER_VIEW_MODE.PERMISSION_SETTING
  }

  const setViewMode = (newMode: number) => {
    setCurrentViewMode(newMode)
  }

  const onSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)

    // end search process
    setTimeout(() => {
      setStartSearch(false)
    }, 500)
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

  /*
  Check if current user is admin or lead
    true: admin or lead
    false: member
  */
  // const isUserAdminOrLead = () => {
  //   const flag = members?.oweners.findIndex(
  //     (owner) => owner._id === currentUser?._id
  //   )
  //   return flag !== -1
  // }

  const deleteUserFromBoard = async (id: string) => {
    dispatch(showLoading())
    try {
      const res = await deleteMember({
        boardId: board?._id as string,
        memberId: id
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
        enqueueSnackbar('Delete member successfully', { variant: 'success' })
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <BoardMenuContainer>
      <Header
        onRoleChange={onRoleListChange}
        count={generateRenderList()?.length as number}
        searchTerm={searchTerm}
        setSearchTerm={onSearchTermChange}
        onStartSearch={setStartSearch}
        onOpenAddMemberPopup={handleShowAddMemberPopup}
        onModeChange={setViewMode}
        mode={currentViewMode}
      />

      <Body>
        {/* View team member as list */}
        {isViewMode() && (
          <MemberListTypeContainer>
            {generateRenderList()?.length !== 0 &&
              !startSearch &&
              generateRenderList()?.map((member) => (
                <LineMemberItem
                  key={member?.user._id}
                  superAdminId={leaderId as string}
                  data={member}
                  onDelete={deleteUserFromBoard}
                />
              ))}
            {generateRenderList()?.length === 0 && !startSearch && (
              <Placeholder>There is no one here</Placeholder>
            )}
            {startSearch && (
              <Placeholder>
                <CircularProgress size={30} />
              </Placeholder>
            )}
          </MemberListTypeContainer>
        )}
        {isPermissionSettingMode() && (
          <PermissionSetting
            searchKeyWord={searchTerm}
            startSearch={startSearch}
          />
        )}
      </Body>

      <AddMemberPopup />
    </BoardMenuContainer>
  )
}
