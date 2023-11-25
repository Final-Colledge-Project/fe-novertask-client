export interface ICreateWSBody {
  name: string
}

export interface IGetMemberBody {
  id: string
}

export interface IAssignAdminBody {
  emailUser: string
  wsID: string
}
