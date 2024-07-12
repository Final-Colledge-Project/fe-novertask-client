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
import { BOARD_TEMPLATE } from '~/utils/constant/board'
import IProps from './IProps'

export default function FilterMenu(props: IProps) {
  // ----------------PROPS & DATA----------------
  const { board } = props
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const filter = useSelector((state: StoreType) => state.card.filter)

  // ----------------FUNCTIONS----------------
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
    handleToggleFilter('assignToMe', e.target.checked)
  }

  const handleToggleCurrentSprint = (e: ChangeEvent<HTMLInputElement>) => {
    handleToggleFilter('currentSprint', e.target.checked)
  }

  const handleToggleFilter = (filterName: string, newValue: boolean) => {
    switch (filterName) {
      case 'assignToMe':
        dispatch(setFilter({ ...filter, assignToMe: newValue }))
        break
      case 'currentSprint':
        dispatch(setFilter({ ...filter, currentSprint: newValue }))
        break
      default:
        break
    }
  }

  const countFilterIsOn = () => {
    let total = 0
    if (filter.assignToMe) total++
    if (filter.currentSprint) total++
    return total
  }

  const isScrumBoard = () => {
    return board?.template === BOARD_TEMPLATE.SCRUM
  }

  return (
    <div>
      <Badge badgeContent={countFilterIsOn()} color="error">
        <Button
          variant="text"
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
          startIcon={<RiFilter3Fill />}>
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
        }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'right top'
            }}>
            <Paper sx={{ borderRadius: '8px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  dense
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ borderRadius: '8px' }}>
                  {isScrumBoard() && (
                    <MenuItem dense>
                      <ItemContainer>
                        <Typography>Current sprint</Typography>
                        <Switch
                          size="small"
                          checked={filter.currentSprint}
                          onChange={handleToggleCurrentSprint}
                        />
                      </ItemContainer>
                    </MenuItem>
                  )}
                  <MenuItem dense>
                    <ItemContainer>
                      <Typography>Assign to me</Typography>
                      <Switch
                        size="small"
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
