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

export interface IAddMemberToBoardBody {
  boardId: string
  memberIds: string[]
}

interface IUpdatableBoard {
  columnOrderIds?: string[]
  title?: string
  description?: string
  type?: string
  dueDate?: string | undefined | null
}

export interface IUpdateBoardBody {
  boardId: string
  changes: IUpdatableBoard
}
