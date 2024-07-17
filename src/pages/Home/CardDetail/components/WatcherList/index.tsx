import {
  Layer,
  MenuBody,
  MenuGeneralContainer,
  MenuHeader,
  Watcher,
  WatcherItem
} from './style'
import { RiCloseLine } from 'react-icons/ri'

// component libraries
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { RiEyeLine } from 'react-icons/ri'
import { useRef, useState } from 'react'
import { Avatar, Button, IconButton, MenuItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import Empty from '~/components/Empty'

export default function WatcherList({ watcherIds }: { watcherIds: string[] }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const boardMembers = useSelector((state: StoreType) => state.board.members)

  const watcherList = () => {
    if (boardMembers?.oweners && boardMembers?.members) {
      const rawList = [...boardMembers.oweners, ...boardMembers.members]
      return rawList
        .filter((member) => watcherIds.includes(member._id))
        .map((user) => ({
          avatar: user.avatar,
          fullName: `${user.firstName} ${user.lastName}`,
          _id: user._id
        }))
    }
    return []
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

  return (
    <div>
      <Layer className={open ? 'open' : ''} onClick={handleClose} />
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="glass-effect"
        endIcon={<RiEyeLine />}
        size="small">
        {watcherIds.length}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="top-end"
        transition
        disablePortal
        sx={{
          position: 'relative',
          zIndex: 100
        }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}>
            <Paper
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 1px var(--mui-palette-gray2-main)'
              }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuGeneralContainer>
                  <MenuHeader>
                    <Typography>Watchers</Typography>
                    <IconButton size="small" onClick={handleClose}>
                      <RiCloseLine />
                    </IconButton>
                  </MenuHeader>
                  <MenuBody>
                    {watcherList().map((watcher) => (
                      <MenuItem
                        key={watcher._id}
                        disableTouchRipple
                        dense
                        sx={{ cursor: 'default', width: '100%' }}>
                        <WatcherItem>
                          <Avatar
                            src={watcher.avatar}
                            sx={{ width: '32px', height: '32px' }}
                          />
                          {watcher.fullName}
                        </WatcherItem>
                      </MenuItem>
                    ))}
                    {watcherList().length === 0 && (
                      <Empty description="No watcher!" size={80} pX={80} />
                    )}
                  </MenuBody>
                </MenuGeneralContainer>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
