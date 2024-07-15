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
  providerToken: {
    accessToken: string
    refreshToken: string
  }
}

export interface IMockUser {
  avatar?: string
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

// 2024-05-25 update permission
// export interface IBoard {
//   _id: string
//   title: string
//   description: string
//   cover: undefined | string
//   columnOrderIds?: Array<string>
//   type: 'private' | 'public'
//   teamWorkspaceId: string
//   ownerIds: {
//     user: string
//     role: string
//     _id: string
//   }[]
//   memberIds: Array<string>
//   dueDate?: string
//   isActive?: boolean
//   isDestroyed?: boolean
//   createdAt: string
//   updatedAt?: string
//   __v?: string
//   columns?: IColumn[]
// }
export interface IBoard {
  _id: string
  title: string
  description: string
  cover: undefined | string
  columnOrderIds?: Array<string>
  type: 'private' | 'public'
  teamWorkspaceId: string
  ownerIds: string[]
  memberIds: Array<string>
  dueDate?: string
  isActive?: boolean
  isDestroyed?: boolean
  createdAt: string
  updatedAt?: string
  __v?: string
  columns?: IColumn[]
  key: string
  template: string
  defaultAssigneeId: string
  initColumnId: string
  workingDays: number[]
}
// 2024-05-25 update permission

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
  oweners: IMemberInBoard[]
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
  isResolved: boolean
  description: string
  color: string
  WIP: number
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
  labelId?: string | null
  priorityId?: string
  isDone?: false
  columnId?: string
  epicId?: string
  issueTypeId?: string
  startDate?: string
  storyPoint?: number
  sprintId?: string
}

export interface IIssueType {
  _id: string
  boardId: string
  name: string
  description: string
  icon: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  hierarchy: number
  canDelete?: boolean
}

export interface ICard {
  _id: string
  boardId: string
  cardId: string
  columnId: string
  column: {
    title: string
    _id: string
  }
  title: string
  cover: string | undefined
  startDate: string
  dueDate: string
  priority: {
    color: string
    name: string
    _id: string
  }
  isDone: undefined | boolean
  description: string
  isOverdue: boolean
  memberIds: {
    _id: string
    avatar: string
    fullName: string
  }[]
  label?: {
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
  FE_ONLY_MATCHING_SEARCH?: boolean
  FE_ONLY_CREATING?: boolean
  epicId: string
  sprintId: string
  deletedAt: string
  resolveAt: string
  storyPoint: number
  issueLinks: IIssueLink[]
  issueType: IIssueType
  watcherIds: string[]
  issueTypeId?: string
  assigneeId?: string
  reporterIds?: string
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

export interface ILabel {
  _id: string
  name: string
  color: string
  boardId: string
  createdAt?: string
  updatedAt?: string
  canDelete?: boolean
}

export interface IUpdatableLabel {
  name?: string
  color?: string
}

export const PRIORITIES = {
  lowest: 'lowest',
  low: 'low',
  medium: 'medium',
  high: 'high',
  highest: 'highest'
}
export interface ISender {
  _id: string
  fullName: string
  avatar: string
}

export interface IType {
  category: string
  name: string
}

export interface INotification {
  _id: string
  sender: ISender
  type: IType
  message: string
  targetType: string
  contextUrl: string
  receiverId: string
  isRead: boolean
  isTrash: boolean
  createAt: string
  updatedAt: string
}

export interface INotificationItem {
  all: number
  unRead: number
  data: INotification[]
}
export interface IAssignedCard {
  _id: string
  cardId: string
  title: string
  dueDate: string
  priority: string
  startDate: string
  description: string
  labels: [
    {
      _id: string
      name: string
      color: string
    }
  ]
  board: {
    _id: string
    title: string
    key: string
  }
  column: {
    _id: string
    title: string
    isResolved: boolean
  }
  issueType: {
    _id: string
    name: string
    icon: string
  }
}

export const SUBTASK_STATUS = {
  todo: 'todo',
  inprogress: 'inprogress',
  completed: 'completed',
  cancel: 'cancel'
}

export interface IUpdatableSubtask {
  name?: string
  status?: string
  assignedTo?: string
  dueDate?: string
}

export interface IBoardPermission {
  _id: string
  name: string
  memberIds: string[]
  description: string
  color: string
  column: { create: boolean; update: boolean; delete: boolean }
  card: { create: boolean; update: boolean; delete: boolean }
  member: { invite: boolean }
  issueType: { create: boolean; update: boolean; delete: boolean }
  priority: { create: boolean; update: boolean; delete: boolean }
  label: { create: boolean; update: boolean; delete: boolean }
  issueLinkType: { create: boolean; update: boolean; delete: boolean }
  isAdmin?: boolean
  isViewer?: boolean
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
}

export interface IUpdatableBoardPermission {
  name?: string
  description?: string
  color?: string
  column?: { create?: boolean; update?: boolean; delete?: boolean }
  card?: { create?: boolean; update?: boolean; delete?: boolean }
  member?: { invite?: boolean }
  issueType?: { create?: boolean; update?: boolean; delete?: boolean }
  priority?: { create?: boolean; update?: boolean; delete?: boolean }
  label?: { create?: boolean; update?: boolean; delete?: boolean }
}
export interface ITaskEvent {
  id: string
  title: string
}

export interface EventItem {
  id: string
  start: Date
  end: Date
  data?: {
    assignedTask?: ITaskEvent
    googleEvent?: IGoogleEvent
  }
  type: string
  // title: string
  // isDraggable?: boolean
}

export interface IGoogleEvent {
  id: string
  start: Date
  end: Date
  title: string
  htmlLink: string
}

export interface ISchedule {
  _id: string
  userId: string
  name: string
  color: string
  type: string
  isActive: boolean
}

export interface ISprint {
  _id: string
  boardId: string
  name: string
  cardOrderIds: string[]
  cards: ISprintCard[]
  duration: number | string
  creatorId: string
  startDate: Date
  endDate: Date
  goal: string
  status: string
  dailyStoryPoints: IDailyStoryPoint[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  totalStoryPoint?: number
}
export interface IDailyStoryPoint {
  date?: Date
  storyPoints: number
}

export interface IPriority {
  _id: string
  boardId: string
  name: string
  description: string
  color: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  canDelete?: boolean
}

export interface IWSPermission {
  _id: string
  name: string
  memberIds: string[]
  description: string
  color: string
  member: { invite: boolean }
  board: { create: boolean; viewAll: boolean }
  isWSAdmin?: boolean
  isWSViewer?: boolean
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
}

export interface IUpdatableWSPermission {
  name?: string
  memberIds?: string[]
  description?: string
  color?: string
  member?: { invite?: boolean; viewAll?: boolean }
  board?: { create?: boolean }
}

export interface IIssueLinkType {
  _id: string
  boardId: string
  name: string
  inwardName: string
  outwardName: string
  createdAt: Date
  updatedAt: Date
  canDelete?: boolean
}
export interface IEpic {
  _id: string
  boardId: string
  name: string
  description: string
  startDate: Date
  dueDate: Date
  cardOrderIds: string[]
  color: string
  preEpicId: string
  nextEpicId: string
  columnId: string
  assigneeId: string
  labelId: string
  priorityId: string
  comments: IComment[]
  attachments: IAttachment[]
  issueTypeId: string
}

export interface IComment {
  user: string
  email: string
  avatar: string
  displayName: string
  content: string
  createdAt: Date
}
export interface IAttachment {
  fileName: string
  fileType: string
  fileUrl: string
  createAt: Date
}

export interface IIssueLink {
  _id: string
  boardId: string
  name: string
  description: string
  direction: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface IDescription {
  content: string
  formatter: string
}

export interface ISprintCard {
  column: {
    _id: string
    title: string
    isResolved: boolean
  }
  issueType: {
    _id: string
    name: string
  }
  storyPoint: number
  title: string
  _id: string
  assignee?: {
    avatar: string
    fullName: string
    _id: string
  }
}

export interface ITaskLog {
  _id?: string
  userId: string
  target: string
  msg: string
  oldVal?: string
  newVal?: string
  issueModel: string
  issueId: string
  createdAt?: Date
  updatedAt?: Date
}
