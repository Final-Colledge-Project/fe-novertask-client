import { IWSPermission } from '../types'

export interface ICreateWSPermissionResponse {
  data: IWSPermission
  message: string
}

export interface IUpdateWSPermissionResponse {
  message: string
}

export interface IGetWSPermissionResponse {
  data: IWSPermission[]
  message: string
}

export interface IGetWSPermissionByUserIdResponse {
  data: IWSPermission
  message: string
}

export interface IDeleteWSPermissionResponse {
  message: string
}
