import { IUpdatableLabel } from '../types'

export interface IGetAllByBoardBody {
  boardId: string
}

export interface ICreateLabelBody {
  name: string
  color: string
  boardId: string
}

export interface IUpdateLabelBody {
  labelId: string
  changes: IUpdatableLabel
}
