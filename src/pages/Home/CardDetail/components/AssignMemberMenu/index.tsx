import * as React from 'react'

// component libraries
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

// component props
import IProps, { ITempUser } from './IProps'
import { Button, IconButton, Typography } from '@mui/material'
import { RiAddLine, RiCheckLine, RiCloseLine } from 'react-icons/ri'
import {
  Avatar,
  IconCheck,
  Info,
  ItemContainer,
  Layer,
  MenuHeader,
  UserItem
} from './style'
import { getAllMemberInBoard } from '~/services/boardService'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Loading } from '../../style'

export default function AssignMemberMenu({
  currentMembers,
  boardId,
  onChoose
}: IProps) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [allMemberInBoard, setAllMemberInBoard] = React.useState<ITempUser[]>()
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const mixMemberList = () => {
    if (allMemberInBoard) {
      const mixMemberList = allMemberInBoard.map((member) => ({
        ...member,
        isMemberOfCard: false
      }))

      mixMemberList.forEach((member) => {
        if (currentMembers.find((m) => m._id === member._id)) {
          member.isMemberOfCard = true
        }
      })

      return mixMemberList
    }
    return [] as (ITempUser & { isMemberOfCard: boolean })[]
  }

  const getMembers = async () => {
    try {
      const res = await getAllMemberInBoard({ id: boardId })
      if (res && res?.data) {
        const computedList = res.data.members.map((member) => ({
          fullName: `${member.firstName} ${member.lastName}`,
          _id: member._id,
          avatar: member.avatar
        }))

        computedList.push(
          ...res.data.oweners.map((member) => ({
            fullName: `${member.user.firstName} ${member.user.lastName}`,
            _id: member.user._id,
            avatar: member.user.avatar
          }))
        )

        setAllMemberInBoard(computedList)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const handleAddMember = async (memberId: string) => {
    setIsUpdating(true)
    await onChoose(memberId)
    setIsUpdating(false)
  }

  React.useEffect(() => {
    getMembers()
  }, [])

  return (
    <div>
      <Layer className={open ? 'open' : ''} onClick={handleClose} />
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="glass-effect"
        sx={{
          height: '22px',
          width: '22px',
          padding: '2px',
          minWidth: '0',
          fontSize: '18px',
          bgcolor: `rgba(var(--mui-palette-blue-mainChannel)/ 0.2)`,
          color: (theme) => theme.palette.blue.main
        }}
      >
        <RiAddLine />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{
          position: 'relative',
          zIndex: 100
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'right bottom'
            }}
          >
            <Paper
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 1px var(--mui-palette-gray2-main)'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <>
                  <MenuHeader>
                    <Typography fontWeight={700}>
                      Assignee {isUpdating && <Loading />}
                    </Typography>
                    <IconButton size="small" onClick={(e) => handleClose(e)}>
                      <RiCloseLine />
                    </IconButton>
                  </MenuHeader>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{
                      borderRadius: '8px',
                      maxHeight: '300px',
                      overflowY: 'auto'
                    }}
                  >
                    {mixMemberList().map((member) => (
                      <MenuItem
                        key={member._id}
                        // onClick={(e) => {
                        //   handleClose(e)
                        // }}
                        sx={{
                          '&:hover': {
                            bgcolor: (theme) => theme.palette.white.main
                          }
                        }}
                      >
                        <ItemContainer>
                          <UserItem>
                            <Avatar>
                              <img src={member.avatar} alt="" />
                            </Avatar>
                            <Info>
                              <p className="name">{`${member.fullName}`}</p>
                            </Info>
                          </UserItem>
                          {member.isMemberOfCard ? (
                            <IconCheck>
                              <RiCheckLine />
                            </IconCheck>
                          ) : (
                            <Button onClick={() => handleAddMember(member._id)}>
                              {' '}
                              Add
                            </Button>
                          )}
                        </ItemContainer>
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
