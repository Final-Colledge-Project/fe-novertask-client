import { ISchedule } from '../types'

export interface IGetSchedulesByUserIdResponse {
  data: ISchedule[]
}

export interface IAddScheduleResponse {
  message: string
}

export interface IUpdateScheduleResponse {
  message: string
}
