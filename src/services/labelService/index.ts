import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  ICreateLabelBody,
  IDeleteLabelBody,
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
    const message = (error as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createLabel = async (body: ICreateLabelBody) => {
  try {
    const res = await axiosInstance.post<ICreateLabelResponse>(
      requests.createLabel(body.boardId),
      body
    )

    if (res && res.status === 201 && res.data) {
      body.cb && body.cb()
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

export const updateLabel = async (body: IUpdateLabelBody) => {
  try {
    const res = await axiosInstance.patch<IUpdateLabelResponse>(
      requests.updateLabel(body.labelId, body.boardId),
      {
        ...body.changes
      }
    )
    if (res && res.status === 200) {
      body.cb && body.cb()
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

export const deleteLabel = async (body: IDeleteLabelBody) => {
  try {
    await axiosInstance.delete(requests.deleteLabel(body.labelId, body.boardId))
    body.cb && body.cb()
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}
