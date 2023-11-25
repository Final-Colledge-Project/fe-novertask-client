import { ReactNode } from 'react'
import './style.scss'
import clsx from 'clsx'
export const LevelMenu = ({
  children
}: {
  children: ReactNode | ReactNode[]
}) => {
  return <ul className="level-menu-items-list">{children}</ul>
}
export const LevelMenuItem = ({
  children,
  isIndex
}: {
  children: ReactNode
  isIndex?: boolean
}) => {
  return (
    <li className={clsx('level-menu-item', isIndex && 'index')}>
      <div className="level-menu-item-link--vertical"></div>
      <div className="level-menu-item-container">
        <div className="level-menu-item-link--corner"></div>
        <div className="level-menu-item-show">{children}</div>
      </div>
    </li>
  )
}
