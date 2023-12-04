import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IGetColumnsInBoardBody, IUpdateColumnBody } from './reqTypes.ts'
import requests from './requests'
import {
  IGetColumnsInBoardResponse,
  IUpdateColumnResponse
} from './resTypes.ts'
import { ICreateColumnResponse } from './resTypes.ts'
import { ICreateColumnBody } from './reqTypes.ts'
import { IErrorResponse } from '../types'

export const getColumnInBoard = async (body: IGetColumnsInBoardBody) => {
  try {
    const res = await axiosInstance.get<IGetColumnsInBoardResponse>(
      requests.getColumnInBoard(body.id as string)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createColumn = async (body: ICreateColumnBody) => {
  try {
    const res = await axiosInstance.post<ICreateColumnResponse>(
      requests.createColumn,
      body
    )
    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // board is not found
      if (errorData.message === 'Board not found') {
        throw new Error(`Board not found!`)
      }
      // duplicate column name
      if (errorData.message === 'Column with title Done already exists') {
        throw new Error('Column with title Done already exists')
      }
    }

    // user is not an admin
    if (status && status === 403) {
      throw new Error('Only admin users can create a new column!')
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateColumn = async (body: IUpdateColumnBody) => {
  try {
    const res = await axiosInstance.patch<IUpdateColumnResponse>(
      requests.updateColumn(body.id as string),
      body.changes
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // column not found
      if (errorData.message === 'Column not found') {
        throw new Error('Column not found')
      }
    }

    // user is not an admin
    if (status && status === 403) {
      throw new Error('You are not member of this board')
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
