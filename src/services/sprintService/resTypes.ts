import { ISprint as IGeneralSprint } from '../types'
export interface ISprint {
  _id: string
  name: string
  startDate: Date
  endDate: Date
  creatorId: string
  status: string
  totalStoryPoint: number
  completedStoryPoint: number
  completedTasks: {
    _id: string
    title: string
    storyPoint: number
    assignees: string
    priority: string
    issueTypeId: string
  }[]
}

export interface ISprintByBoardResponse {
  data: ISprint
  message: string
}

export interface ICreateSprintResponse {
  data: ISprint
  message: string
}

export interface IGetAllSprintDetailResponse {
  message: string
  data: IGeneralSprint[]
}
