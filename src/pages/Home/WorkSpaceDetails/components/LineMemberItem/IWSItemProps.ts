import { IMockUser } from '~/services/types'

export default interface IWSItemProps {
  data: {
    user?: IMockUser & { email: string }
    role: string
    color: string
  }
  superAdminId: string
  onDelete?: (id: string) => void
  canRemove?: boolean
}
