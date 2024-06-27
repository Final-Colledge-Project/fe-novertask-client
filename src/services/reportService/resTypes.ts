export interface IDailyStoryPoints {
  date: string
  storyPoints: number
  _id: string
}
export interface IGetBurnDownReport {
  data: {
    _id: string
    boardId: string
    name: string
    startDate: string
    endDate: string
    dailyStoryPoints: IDailyStoryPoints[]
    totalStoryPoint: number
  }
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
