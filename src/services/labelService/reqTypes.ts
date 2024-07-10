import { IUpdatableLabel } from '../types'

export interface IGetAllByBoardBody {
  boardId: string
}

export interface ICreateLabelBody {
  name: string
  color: string
  boardId: string
  cb?: () => void
}

export interface IUpdateLabelBody {
  labelId: string
  changes: IUpdatableLabel
  boardId: string
  cb?: () => void
}

export interface IDeleteLabelBody {
  labelId: string
  boardId: string
  cb?: () => void
}
