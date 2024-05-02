/* eslint-disable indent */
import LineMemberItem from '../../components/LineMemberItem'
import Header from './Header'
import {
  BoardMenuContainer,
  Body,
  MemberListTypeContainer,
  Placeholder
} from './style'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import AddMemberPopup from '../AddMemberPopup'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupAddMemberToBoard } from '~/redux/popupSlice'
import { IMainProps } from './IProps'

export default function BoardMember({ members, leaderId, board }: IMainProps) {
  const dispatch = useDispatch<StoreDispatchType>()

  // 0: all, 1: lead, 2: admin, 3: member
  const [currentRole, setCurrentRole] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [startSearch, setStartSearch] = useState<boolean>(false)

  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  // #region group members by role
  const adminList = () => {
    if (!members?.oweners || members.oweners.length === 0) return []

    return members?.oweners
      .filter((member) => member.role === 'boardAdmin')
      .map((member) => ({
        ...member,
        user: {
          ...member.user,
          fullName: `${member.user.firstName} ${member.user.lastName}`
        }
      }))
  }

  const owner = () => {
    const bareOwnerData = members?.oweners.find(
      (member) => member.role === 'boardLead'
    )

    if (!bareOwnerData) return null

    return {
      ...bareOwnerData,
      user: {
        ...bareOwnerData?.user,
        fullName: `${bareOwnerData?.user.firstName} ${bareOwnerData?.user.lastName}`
      }
    }
  }

  const memberList = () => {
    if (!members?.members || members.members.length === 0) return []

    return members?.members.map((member) => ({
      role: 'member',
      user: {
        ...member,
        fullName: `${member.firstName} ${member.lastName}`
      }
    }))
  }

  const generateRenderList = () => {
    const list = []

    if (owner() === null) return []

    switch (currentRole) {
      case 0:
        list.push(owner())
        list.push(...adminList())
        list.push(...memberList())
        break
      case 1:
        list.push(owner())
        break
      case 2:
        list.push(...adminList())
        break
      case 3:
        list.push(...memberList())
        break
      default:
        list.push(owner())
        list.push(...adminList())
        list.push(...memberList())
    }
    return onSearch(list)
  }
  // #endregion

  const onRoleListChange = (newRole: number) => {
    setCurrentRole(newRole)
  }
  const onSearch = <T, >(list: Array<T>) => {
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
  const isUserAdminOrLead = () => {
    const flag = members?.oweners.findIndex(
      (user) =>
        user.user._id === currentUser?._id &&
        (user.role === 'boardAdmin' || user.role === 'boardLead')
    )
    return flag !== -1
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
        shouldShowAddMemberButton={isUserAdminOrLead()}
      />

      <Body>
        {/* View team member as list */}
        <MemberListTypeContainer>
          {generateRenderList()?.length !== 0 &&
            !startSearch &&
            generateRenderList()?.map((member) => (
              <LineMemberItem
                key={member?.user._id}
                superAdminId={leaderId as string}
                data={member as { role: 'member' | 'boardAdmin' | 'boardLead' }}
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
        {/* <Members>
            <MemberCountLabel>
              <RiUserLine />{' '}
              {(members?.members.length ?? 0) + (members?.oweners.length ?? 0)}
            </MemberCountLabel>
            {isUserLeadOrAdmin() && (
              <Button
                color="primary"
                size="small"
                variant="outlined"
                startIcon={<RiUserAddLine />}
                onClick={handleShowAddMemberPopup}
              >
                Add or edit member
              </Button>
            )}
          </Members> */}
      </Body>

      <AddMemberPopup />
    </BoardMenuContainer>
  )
}
