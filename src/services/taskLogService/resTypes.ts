import { ITaskLog } from '../types'

export interface IGetIssueLogResponse {
  data: ITaskLog[]
  message: string
}
