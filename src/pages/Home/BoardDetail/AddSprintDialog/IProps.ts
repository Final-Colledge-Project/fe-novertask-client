import { IBoard } from '~/services/types'

export default interface IProps {
  open: boolean
  onCancel: () => void
  board: IBoard
}
