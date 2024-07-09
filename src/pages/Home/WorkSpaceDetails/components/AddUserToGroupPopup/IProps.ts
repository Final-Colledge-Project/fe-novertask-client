import { IWSPermission } from '~/services/types'

export default interface IProps {
  open: boolean
  onClose: () => void
  permission: IWSPermission
  onAdd: (data: string[]) => void
}
