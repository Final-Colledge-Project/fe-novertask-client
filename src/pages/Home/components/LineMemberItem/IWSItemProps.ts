import { IMockUser } from '~/services/types'

export default interface IWSItemProps {
  data: {
    user?: IMockUser & { email: string }
    role: 'boardLead' | 'boardAdmin' | 'member'
  }
  superAdminId: string,
  onDelete?: (id: string) => void
}
