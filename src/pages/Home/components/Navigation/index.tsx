import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

// component library
import { IconButton, Tooltip } from '@mui/material'
import {
  MdWorkspacesOutline,
  MdKeyboardArrowDown,
  MdOutlineTaskAlt
} from 'react-icons/md'
import {
  RiHome6Line,
  RiQuestionLine,
  RiSettings2Line,
  RiPushpinLine,
  RiUnpinLine,
  RiDashboardLine,
  RiGroupLine
} from 'react-icons/ri'

// component
import NavItem from './NavItem'
import SignOutButton from './SignOutButton'
import UserBadge from './UserBadge'
import { LevelMenu, LevelMenuItem } from '~/components/LevelMenu'
import './style.scss'

// services
import { StoreDispatchType, StoreType } from '~/redux'
import { getAllByUserId } from '~/redux/boardSlice/actions'
import { setCurrentNavItem } from '~/redux/navSlice'
import NotificationBadge from '../../Notifications/components/NotificationBadge'
import { setPopupNotification } from '~/redux/popupSlice'

const Navigation = () => {
  const [fullVisible, setFullVisible] = useState(false)
  const [pinNav, setPinNav] = useState(false)
  const { current } = useSelector((state: StoreType) => state.nav)
  const { PopupNotification } = useSelector((state: StoreType) => state.popup)
  // hover to nav bar
  const handleMouseHover = async () => {
    if (pinNav) return
    setFullVisible(true)
  }
  const handleMouseLeave = () => {
    if (pinNav) return
    setFullVisible(false)
    dispatch(setPopupNotification(false))
  }

  const navigate = useNavigate()

  const {
    boards,
    getAllBoard: { error }
  } = useSelector((state: StoreType) => state.board)
  const dispatch = useDispatch<StoreDispatchType>()

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAllByUserId())
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error as string, { variant: 'error' })
    }
  }, [error])

  const getWorkspaces = () => {
    if (boards) {
      const result = boards?.map((w) => ({
        _id: w._id,
        name: w.name
      }))
      return result
    }
  }

  const handleNotificationPopup = () => {
    dispatch(setPopupNotification(!PopupNotification))
    if (PopupNotification === false && pinNav === true) setPinNav(true)
    else setPinNav((prev) => !prev)
  }

  useEffect(() => {
    if (!fullVisible) dispatch(setPopupNotification(false))
  }, [fullVisible])

  return (
    <div
      className={clsx(
        'nav-container',
        fullVisible ? '' : 'nav-container--short'
      )}
      onMouseOver={handleMouseHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-container-top">
        <div
          className={clsx('logo', fullVisible ? '' : 'logo--short')}
          onClick={() => navigate('/u')}
        >
          {fullVisible ? (
            <img src="/img/novertask-logo-full.png" alt="" />
          ) : (
            <img src="/img/novertask-logo.png" alt="" />
          )}
        </div>
        <ul className="top-items-list">
          <li className="item">
            <NavItem
              onClick={() => {
                dispatch(setCurrentNavItem('dashboard'))
                navigate('/u/dashboard')
              }}
              title="Dashboard"
              startIcon={<RiHome6Line />}
              isIndex={current === 'dashboard'}
              fullVisible={fullVisible}
            />
          </li>
          <li className="item">
            <NavItem
              fullVisible={fullVisible}
              title="Workspace"
              startIcon={<MdWorkspacesOutline />}
              endIcon={<MdKeyboardArrowDown />}
            >
              <LevelMenu>
                {getWorkspaces() ? (
                  getWorkspaces()?.map((data) => (
                    <LevelMenuItem key={data._id} isIndex>
                      <NavItem
                        isThin
                        onClick={() => {
                          dispatch(setCurrentNavItem(data._id))
                          navigate('/u/workspaces/' + data._id)
                        }}
                        fullVisible={fullVisible}
                        title={data.name}
                        isIndex={current === data._id}
                        startIcon={<RiSettings2Line />}
                      ></NavItem>
                      {current === data._id && (
                        <div className="part-group">
                          <Tooltip title={'Overview'}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                navigate('/u/workspaces/' + data._id)
                              }}
                            >
                              <RiDashboardLine />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={'Members'}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                navigate(
                                  '/u/workspaces/' + data._id + '/members'
                                )
                              }}
                            >
                              <RiGroupLine />
                            </IconButton>
                          </Tooltip>
                        </div>
                      )}
                    </LevelMenuItem>
                  ))
                ) : (
                  <></>
                )}
              </LevelMenu>
            </NavItem>
          </li>
          <li className="divider"></li>
          <li className="item">
            <NavItem
              onClick={() => {
                dispatch(setCurrentNavItem('myspace'))
              }}
              isIndex={current === 'myspace'}
              title="My task"
              startIcon={<MdOutlineTaskAlt />}
              fullVisible={fullVisible}
            />
          </li>
          <li className="divider"></li>
        </ul>
      </div>
      <ul className="nav-container-bottom">
        <li className="item">
          <SignOutButton fullVisible={fullVisible} />
        </li>
        <li className="divider"></li>
        <li className="item">
          <UserBadge fullVisible={fullVisible} />
        </li>
        <li className="divider"></li>
        <li className="item">
          <NavItem
            title="Settings"
            startIcon={<RiSettings2Line />}
            fullVisible={fullVisible}
          />
        </li>
        <li className="item">
          <NavItem
            title="FAQs"
            startIcon={<RiQuestionLine />}
            fullVisible={fullVisible}
          />
        </li>
        <li className="item">
          <NavItem
            onClick={handleNotificationPopup}
            title="Notifications"
            startIcon={<NotificationBadge />}
            fullVisible={fullVisible}
          />
        </li>
      </ul>
      <div className="nav-toggle-size">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => setPinNav((prev) => !prev)}
        >
          {pinNav ? <RiUnpinLine /> : <RiPushpinLine />}
        </IconButton>
      </div>
    </div>
  )
}
export default Navigation
