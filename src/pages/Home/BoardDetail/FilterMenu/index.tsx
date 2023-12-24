import {
  useState,
  ChangeEvent,
  SyntheticEvent,
  useRef,
  KeyboardEvent,
  useEffect
} from 'react'

// component libraries
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

// component props
import { RiFilter3Fill } from 'react-icons/ri'
import { ItemContainer } from './style'
import { Badge, Switch, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { setFilter } from '~/redux/cardSlice'

export default function FilterMenu() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const filter = useSelector((state: StoreType) => state.card.filter)
  const dispatch = useDispatch()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const handleToggleAssignToMe = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ assignToMe: e.target.checked }))
  }

  const countFilterIsOn = () => {
    let total = 0
    if (filter.assignToMe) total++
    return total
  }

  return (
    <div>
      <Badge badgeContent={countFilterIsOn()} color="error">
        <Button
          variant="outlined"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className="glass-effect"
          sx={{
            height: '35px',
            padding: '5px 10px',
            minWidth: '0'
          }}
          startIcon={<RiFilter3Fill />}
        >
          Filter
        </Button>
      </Badge>
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
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper sx={{ borderRadius: '8px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem>
                    <ItemContainer>
                      <Typography>Assign to me</Typography>
                      <Switch
                        checked={filter.assignToMe}
                        onChange={handleToggleAssignToMe}
                      />
                    </ItemContainer>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
