import { IBoardPermission } from '~/services/types'

export default interface IProps {
  open: boolean
  closeCallback: () => void
  permissionProps: IBoardPermission
  mode: number
}
