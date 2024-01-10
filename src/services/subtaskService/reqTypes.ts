import { IUpdatableSubtask } from '../types'

export interface IGetAllSubtasksBody {
  cardId: string
}

export interface IUpdateSubtaskBody {
  subtaskId: string
  changes: IUpdatableSubtask
}

export interface ICreateSubtaskBody {
  cardId: string
  name: string
}
