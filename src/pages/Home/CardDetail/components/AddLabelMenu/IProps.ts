import { ICard } from '~/services/types'

export interface IProps {
  onChoose: (labelId: string, action: 'add' | 'remove') => void
  boardId: string
  card: ICard
  refreshCard: () => void
  isAdmin: boolean
}
