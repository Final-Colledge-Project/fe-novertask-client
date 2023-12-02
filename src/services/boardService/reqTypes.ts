export interface IGetAllByWSIdBody {
  wsId: string
  option?: {
    fields: (
      | 'createdAt'
      | 'cover'
      | 'name'
      | 'members'
      | 'createdAt'
      | 'dueDate'
    )[]
    sort: 'createdAt' | 'name' | 'createdAt'
    limit: number
    page: number
  }
}

export interface ICreateBoardBody {
  title: string
  description: string
  teamWorkspaceId: string
}

export interface IGetBoardDetailBody {
  id: string
}
export interface IGetMemberInBoardBody {
  id: string
}
