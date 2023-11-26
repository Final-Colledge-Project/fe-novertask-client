import { useParams } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

// component libraries
import { Avatar, Button, IconButton } from '@mui/material'
import { RiFilter3Fill, RiMore2Fill, RiUserAddLine } from 'react-icons/ri'

// components
import {
  BoardDetailContainer,
  Body,
  Header,
  MemberAvatarGroup,
  Members,
  TitleHeader,
  TypeHeader,
  TypeItem,
  TypeMenu
} from './styles'
import SearchBox from '~/components/SearchBox'
import Column from './Column'

// services

const BoardDetail = () => {
  const { id } = useParams()
  const [viewType, setViewType] = useState('Kanban')

  const viewList = ['Kanban', 'List']
  return (
    <BoardDetailContainer>
      <Header $img="/img/item-cover-1sd.jpg" />
      <TitleHeader>
        <div className="left-block">
          <p className="title">{id}</p>
          <p className="description">Description o day ne ma</p>
        </div>
        <div className="right-block">
          <SearchBox label="" sx={{ height: '35px' }} />
          <IconButton>
            <RiMore2Fill />
          </IconButton>
        </div>
      </TitleHeader>
      <TypeHeader>
        <TypeMenu>
          {viewList.map((type) => (
            <TypeItem
              className={clsx(viewType === type && 'index')}
              onClick={() => setViewType(type)}
            >
              {type}
            </TypeItem>
          ))}
        </TypeMenu>
        <Members>
          <Button color="primary" variant="text" startIcon={<RiFilter3Fill />}>
            Filter
          </Button>
          <MemberAvatarGroup>
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
          </MemberAvatarGroup>
          <Button
            color="primary"
            variant="contained"
            startIcon={<RiUserAddLine />}
          >
            Invite
          </Button>
        </Members>
      </TypeHeader>
      <Body>
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column></Column>
      </Body>
    </BoardDetailContainer>
  )
}

export default BoardDetail
