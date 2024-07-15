import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  ICreateSprintResponse,
  IGetAllSprintDetailResponse,
  ISprintByBoardResponse
} from './resTypes'
import requests from './request'
import { ICreateSprintBody, IUpdateSprintBody } from './reqTypes'

export const getAllSprintsByBoard = async (boardId: string) => {
  try {
    const res = await axiosInstance.get<ISprintByBoardResponse>(
      requests.getAllByBoard(boardId)
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

export const createSprint = async (body: ICreateSprintBody) => {
  try {
    const res = await axiosInstance.post<ICreateSprintResponse>(
      requests.createSprint(body.boardId),
      body.sprint
    )
    if (res && res.status === 200 && res.data) {
      return res.data
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

export const getAllSprintsDetail = async (boardId: string) => {
  try {
    const res = await axiosInstance.get<IGetAllSprintDetailResponse>(
      requests.getAllSprintDetail(boardId)
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

export const updateSprint = async (body: IUpdateSprintBody) => {
  try {
    const res = await axiosInstance.patch<IGetAllSprintDetailResponse>(
      requests.updateSprint(body.sprint._id, body.boardId),
      {
        ...body.sprint
      }
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
