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
