import { IBoard, ISprint } from '~/services/types'

export default interface IProps {
  open: boolean
  onCancel: () => void
  board: IBoard
  createSuccessCb: () => void
  mode: number
  defaultSprint?: ISprint
}
