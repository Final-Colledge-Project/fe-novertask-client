import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IAssignAdminBody, ICreateWSBody, IGetMemberBody } from './reqTypes'
import requests from './requests'
import {
  IAssignAdminResponse,
  ICreateWSResponse,
  IErrorResponse,
  IGetMemberResponse
} from './resTypes'
import data from '../mockData.json'
export type * from './reqTypes'

export const createWorkspace = async (body: ICreateWSBody) => {
  try {
    const res = await axiosInstance.post<ICreateWSResponse>(
      requests.createWS,
      body
    )

    // send otp success
    if (res.status === 201) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // name is duplicated
    if (status && status === 409) {
      throw new Error(
        `Team workspace "${body.name}" is already exist! Try another name.`
      )
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getFakeData = async () => {
  try {
    const res = await new Promise((res) => {
      setTimeout(() => {
        res(data)
      }, 3000)
    })
    if (res) return res
  } catch (error) {
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getMembers = async (body: IGetMemberBody) => {
  try {
    const res = await axiosInstance.get<IGetMemberResponse>(
      requests.getMembers(body.id)
    )

    // get member successfully
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // user is not allowed to or workspace is not exists
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const assignAdmin = async (body: IAssignAdminBody) => {
  try {
    const res = await axiosInstance.post<IAssignAdminResponse>(
      requests.assignAdmin(body.wsID),
      {
        emailUser: body.emailUser
      }
    )

    // assign admin successfully
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // 409: throw the error form api
    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // user is already admin
      if (errorData.message === 'User is already admin') {
        throw new Error(`User is already admin!`)
      }
      // user is not member
      if (errorData.message === 'User is not member') {
        throw new Error('Account for this email is not exist!')
      }
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
