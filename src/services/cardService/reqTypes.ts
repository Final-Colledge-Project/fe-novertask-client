import { IUpdatableCard } from '../types'

export interface ICreateCardBody {
  columnId: string
  title: string
  dueDate?: string
  labelId?: string
  priorityId?: string
  description?: string
}

export interface IUpdateCardBody {
  cardId: string
  changes: IUpdatableCard
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
}

export interface IAssignMemberToCardBody{
  cardId: string
  memberId: string
}
