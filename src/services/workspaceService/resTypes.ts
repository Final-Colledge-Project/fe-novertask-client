import { IBoardMembers } from '../types'

export interface ICreateWSResponse {
  data: {
    id: string
    name: string
    workspaceSuperAdmins: string
  }
  message: string
}

export interface IMockUser {
  _id: string
  email: string
  avatar: string
  fullName: string
}

export interface IGetMemberResponse {
  data: IBoardMembers & {
    _id: string
    name: string
  }
  message: string
}
