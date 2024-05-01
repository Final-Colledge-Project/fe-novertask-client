import axiosInstance from '../axiosInstance'
import { IAddScheduleDto, IUpdateScheduleDto } from './reqTypes'
import requests from './request'
import { IAddScheduleResponse, IGetSchedulesByUserIdResponse, IUpdateScheduleResponse } from './resTypes'

export const getSchedulesByUserId = async () => {
  try {
    const res = await axiosInstance.get<IGetSchedulesByUserIdResponse>(
      requests.getSchedulesByUserId
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const addSchedules = async (data: IAddScheduleDto) => {
  try {
    const res = await axiosInstance.post<IAddScheduleResponse>(
      requests.addSchedule,
      data
    )
    if (res && res.status === 201) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateSchedule = async (id: string, data: IUpdateScheduleDto) => {
  try {
    const res = await axiosInstance.put<IUpdateScheduleResponse>(
      requests.updateSchedule(id),
      data
    )
    if (res && res.status === 200) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
