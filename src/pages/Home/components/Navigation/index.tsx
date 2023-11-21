import NavItem from './NavItem'
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
  RiUnpinLine
} from 'react-icons/ri'

import './style.scss'
import SignOutButton from './SignOutButton'
import UserBadge from './UserBadge'
import { LevelMenu, LevelMenuItem } from '~/components/LevelMenu'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { getAllByUserId } from '~/redux/boardSlice/actions'
const Navigation = () => {
  const [fullVisible, setFullVisible] = useState(false)
  const [pinNav, setPinNav] = useState(false)
  const [currentIndex, setCurrentIndex] = useState('dashboard')

  const handleMouseHover = async () => {
    if (pinNav) return
    setFullVisible(true)
  }
  const handleMouseLeave = () => {
    if (pinNav) return
    setFullVisible(false)
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
          onClick={() => navigate('/u/home')}
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
                setCurrentIndex('dashboard')
                navigate('/u/home/dashboard')
              }}
              title="Dashboard"
              startIcon={<RiHome6Line />}
              isIndex={currentIndex === 'dashboard'}
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
                {boards.length > 0 ? (
                  boards.map((data) => (
                    <LevelMenuItem>
                      <NavItem
                        onClick={() => {
                          setCurrentIndex(data._id)
                          navigate('workspaces/' + data._id)
                        }}
                        fullVisible={fullVisible}
                        title={data.name}
                        isIndex={currentIndex === data._id}
                        startIcon={<RiSettings2Line />}
                      ></NavItem>
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
                setCurrentIndex('myspace')
              }}
              isIndex={currentIndex === 'myspace'}
              title="My task"
              startIcon={<MdOutlineTaskAlt />}
              fullVisible={fullVisible}
            />
          </li>
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
