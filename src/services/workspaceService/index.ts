import axiosInstance from '../axiosInstance'
import { ICreateWSBody } from './reqTypes'
import requests from './requests'
import { ICreateWSResponse } from './resTypes'

export const createWorkSpace = async (body: ICreateWSBody) => {
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
    console.log(error)

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
