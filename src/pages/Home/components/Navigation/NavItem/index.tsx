import { Button } from '@mui/material'
import { useState } from 'react'
import './style.scss'
import clsx from 'clsx'
import IProps from './IProps'
const NavItem = ({
  isIndex,
  title,
  startIcon,
  endIcon,
  children,
  fullVisible,
  onClick,
  isThin
}: IProps) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const handleToggleMenu = () => {
    if (fullVisible) {
      setMenuVisible((prev) => !prev)
    }
  }

  return (
    <div className="nav-item-container">
      <Button
        onClick={() => {
          handleToggleMenu()
          if (onClick) onClick()
        }}
        fullWidth={fullVisible}
        sx={{
          width: fullVisible ? '100%' : '50px',
          height: isThin ? '40px' : '50px',
          minWidth: 'unset',
          color: (theme) =>
            isIndex ? theme.palette.black.main : theme.palette.gray.main,
          backgroundColor: (theme) =>
            isIndex ? theme.palette.gray6.main : theme.palette.white.main,
          fontSize: '14px',
          fontWeight: isIndex ? 700 : 400,
          '&:hover': {
            backgroundColor: (theme) =>
              isIndex ? theme.palette.gray4.main : theme.palette.gray6.main
          },
          justifyContent: fullVisible ? 'flex-start' : 'center',
          padding: '10px 15px',
          svg: {
            width: '20px',
            transition: 'transform 0.2s',
            m: 0,
            color: (theme) =>
              isIndex ? theme.palette.black.main : theme.palette.gray.main
          },
          '& .MuiButton-startIcon': {
            mr: fullVisible ? '16px' : '0px',
            // mr: '8px',
            ml: '0px'
          },
          '& .MuiButton-endIcon': {
            svg: {
              transform: menuVisible ? 'rotate(180deg)' : 'rotate(0deg)'
            },
            flex: 1,
            justifyContent: 'flex-end'
          },
          '& .MuiButton-iconSizeMedium': {
            position: 'relative'
          }
        }}
        startIcon={startIcon}
        endIcon={fullVisible && endIcon}
      >
        <p
          className={clsx(
            'nav-item-title',
            !fullVisible && 'nav-item-title--hidden',
            isThin && 'thin'
          )}
        >
          {title}
        </p>
      </Button>
      {fullVisible && menuVisible && children}
    </div>
  )
}
export default NavItem
