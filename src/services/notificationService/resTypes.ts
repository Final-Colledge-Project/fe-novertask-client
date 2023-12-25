import {INotificationItem } from '../types'

export interface IGetNotificationsByUserIdResponse {
  data: INotificationItem
  message: string
}

export interface IMarkReadNotificationResponse {
  message: string
}