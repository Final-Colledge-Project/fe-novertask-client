import { IUpdatableCard } from '../types'

export interface ICreateCardBody {
  columnId: string
  title: string
  dueDate?: string
  labelId?: string
  priorityId?: string
  description?: string
  boardId: string // 2024-05-26 update permission
  // 2024-07 update sprint
  sprintId?: string
  epicId?: string
  issueTypeId?: string
  storyPoint?: number
  assigneeId?: string
  reporterId?: string
}

export interface IUpdateCardBody {
  cardId: string
  changes: IUpdatableCard
  boardId: string // 2024-05-26 update permission
}

export interface IGetCardBody {
  cardId: string
}

export interface IGetCardMembersBody {
  cardId: string
}

export interface IUpdateCoverBody {
  cardId: string
  file: File
  boardId: string // 2024-06-21 update permission
}

export interface IAssignMemberToCardBody {
  cardId: string
  memberId: string
  boardId: string // 2024-05-26 update permission
}

export interface IDeleteCard {
  cardId: string
  boardId: string // 2024-05-26 update permission
}

export interface IUnassignMemberToCardBody {
  cardId: string
  memberId: string
  boardId: string // 2024-05-26 update permission
}

export interface IDeleteAttachmentBody {
  cardId: string
  fileName: string
  boardId: string
}

export interface IDownloadAttachmentBody {
  cardId: string
  fileName: string
  boardId: string
}
