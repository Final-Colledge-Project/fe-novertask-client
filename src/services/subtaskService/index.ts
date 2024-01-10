import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  ICreateSubtaskBody,
  IGetAllSubtasksBody,
  IUpdateSubtaskBody
} from './reqTypes'
import requests from './requests'
import { ICreateSubtaskResponse, IUpdateSubtaskResponse } from './resTypes'

export const getAllSubTaskInCard = async (body: IGetAllSubtasksBody) => {
  try {
    const res = await axiosInstance.get(requests.getAllSubtask(body.cardId))
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Card not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateSubtask = async (body: IUpdateSubtaskBody) => {
  try {
    const res = await axiosInstance.patch<IUpdateSubtaskResponse>(
      requests.updateSubtask(body.subtaskId),
      body.changes
    )

    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Subtask not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createSubtask = async (body: ICreateSubtaskBody) => {
  try {
    const res = await axiosInstance.post<ICreateSubtaskResponse>(
      requests.createSubtask,
      body
    )
    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Card not found!')
    }

    if (status && status === 400) {
      throw new Error('Title must have 2~50 characters')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
