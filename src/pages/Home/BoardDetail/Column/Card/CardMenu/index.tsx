import {
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { RiDeleteBinLine, RiMore2Fill } from 'react-icons/ri'

interface ICardMenuProps {
  items: { title: string; onChoose: () => void }[]
}

export default function CardMenu({ items }: ICardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ color: 'var(--mui-palette-gray-main)' }}>
      <IconButton
        size="small"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit">
        <RiMore2Fill />
      </IconButton>
      <Menu
        elevation={1}
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
          dense: true
        }}
        PaperProps={{
          sx: { width: '200px' }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
        {items?.map((item) => (
          <MenuItem
            key={item.title}
            dense
            onClick={(e) => {
              e.stopPropagation()
              item.onChoose()
              handleClose()
            }}
            sx={{ color: 'var(--mui-palette-pink-main)' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <RiDeleteBinLine />
            </ListItemIcon>
            <ListItemText sx={{ color: 'inherit' }}>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
