import { ISubtask } from '../types'

export interface IGetAllSubtasksResponse {
  data: ISubtask[]
  message: string
}

export interface IUpdateSubtaskResponse {
  data: ISubtask
  message: string
}

export interface ICreateSubtaskResponse {
  data: ISubtask
  message: string
}
