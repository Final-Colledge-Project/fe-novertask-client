import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@mui/material'
import { RiMoreFill } from 'react-icons/ri'
/* import SearchBox from '~/components/SearchBox' */
import { StyledHeader } from './style'
import React from 'react'

const Header = ({
  title,
  items
}: {
  title: string
  items: { title: string; onChoose: () => void }[]
}) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

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

  return (
    <StyledHeader className="header">
      <h2 className="name">{title}</h2>
      {/* <div className="search-box">
        <SearchBox label="" />
      </div> */}
      <div className="more-icon">
        {/* <IconButton aria-label=""></IconButton> */}
        <div>
          <Button
            variant="contained"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="glass-effect"
            sx={{
              height: '35px',
              width: '35px',
              padding: '0',
              minWidth: '0'
            }}>
            <RiMoreFill />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
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
                    placement === 'bottom-end' ? 'right top' : 'left bottom'
                }}>
                <Paper sx={{ borderRadius: '8px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      sx={{ borderRadius: '8px' }}>
                      {items?.map((item) => (
                        <MenuItem
                          key={item.title}
                          onClick={(e) => {
                            item.onChoose()
                            handleClose(e)
                          }}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </StyledHeader>
  )
}

export default Header
