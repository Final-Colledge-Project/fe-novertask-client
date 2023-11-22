interface IUser {
  _id: string
  avatar: string
  fullName: string
}

export interface IGetDetailResponse {
  data: {
    _id: string
    teamWorkspace: {
      _id: string
      name: string
      workspaceAdmins: {
        user: IUser
        role: 'admin' | 'superAdmin'
      }[]
    }
    senders: IUser
    receiver: IUser
    teamWorkspaceMember: {
      workspaceMembers: { user: IUser }[]
    }
  }
  message: string
}
