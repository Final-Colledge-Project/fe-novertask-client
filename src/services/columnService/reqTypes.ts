import { IUpdatableCard, IUpdatableColumn } from '../types'

export interface IGetColumnsInBoardBody {
  id: string
}
export interface IUpdateColumnBody {
  id: string
  changes: IUpdatableColumn
}
export interface ICreateColumnBody {
  boardId: string
  title: string
}

export interface IUpdateColumnAndCardDnd {
  columns: [IUpdateColumnBody, IUpdateColumnBody]
  card: { cardId: string; changes: IUpdatableCard }
}
