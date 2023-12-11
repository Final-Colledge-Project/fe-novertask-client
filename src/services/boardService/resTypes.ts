import {
  IAllMemberInBoard,
  IBoard,
  IGeneralWorkspace,
} from '../types'

export interface IGetAllByUserIdResponse {
  length: number
  data: IGeneralWorkspace[];
  message: string
}

export interface IGetAllByWSIdResponse {
  length: number
  data: IBoard[]
  message: string
}

export interface ICreateBoardResponse {
  data: IBoard
  message: string
}

export interface IGetBoardDetailResponse {
  data: IBoard
  message: string
}

export interface IGetMemberInBoardResponse {
  data: IAllMemberInBoard
  message: string
}
export interface IAddMemberToBoardResponse {
  data: IBoard
  message: string
}

export interface IUpdateBoardResponse {
  data: IBoard
  message: string
}
