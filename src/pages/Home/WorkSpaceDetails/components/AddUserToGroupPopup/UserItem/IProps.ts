import { IMockUser } from '~/services/workspaceService/resTypes'

export default interface IProps {
  checked?: boolean
  onChange: (id: string, fullName: string) => void
  disabled?: boolean
  user: IMockUser
  isUnassigned?: boolean
  isOwner?: boolean
}
