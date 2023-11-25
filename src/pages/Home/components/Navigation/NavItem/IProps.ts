import { ReactElement, ReactNode } from 'react'

export default interface IProps {
  isIndex?: boolean
  isThin?: boolean
  title: string
  startIcon?: ReactElement
  endIcon?: ReactElement
  fullVisible: boolean
  children?: ReactNode | ReactNode[]
  onClick?: () => void
}
