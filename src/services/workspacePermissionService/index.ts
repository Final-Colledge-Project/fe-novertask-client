import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance.ts'
import {
  ICreateWSPermissionBody,
  IGetWSPermissionByUserIdBody,
  IGetWSPermissionBody,
  IUpdateWSPermissionBody,
  IDeleteWSPermissionBody
} from './reqTypes.ts'
import requests from './requests.ts'
import {
  ICreateWSPermissionResponse,
  IGetWSPermissionByUserIdResponse,
  IGetWSPermissionResponse
} from './resTypes.ts'
import { IErrorResponse } from '../types.ts'
import { IDeleteBoardPermissionResponse } from '../boardPermissionService/resTypes.ts'

export const createWSPermission = async (body: ICreateWSPermissionBody) => {
  try {
    const res = await axiosInstance.post<ICreateWSPermissionResponse>(
      requests.createWSPermission(body.wsId),
      body.wsPermission
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

export const getWSPermission = async (body: IGetWSPermissionBody) => {
  try {
    const res = await axiosInstance.get<IGetWSPermissionResponse>(
      requests.getWSPermission(body.id)
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

export const getWSPermissionByUserId = async (
  body: IGetWSPermissionByUserIdBody
) => {
  try {
    const res = await axiosInstance.get<IGetWSPermissionByUserIdResponse>(
      requests.getWSPermissionByUserId(body.userId)
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

export const updateWSPermission = async (body: IUpdateWSPermissionBody) => {
  try {
    const res = await axiosInstance.patch<IUpdateWSPermissionBody>(
      requests.updateWSPermission(body.permissionId),
      body.wsPermission
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
export const deleteWSPermission = async (body: IDeleteWSPermissionBody) => {
  try {
    const res = await axiosInstance.delete<IDeleteBoardPermissionResponse>(
      requests.deleteWSPermission(body.permissionId, body.wsId)
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
