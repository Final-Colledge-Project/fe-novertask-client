import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance.ts'
import {
  ICreateBoardPermissionBody,
  IDeleteBoardPermissionBody,
  IGetBoardPermissionBody,
  IGetBoardPermissionByUserIdBody,
  IUpdateBoardPermissionBody
} from './reqTypes.ts'
import requests from './requests.ts'
import {
  ICreateBoardPermissionResponse,
  IDeleteBoardPermissionResponse,
  IGetBoardPermissionByUserIdResponse,
  IGetBoardPermissionResponse
} from './resTypes.ts'
import { IErrorResponse } from '../types.ts'

export const createBoardPermission = async (
  body: ICreateBoardPermissionBody
) => {
  try {
    const res = await axiosInstance.post<ICreateBoardPermissionResponse>(
      requests.createBoardPermission(body.boardId),
      body.boardPermission
    )
    if (res && res.status === 201 && res.data) {
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

export const getBoardPermission = async (body: IGetBoardPermissionBody) => {
  try {
    const res = await axiosInstance.get<IGetBoardPermissionResponse>(
      requests.getBoardPermission(body.id)
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

export const getBoardPermissionByUserId = async (
  body: IGetBoardPermissionByUserIdBody
) => {
  try {
    const res = await axiosInstance.get<IGetBoardPermissionByUserIdResponse>(
      requests.getBoardPermissionByUserId(body.userId)
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

export const updateBoardPermission = async (
  body: IUpdateBoardPermissionBody
) => {
  try {
    const res = await axiosInstance.patch<IUpdateBoardPermissionBody>(
      requests.updateBoardPermission(body.permissionId),
      body.boardPermission
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

export const deleteBoardPermission = async (
  body: IDeleteBoardPermissionBody
) => {
  try {
    const res = await axiosInstance.delete<IDeleteBoardPermissionResponse>(
      requests.deleteBoardPermission(body.permissionId, body.boardId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const errorData: IErrorResponse = (error as AxiosError).response
      ?.data as IErrorResponse

    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }

    if (errorData.message) {
      throw new Error(errorData.message)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
