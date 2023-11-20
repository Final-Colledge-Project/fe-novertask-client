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

interface IMockUser {
  avatar: string
  fullName: string
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
  ownerIds: Array<string>
  memberIds: Array<string>
  dueDate?: string
  isActive?: boolean
  isDestroyed?: boolean
  createdAt: string
  updatedAt?: string
  __v: string
}

export interface IBoardData {
  board: IBoard[]
  _id: string
  name: string
}
