import { Button } from '@mui/material'
import { ReactElement, ReactNode, useState } from 'react'
import './style.scss'
import clsx from 'clsx'
const NavItem = ({
  isIndex,
  title,
  startIcon,
  endIcon,
  children,
  fullVisible,
  onClick
}: {
  isIndex?: boolean
  title: string
  startIcon?: ReactElement
  endIcon?: ReactElement
  fullVisible: boolean
  children?: ReactNode | ReactNode[]
  onClick?: () => void
}) => {
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
          height: '50px',
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
            // '& .MuiButton-startIcon::after': {
            //   background: isIndex
            //     ? 'linear-gradient(180deg, rgba(229, 229, 234, 0.00) 50%, #D1D1D6 95%)'
            //     : 'linear-gradient(180deg, rgba(229, 229, 234, 0.00) 50%, #F2F2F7 95%)'
            // }
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
          // '& .MuiButton-startIcon::after': {
          //   content: '""',
          //   display: 'block',
          //   width: '100%',
          //   height: '20px',
          //   position: 'absolute',
          //   overflow: 'visible',
          //   left: 0,
          //   top: 0,
          //   transition: 'background 150ms cubic-bezier(0.4, 0, 0.2, 1) 100ms'
          //   // background: isIndex
          //   //   ? 'linear-gradient(180deg, rgba(229, 229, 234, 0.00) 50%, #F2F2F7 95%)'
          //   //   : 'linear-gradient(180deg, rgba(229, 229, 234, 0.00) 50%, #FFFFFF 95%)'
          // }
        }}
        startIcon={startIcon}
        endIcon={fullVisible && endIcon}
      >
        <p
          className={clsx(
            'nav-item-title',
            !fullVisible && 'nav-item-title--hidden'
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
