import {
  IAllMemberInBoard,
  IBoard,
  IWorkspaceWithBoard,
  IWorkspaceWithoutBoard
} from '../types'

export interface IGetAllByUserIdResponse {
  length: number
  data: {
    workspaceHasBoards: IWorkspaceWithBoard[]
    workspaceWithNoBoard: IWorkspaceWithoutBoard[]
  }
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
