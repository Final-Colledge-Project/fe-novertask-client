import { useState, useRef, MouseEvent } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import { BaseContainer, MenuContainer, MenuFooter, MenuHeader } from './styles'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { RiEqualizerLine } from 'react-icons/ri'

export default function ColumnMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const columns = useRef([
    { value: 'cover', show: true, label: 'Cover' },
    { value: 'name', show: true, label: 'Name' },
    { value: 'members', show: true, label: 'Members' },
    { value: 'estimation', show: true, label: 'Estimation' },
    { value: 'createAt', show: true, label: 'Created at' },
    { value: 'dueDate', show: true, label: 'Due date' }
  ])

  const [currentFields, setCurrentFields] = useState(() => columns.current)
  const [tempFields, setTempFields] = useState(() => columns.current)

  const handleSelectionColumn = (checked: boolean, index: number) => {
    setTempFields((prev) => {
      const newState = prev.map((item) => ({ ...item }))
      newState[index].show = checked
      return [...newState]
    })
  }

  const handleCheckAll = () => {
    const isAllChecked = tempFields.every((item) => item.show)
    if (isAllChecked) {
      setTempFields((prev) => {
        const newState = prev.map((item) => ({ ...item, show: false }))
        return [...newState]
      })
    } else {
      setTempFields((prev) => {
        const newState = prev.map((item) => ({ ...item, show: true }))
        return [...newState]
      })
    }
  }

  const handleApply = () => {
    setCurrentFields([...tempFields.map((item) => ({ ...item }))])
  }

  const handleCancel = () => {
    setTempFields([...currentFields.map((item) => ({ ...item }))])
  }

  const handleReset = () => {
    setCurrentFields([...columns.current.map((item) => ({ ...item }))])
    setTempFields([...columns.current.map((item) => ({ ...item }))])
  }

  return (
    <BaseContainer>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<RiEqualizerLine />}
        color="inherit"
      >
        Column
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          fontSize: '14px',
          '& .MuiPaper-root': {
            borderRadius: '8px'
          },
          '& .MuiMenuItem-root': {
            p: '0px',
            width: '100%'
          }
        }}
      >
        <MenuContainer>
          <MenuHeader>
            <Checkbox
              checked={tempFields.every((item) => item.show)}
              onChange={handleCheckAll}
            />
            <p>
              <b>Column</b>
            </p>
            <Button
              variant="text"
              color="error"
              sx={{ fontSize: '12px' }}
              onClick={() => {
                handleReset()
                handleClose()
              }}
            >
              Reset
            </Button>
          </MenuHeader>
          {tempFields.map((item, index) => (
            <MenuItem key={item.value}>
              <FormControlLabel
                sx={{
                  width: '100%',
                  m: 0,
                  '& .MuiTypography-root': {
                    fontSize: '14px'
                  }
                }}
                label={item.label}
                control={
                  <Checkbox
                    value={item}
                    color="primary"
                    checked={item.show}
                    onChange={(e) => {
                      handleSelectionColumn(e.target.checked, index)
                    }}
                  />
                }
              />
            </MenuItem>
          ))}
          <MenuFooter>
            <Button
              variant="text"
              color="error"
              onClick={() => {
                handleCancel()
                handleClose()
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleApply()
                handleClose()
              }}
            >
              Apply
            </Button>
          </MenuFooter>
        </MenuContainer>
      </Menu>
    </BaseContainer>
  )
}
