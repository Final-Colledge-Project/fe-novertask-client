import { IMemberInBoard } from '~/services/types'

export default interface IProps {
  checked?: boolean
  onChange: (id: string, fullName: string) => void
  disabled?: boolean
  user: IMemberInBoard
  isUnassigned?: boolean
}
