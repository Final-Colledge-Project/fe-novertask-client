import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { RiArrowDropDownLine } from 'react-icons/ri'
const PackagesDropMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="packages-menu-button"
        aria-controls={open ? 'packages-menu-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<RiArrowDropDownLine />}
        sx={{
          color: (theme) => theme.palette.black.main,
          fontSize: '16px',
          '@media screen and (max-width:900px)': {
            display: 'none'
          }
        }}
      >
        Packages
      </Button>
      <Menu
        id="packages-menu-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'packages-menu-button'
        }}
      >
        <MenuItem onClick={handleClose}>Chưa có cái gì hết chơn</MenuItem>
      </Menu>
    </div>
  )
}
export default PackagesDropMenu
