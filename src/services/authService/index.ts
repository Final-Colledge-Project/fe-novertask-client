import axiosInstance from '../axiosInstance'
import { ILoginResponse } from './resTypes'
import { ISignInBody } from './reqTypes'
import requests from './requests'
import { AxiosError } from 'axios'

export const signIn = async (body: ISignInBody) => {
  try {
    const res = await axiosInstance.post<ILoginResponse>(
      requests.signIn.url,
      body
    )

    if (res.status === 201) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // credentials is wrong
    if (status && status === 400) {
      throw new Error(
        `Wrong credentials! Please check your email and password.`
      )
    }

    // email is not exist
    if (status && status === 409) {
      throw new Error(
        `Email at ${body.email} is not exist. Please check your email.`
      )
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
