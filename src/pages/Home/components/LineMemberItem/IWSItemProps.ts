import { IMockUser } from '~/services/types'

export default interface IWSItemProps {
  data: {
    user?: IMockUser & { email: string }
    role: 'boardLead' | 'boardAdmin' | 'member',
    color?: string
  }
  superAdminId: string,
  onDelete?: (id: string) => void,
}
