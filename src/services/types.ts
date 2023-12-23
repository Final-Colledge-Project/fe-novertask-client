export interface IWSSummary {
  id: string
  title: string
  projects: IWSSummaryProject[]
}

export interface IWSSummaryProject {
  name: string
  cover: string
  totalTask: number
  completeTask: number
  target: string | null
  createdAt?: string | null
  members: { img: string }[]
}

export interface IUser {
  _id: string
  email: string
  createdAt: string
  address: string
  birthDate: string
  firstName: string
  lastName: string
  phone: string
  avatar: string
}

export interface IMockUser {
  avatar: string
  fullName: string
  _id: string
}

export interface IInvitation {
  _id: string
  teamWorkspace: {
    _id: string
    name: string
    workspaceAdmins: {
      user: IMockUser
      role: 'admin' | 'superAdmin'
    }[]
  }
  senders: IMockUser
  receiver: IMockUser
  teamWorkspaceMember?: {
    workspaceMembers?: { user: IMockUser }[]
  }
}

export interface IBoard {
  _id: string
  title: string
  description: string
  cover: undefined | string
  columnOrderIds?: Array<string>
  type: 'private' | 'public'
  teamWorkspaceId: string
  ownerIds: {
    user: string
    role: string
    _id: string
  }[]
  memberIds: Array<string>
  dueDate?: string
  isActive?: boolean
  isDestroyed?: boolean
  createdAt: string
  updatedAt?: string
  __v?: string
  columns?: IColumn[]
}

export interface IBoardData {
  board: IBoard[]
  _id: string
  name: string
}

export interface IBoardMembers {
  workspaceAdmins: {
    user?: IMockUser & { email: string; _id: string }
    role: 'admin' | 'superAdmin'
  }[]
  workspaceMembers?: {
    user?: IMockUser & { email: string; _id: string }
  }[]
}

export interface IErrorResponse {
  message: string
}

export interface IWorkspaceWithoutBoard {
  _id: string
  name: string
  createdAt: string
}
export interface IWorkspaceWithBoard {
  board: IBoard[]
  _id: string
  name: string
  createdAt: string
}
export interface IGeneralWorkspace {
  boards?: IBoard[]
  _id: string
  name: string
  createdAt: string
}

export interface IAllBoardOfCurrentUser {
  workspaces: IGeneralWorkspace[]
}

export interface IAllMemberInBoard {
  boardId: string
  oweners: { user: IMemberInBoard }[]
  members: IMemberInBoard[]
}

export interface IMemberInBoard {
  _id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
}

export interface IColumn {
  _id: string
  title: string
  boardId: string
  cardOrderIds: string[]
  createdAt: string
  updatedAt: string
  isActive?: boolean
  __v?: number
  cards?: ICard[]
}
export interface IUpdatableColumn {
  title?: string
  cardOrderIds?: string[]
}

export interface IUpdatableCard {
  title?: string
  description?: string
  cover?: string
  dueDate?: string
  labelId?: string
  priorityId?: string
  isDone?: false
  columnId?: string
}

export interface ICard {
  _id: string
  boardId: string
  cardId: string
  columnId: string
  title: string
  cover: string | undefined
  startDate: string
  dueDate: string
  priority: string
  isDone: undefined | boolean
  description: string
  isOverdue: boolean
  memberIds: {
    _id: string
    avatar: string
    fullName: string
  }[]
  label: {
    _id: string
    name: string
    color: string
  }
  reporterId?: string
  comments?: []
  createdAt?: string
  updatedAt?: string
  FE_ONLY_PLACEHOLDER?: boolean
  isActive: boolean
  attachments?: []
  reporter: {
    _id: string
    avatar: string
    fullName: string
  }
}

export interface ISubtask {
  _id: string
  cardId: string
  subCardId: string
  name: string
  status: string
  dueDate?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
  assignedTo?: IMemberInBoard
}
