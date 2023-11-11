import { Button, IconButton } from '@mui/material'
import { RiMenuFill } from 'react-icons/ri'
import './style.scss'
import { useState } from 'react'
import { RiArrowRightSLine, RiCloseFill } from 'react-icons/ri'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
const Navigation = () => {
  const navigateTo = useNavigate()
  const [showNavPane, setShowNavPane] = useState(false)
  const toggleNavPane = () => {
    setShowNavPane((prev) => !prev)
  }
  return (
    <>
      <IconButton
        aria-label=""
        onClick={toggleNavPane}
        sx={{
          display: 'none',
          transition: 'all 0.2s',
          color: (theme) => theme.palette.gray.main,
          '@media screen and (max-width:900px)': {
            display: 'flex'
          }
        }}
      >
        <RiMenuFill />
      </IconButton>

      <div
        className={clsx('nav-modal', showNavPane ? ' active' : '')}
        onClick={toggleNavPane}
      >
        <div
          className={clsx('nav-menu', showNavPane ? ' active' : '')}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="header">
            <h1 className="logo">Novertask</h1>
            <IconButton
              aria-label=""
              onClick={toggleNavPane}
              sx={{
                display: 'none',
                transition: 'all 0.2s',
                color: (theme) => theme.palette.gray.main,
                '@media screen and (max-width:900px)': {
                  display: 'flex'
                }
              }}
            >
              <RiCloseFill />
            </IconButton>
          </div>
          <ul className="list">
            <li>
              <Button
                variant="text"
                sx={{
                  color: (theme) => theme.palette.black.main,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  justifyContent: 'space-between'
                }}
                fullWidth
                endIcon={<RiArrowRightSLine />}
              >
                Features
              </Button>
            </li>
            <li>
              <Button
                variant="text"
                sx={{
                  color: (theme) => theme.palette.black.main,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  justifyContent: 'space-between'
                }}
                fullWidth
                endIcon={<RiArrowRightSLine />}
              >
                Packages
              </Button>
              <Button
                variant="text"
                sx={{
                  color: (theme) => theme.palette.black.main,
                  fontWeight: 'bold',
                  fontSize: '16px',
                  justifyContent: 'space-between'
                }}
                fullWidth
                endIcon={<RiArrowRightSLine />}
              >
                About us
              </Button>
            </li>
          </ul>
          <div className="action">
            <Button
              variant="text"
              sx={{
                color: (theme) => theme.palette.black.main,
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              onClick={() => {
                navigateTo('/sign-in')
              }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              onClick={() => {
                navigateTo('/verify-email', {
                  state: { redirectPath: '/sign-up' }
                })
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Navigation
