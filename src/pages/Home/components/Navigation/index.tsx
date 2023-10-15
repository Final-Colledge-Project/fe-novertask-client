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
import { useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@mui/material'
const Navigation = () => {
  const [fullVisible, setFullVisible] = useState(false)
  const [pinNav, setPinNav] = useState(false)

  const handleMouseHover = () => {
    if (pinNav) return
    setFullVisible(true)
  }
  const handleMouseLeave = () => {
    if (pinNav) return
    setFullVisible(false)
  }

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
        <div className={clsx('logo', fullVisible ? '' : 'logo--short')}>
          {fullVisible ? (
            <img src="/img/novertask-logo-full.png" alt="" />
          ) : (
            <img src="/img/novertask-logo.png" alt="" />
          )}
        </div>
        <ul className="top-items-list">
          <li className="item">
            <NavItem
              title="Dashboard"
              startIcon={<RiHome6Line />}
              isIndex
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
                <LevelMenuItem>
                  <NavItem
                    fullVisible={fullVisible}
                    title="Tot nghiep"
                    startIcon={<RiSettings2Line />}
                    endIcon={<MdKeyboardArrowDown />}
                  >
                    <LevelMenu>
                      <LevelMenuItem>
                        <NavItem
                          fullVisible={fullVisible}
                          title="Tieu luan"
                          startIcon={<RiSettings2Line />}
                        />
                      </LevelMenuItem>
                      <LevelMenuItem>
                        <NavItem
                          fullVisible={fullVisible}
                          title="Khoa luan"
                          startIcon={<RiSettings2Line />}
                        />
                      </LevelMenuItem>
                    </LevelMenu>
                  </NavItem>
                </LevelMenuItem>
                <LevelMenuItem>
                  <NavItem
                    title="Marketing"
                    startIcon={<RiSettings2Line />}
                    fullVisible={fullVisible}
                  />
                </LevelMenuItem>
                <LevelMenuItem>
                  <NavItem
                    title="Human Resources"
                    startIcon={<RiSettings2Line />}
                    fullVisible={fullVisible}
                  />
                </LevelMenuItem>
              </LevelMenu>
            </NavItem>
          </li>
          <li className="divider"></li>
          <li className="item">
            <NavItem
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
