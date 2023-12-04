import { IColumn } from '../types'

export interface IGetColumnsInBoardResponse {
  data: IColumn[]
  message: string
}

export interface ICreateColumnResponse {
  data: IColumn
  message: string
}

export interface IUpdateColumnResponse {
  data: IColumn
  message: string
}
