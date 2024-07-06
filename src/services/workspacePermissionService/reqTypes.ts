import { IUpdatableWSPermission, IWSPermission } from '../types'

export interface ICreateWSPermissionBody {
  wsId: string
  wsPermission: IWSPermission
}

export interface IUpdateWSPermissionBody {
  permissionId: string
  wsPermission: IUpdatableWSPermission
}

export interface IGetWSPermissionBody {
  id: string
}

export interface IGetWSPermissionByUserIdBody {
  userId: string
}

export interface IDeleteWSPermissionBody {
  permissionId: string
  wsId: string
}

export interface IGetWSCanCreateBoardBody {}
