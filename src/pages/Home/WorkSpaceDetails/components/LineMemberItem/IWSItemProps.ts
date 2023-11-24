import { IMockUser } from '~/services/types'

export default interface IWSItemProps {
  data: {
    user: IMockUser & { email: string }
    role: 'admin' | 'superAdmin' | 'member'
  }
  superAdminId: string
}
