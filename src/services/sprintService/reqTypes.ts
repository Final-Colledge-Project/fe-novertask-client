export interface ICreateSprintBody {
  boardId: string
  sprint: {
    name: string
    duration?: number
    startDate?: string
    endDate?: string
    goal?: string
  }
}

export interface IGetAllSprintDetailBody {
  boardId: string
}
