// component libraries
import { RiCloseLine } from 'react-icons/ri'
import { IconButton } from '@mui/material'

// components
import { BoardMenuContainer, MenuBody, MenuHeader } from './style'

// services
import { IBoard, IMemberInBoard } from '~/services/types'

import GeneralInfo from './GeneralInfo'
import MembersInfo from './MembersInfo'

export default function BoardMenu({
  board,
  onClose,
  shouldShow,
  owner
}: {
  board: IBoard
  onClose: () => void
  shouldShow: boolean
  owner: IMemberInBoard
}) {
  return (
    <BoardMenuContainer className={shouldShow ? '' : 'hide'}>
      <MenuHeader>
        <p className="title">Board menu</p>
        <IconButton onClick={onClose}>
          <RiCloseLine />
        </IconButton>
      </MenuHeader>
      <MenuBody>
        <GeneralInfo board={board} owner={owner} />
        <MembersInfo />
      </MenuBody>
    </BoardMenuContainer>
  )
}
