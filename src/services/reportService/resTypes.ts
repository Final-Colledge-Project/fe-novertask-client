export interface IDailyStoryPoints {
  date: string
  storyPoints: number
  _id: string
}

export interface IBurnDownReport {
  _id: string
  boardId: string
  name: string
  startDate: string
  endDate: string
  dailyStoryPoints: IDailyStoryPoints[]
  totalStoryPoint: number
}
export interface IGetBurnDownReportResponse {
  data: IBurnDownReport
  message: string
}

export interface IGetVelocityReport {
  data: [
    {
      _id: string
      name: string
      totalStoryPoint: number
      completedStoryPoint: number
    }
  ]
  message: string
}

export interface ISprintReportResponse {
  data: ISprintReport
  message: string
}

export interface ISprintReport {
  _id: string
  name: string
  startDate: Date
  endDate: Date
  creatorId: string
  status: string
  totalStoryPoint: number
  completedStoryPoint: number
  completedTasks: ICompletedTask[]
}

export interface ICompletedTask {
  _id: string
  cardId: string
  title: string
  storyPoint: number
  assignees: string
  priorityId: string
  issueTypeId: string
}

export interface IAverageTaskAge {
  _id: string
  taskId: string
  name: string
  age: number
  createDate: Date
  status: string
}

export interface IAverageAgeReportResponse {
  data: {
    averageAge: number
    averageEachTask: IAverageTaskAge[]
  }
  message: string
}
