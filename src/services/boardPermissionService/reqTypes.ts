import { IBoardPermission, IUpdatableBoardPermission } from '../types'

export interface ICreateBoardPermissionBody {
  boardId: string
  boardPermission: IBoardPermission
}

export interface IUpdateBoardPermissionBody {
  permissionId: string
  boardPermission: IUpdatableBoardPermission
}

export interface IGetBoardPermissionBody {
  id: string
}

export interface IGetBoardPermissionByUserIdBody {
  userId: string
}
