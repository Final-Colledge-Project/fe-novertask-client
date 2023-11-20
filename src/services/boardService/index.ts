import axiosInstance from '../axiosInstance'
import { IGetAllByUserIdResponse } from './resTypes'
import requests from './requests'

export const getAllByUserId = async () => {
  try {
    const res = await axiosInstance.get<IGetAllByUserIdResponse>(
      requests.getAllByUserId
    )

    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    // const status = (error as AxiosError).response?.status

    // // invatation is not exist
    // if (status && status === 500) {
    //   throw new Error(`Invitation is not exist! Please check your email.`)
    // }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
