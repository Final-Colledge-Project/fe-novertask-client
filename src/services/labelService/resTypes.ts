import { ILabel } from '../types'

export interface IGetAllByBoardResponse {
  data: ILabel[]
  message: string
}

export interface ICreateLabelResponse {
  data: ILabel
  message: string
}

export interface IUpdateLabelResponse {
  data: ILabel
  message: string
}
