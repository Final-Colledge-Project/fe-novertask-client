import { IBoardPermission } from '~/services/types'

export default interface IProps {
  open: boolean
  onClose: () => void
  permission: IBoardPermission
  onAdd: (data: string[]) => void
}
