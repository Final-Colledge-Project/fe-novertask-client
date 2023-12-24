import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  ICreateLabelBody,
  IGetAllByBoardBody,
  IUpdateLabelBody
} from './reqTypes'
import requests from './requests'
import {
  ICreateLabelResponse,
  IGetAllByBoardResponse,
  IUpdateLabelResponse
} from './resTypes'

export const getAllByBoard = async (body: IGetAllByBoardBody) => {
  try {
    const res = await axiosInstance.get<IGetAllByBoardResponse>(
      requests.getAllByBoard(body.boardId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Board not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createLabel = async (body: ICreateLabelBody) => {
  try {
    const res = await axiosInstance.post<ICreateLabelResponse>(
      requests.createLabel,
      body
    )

    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 404) {
      throw new Error('Board not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateLabel = async (body: IUpdateLabelBody) => {
  try {
    const res = await axiosInstance.patch<IUpdateLabelResponse>(
      requests.updateLabel(body.labelId),
      {
        ...body.changes
      }
    )

    if (res && res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 404) {
      throw new Error('Label not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
