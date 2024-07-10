import { IModifyPriorityBody } from '~/services/priorityService/reqTypes'

export interface ICreatePriority {
  boardId: string
  data: IModifyPriorityBody
  cb: () => void
}

export interface IUpdatePriority {
  priorityId: string
  boardId: string
  data: IModifyPriorityBody
  cb: () => void
}

export interface IDeletePriority {
  priorityId: string
  boardId: string
  cb: () => void
}
