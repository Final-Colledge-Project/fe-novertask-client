import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import requests from './request'
import { IPriorityResponse } from './resType'
import { IModifyPriorityBody } from './reqTypes'
export const getAllPrioritiesByBoard = async (
  boardId: string,
  query: string
) => {
  try {
    const res = await axiosInstance.get<IPriorityResponse>(
      requests.getAllByBoard(boardId, query)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createPriorityService = async (
  boardId: string,
  data: IModifyPriorityBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.post(requests.createPriority(boardId), data)
    if (res && res.status === 201) {
      cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updatePriorityService = async (
  priorityId: string,
  boardId: string,
  data: IModifyPriorityBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.put(
      requests.updatePriority(priorityId, boardId),
      data
    )
    if (res && res.status === 200) {
      cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const deletePriorityService = async (
  priorityId: string,
  boardId: string,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.delete(
      requests.deletePriority(priorityId, boardId)
    )
    if (res && res.status === 200) {
      cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}
