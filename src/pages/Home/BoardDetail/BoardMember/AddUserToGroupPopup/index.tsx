/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo, ChangeEvent } from 'react'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDebounceCallback } from 'usehooks-ts'

// component libraries
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton
} from '@mui/material'
import { RiCloseFill } from 'react-icons/ri'

// components
import TextInput from '~/components/TextInput'
import {
  ActionButtonsGroup,
  Body,
  Container,
  Footer,
  Header,
  MemberSectionTitle,
  Members,
  Modal,
  Placeholder,
  UserList,
  UserTypeTitle
} from './style'

// services
import { StoreType } from '~/redux'
import WindowDialog from '~/components/dialog/WIndowDialog'
import UserItem from './UserItem'
import SearchBox from '~/components/SearchBox'
import IProps from './IProps'

const ROLES = {
  member: 'member',
  leader: 'boardLead',
  admin: 'boardAdmin'
}

export default function AddUserToGroupPopup({ open, onClose }: IProps) {
  const [chosenList, setChosenList] = useState<string[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [startSearch, setStartSearch] = useState<boolean>(false)

  const handleClose = () => {
    onClose()
  }
  const handleChooseAll = () => {}
  const handleAddUserToGroup = () => {}
  const availableToChooseList = () => {
    return []
  }
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)

    // start search process
    setStartSearch(true)
  }

  const debounced = useDebounceCallback(handleChangeSearch, 500)

  return (
    <WindowDialog
      onClose={onClose}
      open={open}
      title={
        <div className="title">
          <p>Add users to group</p>
        </div>
      }>
      <Modal onClick={(e) => e.stopPropagation()}>
        <SearchBox
          label=""
          size="small"
          placeHolder="Search by name or email..."
          value={searchString}
          sx={{ height: '40px' }}
          onChange={debounced}
        />
        <Body>
          <Members>
            <UserTypeTitle>Unassigned users (viewers)</UserTypeTitle>
            <MemberSectionTitle>
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
                      availableToChooseList()?.length === chosenList.length &&
                      chosenList.length !== 0
                    }
                    onChange={handleChooseAll}
                    size="small"
                  />
                }
                label="Select all"
              />
              {/* <p className="note">Board actions</p> */}
            </MemberSectionTitle>

            {/* {!startSearch &&
            cleanedWSMembers?.map((member) => (
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
                    <div
                      className={clsx(
                        'role',
                        roleInBoard(member?.user?._id as string)
                      )}>
                      {roleInBoard(member?.user?._id as string) ===
                        ROLES.leader && 'Lead'}
                      {roleInBoard(member?.user?._id as string) ===
                        ROLES.admin && 'Admin'}
                      {roleInBoard(member?.user?._id as string) ===
                        ROLES.member && 'Member'}
                    </div>
                  </div>
                  <div className="email">{member?.user?.email}</div>
                </div>
              </MemberItem>
            ))}*/}

            {!startSearch && <Placeholder>There is no one here</Placeholder>}

            {startSearch && (
              <Placeholder>
                <CircularProgress size={30} />
              </Placeholder>
            )}

            <UserList>
              <UserItem
                checked
                onChange={(id, a) => {}}
                user={{
                  _id: '1',
                  email: 'sagdá@jdvbídfj',
                  firstName: 'John',
                  lastName: 'Doe',
                  avatar: ''
                }}
              />
              <UserItem
                checked
                onChange={(id, a) => {}}
                user={{
                  _id: '2',
                  email: 'acasd@asd.com',
                  firstName: 'Giang',
                  lastName: 'Hoang',
                  avatar: ''
                }}
              />
            </UserList>
          </Members>
          <Members>
            <UserTypeTitle>Other groups</UserTypeTitle>
            <MemberSectionTitle>
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
                      availableToChooseList()?.length === chosenList.length &&
                      chosenList.length !== 0
                    }
                    onChange={handleChooseAll}
                    size="small"
                  />
                }
                label="Select all"
              />
              {/* <p className="note">Board actions</p> */}
            </MemberSectionTitle>

            <UserList>
              {!startSearch && <Placeholder>There is no one here</Placeholder>}

              {startSearch && (
                <Placeholder>
                  <CircularProgress size={30} />
                </Placeholder>
              )}
              {Array.from({ length: 10 }).map((_, index) => (
                <UserItem
                  checked
                  onChange={(id, a) => {}}
                  user={{
                    _id: '1',
                    email: 'sagdá@jdvbídfj',
                    firstName: 'John',
                    lastName: 'Doe',
                    avatar: ''
                  }}
                  isUnassigned={true}
                />
              ))}
            </UserList>
          </Members>
        </Body>
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
