import { IBoard } from '../types'

export interface IGetAllByUserIdResponse {
  length: number
  data: {
    board: IBoard[]
    _id: string
    name: string
  }[]
  message: string
}
