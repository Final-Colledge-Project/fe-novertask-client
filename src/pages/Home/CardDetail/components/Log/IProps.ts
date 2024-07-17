import { IMemberInBoard, ITaskLog } from '~/services/types'

export default interface IProps {
  log: ITaskLog
  getUserFullName: (userId: string) => string
  getUserInfo: (userId: string) => IMemberInBoard | null | undefined
}
