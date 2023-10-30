import { ReactNode } from 'react'
import './style.scss'
export const LevelMenu = ({
  children
}: {
  children: ReactNode | ReactNode[]
}) => {
  return <ul className="level-menu-items-list">{children}</ul>
}
export const LevelMenuItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="level-menu-item">
      <div className="level-menu-item-link--vertical"></div>
      <div className="level-menu-item-container">
        <div className="level-menu-item-link--corner"></div>
        <div className="level-menu-item-show">{children}</div>
      </div>
    </li>
  )
}
