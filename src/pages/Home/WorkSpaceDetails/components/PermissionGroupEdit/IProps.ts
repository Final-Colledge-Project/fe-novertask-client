import { IWSPermission } from '~/services/types'

export default interface IProps {
  open: boolean
  closeCallback: () => void
  permissionProps: IWSPermission
  mode: number
}
