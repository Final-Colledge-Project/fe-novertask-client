import { IBoardPermission } from '../types'

export interface ICreateBoardPermissionResponse {
  data: IBoardPermission
  message: string
}

export interface IUpdateBoardPermissionResponse {
  message: string
}

export interface IGetBoardPermissionResponse {
  data: IBoardPermission[]
  message: string
}

export interface IGetBoardPermissionByUserIdResponse {
  data: IBoardPermission[]
  message: string
}
