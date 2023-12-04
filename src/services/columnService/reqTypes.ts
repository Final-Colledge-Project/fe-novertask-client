import { IUpdatableColumn } from '../types'

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
