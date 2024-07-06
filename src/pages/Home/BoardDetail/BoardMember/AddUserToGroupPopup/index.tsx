/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { useState, useMemo, ChangeEvent } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { cloneDeep } from 'lodash'
// component libraries
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

// components
import {
  Body,
  Controls,
  Footer,
  MemberSectionTitle,
  Members,
  Modal,
  Placeholder,
  UserList,
  UserTypeTitle
} from './style'
import WindowDialog from '~/components/dialog/WIndowDialog'

// services
import { StoreType } from '~/redux'
import UserItem from './UserItem'
import SearchBox from '~/components/SearchBox'
import IProps from './IProps'
import { IBoardPermission, IMemberInBoard } from '~/services/types'
import { mapData } from '~/utils/helper'
import Empty from '~/components/Empty'

const SEARCH_TYPES = {
  USER: 1,
  GROUP: 2
}

// type of other group
interface IOtherGroup {
  _id: string
  name: string
  memberIds: string[]
  members: IMemberInBoard[] | undefined
  isAdmin?: boolean
}

export default function AddUserToGroupPopup({
  open,
  onClose,
  permission,
  onAdd
}: IProps) {
  const [chosenList, setChosenList] = useState<string[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [startSearch, setStartSearch] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<number>(SEARCH_TYPES.USER)

  const allMembers = useSelector((state: StoreType) => state.board.members)
  const currentBoardPermission = useSelector(
    (state: StoreType) => state.permission.currentBoardPermission
  )

  const isOwner = (id: string) => allMembers?.oweners[0]._id === id

  // close the popup
  const handleClose = () => {
    // reset chosen list
    setChosenList([])

    // reset search string
    setSearchString('')

    // reset search type
    setSearchType(SEARCH_TYPES.USER)

    // call the onClose function
    onClose()
  }

  // click add button
  const handleAddUserToGroup = () => {
    onAdd(chosenList)
    handleClose()
  }

  // search start
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)

    // start search process
    setStartSearch(true)

    setTimeout(() => {
      setStartSearch(false)
    }, 500)
  }

  const debounced = useDebounceCallback(handleChangeSearch, 500)

  // filter data by search string
  const filterDataBySearchString = (data: IMemberInBoard[] | IOtherGroup[]) => {
    let result: IMemberInBoard[] | IOtherGroup[] = []
    // no search string => return all data
    if (searchString === '' || data.length === 0) return data

    // search by user
    if (searchType === SEARCH_TYPES.USER) {
      // data is unassigned members
      if ('email' in data[0]) {
        result = (data as IMemberInBoard[]).filter((member) => {
          return (
            member.firstName
              .toLowerCase()
              .includes(searchString.toLowerCase()) ||
            member.lastName
              .toLowerCase()
              .includes(searchString.toLowerCase()) ||
            member.email.toLowerCase().includes(searchString.toLowerCase())
          )
        })
      }
      // data is other group list
      else {
        result = (data as IOtherGroup[]).map((group) => {
          group.members = group.members?.filter((member) => {
            return (
              member.firstName
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
              member.lastName
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
              member.email.toLowerCase().includes(searchString.toLowerCase())
            )
          })
          return group
        })
      }
    }
    // search by group
    else {
      // data is unassigned members
      if ('email' in data[0]) {
        result = data
      } else {
        result = (data as IOtherGroup[]).filter((group) => {
          return group.name.toLowerCase().includes(searchString.toLowerCase())
        })
      }
    }

    // return the result
    return cloneDeep(result)
  }

  // Members that are not assigned to any group
  const unAssignedMembers = useMemo(() => {
    if (allMembers && permission) {
      const result = [
        ...cloneDeep(allMembers.members),
        ...cloneDeep(allMembers.oweners)
      ]
      // find the viewer permission => get memberIds
      const viewerPermission = currentBoardPermission?.find((item) => {
        return item.isViewer
      })
      if (!viewerPermission) return []

      return filterDataBySearchString(
        mapData(result, '_id', viewerPermission.memberIds)
      ) as IMemberInBoard[]
    }
    return []
  }, [allMembers, permission, searchString])

  const ortherGroupList = useMemo(() => {
    const computedList: IOtherGroup[] = []
    if (!currentBoardPermission || !allMembers) return []

    currentBoardPermission.forEach((per: IBoardPermission) => {
      // do not show viewer permission, because it is already shown in unAssignedMembers
      if (!per.isViewer || (per.isAdmin && per._id === permission._id)) {
        computedList.push({
          _id: per._id,
          name: per.name,
          memberIds: per.memberIds,
          members: [] as unknown as IMemberInBoard[] | undefined,
          isAdmin: per.isAdmin
        })
      }
    })

    const result = computedList.map((group) => {
      group.members = [
        ...allMembers.members.filter((member) =>
          group.memberIds.includes(member._id)
        ),
        ...allMembers.oweners.filter((member) =>
          group.memberIds.includes(member._id)
        )
      ]
      // clear duplicate
      group.members = group.members.filter(
        (member, index, self) =>
          index === self.findIndex((t) => t._id === member._id)
      )
      group.memberIds = group.members.map((member) => member._id)

      return group
    })

    return filterDataBySearchString(result) as IOtherGroup[]
  }, [currentBoardPermission, allMembers, permission._id, searchString])

  // disable: if the member is already in current permission
  const isDisableMember = (memberId: string) => {
    return permission.memberIds.includes(memberId)
  }

  // disable: if all the memebers in the group are already in the chosen list | empty list
  const isDisabledGroup = (groupId: string, isUnassignGroup: boolean) => {
    // if the group is not unassigned group
    if (!isUnassignGroup) {
      const group = ortherGroupList.find((item) => item._id === groupId)

      if (group?.isAdmin) {
        return isDisableAllAdmin(group)
      }

      // group not found => disable
      if (!group) return false

      // list of members empty => disable
      if (group.memberIds.length === 0) return true

      return group.memberIds.every((id) => isDisableMember(id))
    }
    // if the group is unassigned group
    else {
      return unAssignedMembers.every((member) => isDisableMember(member._id))
    }
  }

  // if the member is already in current permission or in the chosen list
  const isChecked = (memberId: string) => {
    return (
      chosenList.includes(memberId) || permission.memberIds.includes(memberId)
    )
  }

  // handle choose one user
  const onChooseOne = (id: string) => {
    if (chosenList.includes(id)) {
      setChosenList(chosenList.filter((item) => item !== id))
    } else {
      setChosenList([...chosenList, id])
    }
  }

  // handle choose all users in one group
  const onChooseAllInOneGroup = (groupId: string, isUnassignGroup: boolean) => {
    if (isUnassignGroup) {
      const isAllChosen = unAssignedMembers.every((member) =>
        chosenList.includes(member._id)
      )
      // if all chosen, remove all
      if (isAllChosen) {
        setChosenList((prev) =>
          prev.filter(
            (item) =>
              !unAssignedMembers.map((member) => member._id).includes(item)
          )
        )
      } else {
        setChosenList(unAssignedMembers.map((member) => member._id))
      }
      return
    }
    const group = ortherGroupList.find((item) => item._id === groupId)
    if (!group) return
    // temp id list for group members
    group.memberIds = [...(group.members?.map((member) => member._id) || [])]
    const isAllChosen = isCheckAll(groupId)
    if (isAllChosen) {
      setChosenList((prev) =>
        prev.filter((item) => !group.memberIds.includes(item) && !isOwner(item))
      )
    } else {
      const adddedList = group.memberIds.filter((item) => !isOwner(item))
      setChosenList((prev) => [...prev, ...adddedList])
    }
  }

  // check if all users in one group are chosen
  const isCheckAll = (groupId: string, isUnassignGroup?: boolean) => {
    const group = ortherGroupList.find((item) => item._id === groupId)
    if (!group) {
      if (!isUnassignGroup) return false
      return unAssignedMembers.length === 0
        ? false
        : unAssignedMembers.every((member) => chosenList.includes(member._id))
    }
    if (group.memberIds.length === 0) return false

    // remove owner from chosen list
    const userListWithoutOwner = group.memberIds.filter(
      (item) => !isOwner(item)
    )

    // check if should check all
    const checkFlg =
      userListWithoutOwner.every((id) => chosenList.includes(id)) &&
      userListWithoutOwner.length > 0
    return checkFlg
  }

  // check if admin group is have only owner user
  const isDisableAllAdmin = (adminGroup: IOtherGroup) => {
    if (!adminGroup) return false
    return adminGroup.memberIds.length === 1 && isOwner(adminGroup.memberIds[0])
  }

  return (
    <WindowDialog
      onClose={handleClose}
      open={open}
      title={
        <div className="title">
          <p>Add users to group</p>
        </div>
      }>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Controls>
          {/* SEARCH TYPES SELECT BOX */}
          <FormControl sx={{ height: 40, width: 120 }}>
            <InputLabel id="search-type-label">Search by</InputLabel>
            <Select
              sx={{ height: 40 }}
              variant="outlined"
              value={searchType}
              label="Search by"
              labelId="search-type-label"
              onChange={(e) =>
                setSearchType(parseInt(e.target.value as string))
              }>
              <MenuItem dense value={SEARCH_TYPES.USER}>
                User
              </MenuItem>
              <MenuItem dense value={SEARCH_TYPES.GROUP}>
                Group
              </MenuItem>
            </Select>
          </FormControl>

          {/* SEARCH BOX */}
          <SearchBox
            label=""
            size="small"
            placeHolder="Search..."
            value={searchString}
            sx={{ height: '40px' }}
            onChange={debounced}
          />
        </Controls>
        <Body className={clsx(startSearch && 'hidden')}>
          <Members>
            {/* TODO: add a label [current] for the permission the same with permission on popup */}
            <UserTypeTitle>Viewers (unassigned users)</UserTypeTitle>
            <MemberSectionTitle>
              {unAssignedMembers.length !== 0 && (
                <FormControlLabel
                  sx={{
                    marginLeft: '0',
                    '& .MuiTypography-root': {
                      display: 'block',
                      fontSize: '14px',
                      color: (theme) => theme.palette.gray.main,
                      marginLeft: '12px'
                    }
                  }}
                  control={
                    <Checkbox
                      checked={
                        isCheckAll('', true) || isDisabledGroup('', true)
                      }
                      onChange={() => onChooseAllInOneGroup('', true)}
                      size="small"
                      disabled={isDisabledGroup('', true)}
                    />
                  }
                  label="Select all"
                />
              )}
              {/* <p className="note">Board actions</p> */}
            </MemberSectionTitle>

            {!startSearch && unAssignedMembers.length === 0 && (
              <Empty description="No result!" isFullWidth pY={20} />
            )}

            <UserList>
              {!startSearch &&
                unAssignedMembers.map((member) => (
                  <UserItem
                    checked={isChecked(member._id)}
                    onChange={(id) => {
                      onChooseOne(id)
                    }}
                    user={member}
                    disabled={
                      isDisableMember(member._id) || isOwner(member._id)
                    }
                    isOwner={isOwner(member._id)}
                  />
                ))}
            </UserList>
          </Members>

          {/* OTHER GROUPS */}
          {ortherGroupList.map((group) => (
            <Members key={group.name}>
              <UserTypeTitle>{group.name}</UserTypeTitle>
              <MemberSectionTitle>
                {group.members?.length !== 0 && (
                  <FormControlLabel
                    sx={{
                      marginLeft: '0',
                      '& .MuiTypography-root': {
                        display: 'block',
                        fontSize: '14px',
                        color: (theme) => theme.palette.gray.main,
                        marginLeft: '12px'
                      }
                    }}
                    control={
                      <Checkbox
                        checked={isCheckAll(group._id)}
                        disabled={
                          permission._id === group._id ||
                          isDisabledGroup(group._id, false)
                        }
                        onChange={() => onChooseAllInOneGroup(group._id, false)}
                        size="small"
                      />
                    }
                    label="Select all"
                  />
                )}
                {/* <p className="note">Board actions</p> */}
              </MemberSectionTitle>

              <UserList>
                {!startSearch && group.members?.length === 0 && (
                  <Empty description="No result!" isFullWidth pY={20} />
                )}

                {!startSearch &&
                  group.members?.map((user, index) => (
                    <UserItem
                      checked={isChecked(user._id)}
                      onChange={() => onChooseOne(user._id)}
                      user={user}
                      isUnassigned={true}
                      disabled={isDisableMember(user._id) || isOwner(user._id)}
                      isOwner={isOwner(user._id)}
                    />
                  ))}
              </UserList>
            </Members>
          ))}
        </Body>
        {startSearch && (
          <Placeholder className={clsx(startSearch && 'full-height mt-5')}>
            <CircularProgress size={30} />
          </Placeholder>
        )}
        <Footer>
          <div className="total">
            Total{' '}
            <big>
              <b>{chosenList.length}</b>
            </big>{' '}
            user(s)
          </div>
          <div className="action-group">
            <Button variant="text" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={chosenList.length <= 0}
              onClick={handleAddUserToGroup}>
              Add
            </Button>
          </div>
        </Footer>
      </Modal>
    </WindowDialog>
  )
}
