import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { ICreateWSBody, IGetMemberBody } from './reqTypes'
import requests from './requests'
import { ICreateWSResponse, IGetMemberResponse } from './resTypes'
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

    // workspace is not exists or user not in this workspace
    if (status && status === 409) {
      throw new Error(`Get member in this workspace fail!`)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
