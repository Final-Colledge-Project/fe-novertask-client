import axiosInstance from '../axiosInstance'
import {
  ISendOTPResponse,
  IVerifyResponse,
  IErrorResponse,
  ISignUpResponse,
  IGetCurrentUserResponse
} from './resTypes'
import requests from './requests'
import { ISendOTP, ISignUpBody, IVerifyOTP } from './reqTypes'
import { AxiosError } from 'axios'

export const sendOTP = async (body: ISendOTP) => {
  try {
    const res = await axiosInstance.post<ISendOTPResponse>(
      requests.sendOTP,
      body
    )

    // send otp success
    if (res.status === 201) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // email is used
    if (status && status === 400) {
      throw new Error(
        `${body.email} is already used! Try another email address.`
      )
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const verifyOTP = async (body: IVerifyOTP) => {
  try {
    const res = await axiosInstance.post<IVerifyResponse>(
      requests.verifyOTP,
      body
    )

    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 400) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse
      // otp is wrong
      if (errorData.message === 'Invalid code passed. Check your inbox') {
        throw new Error(`Your input code is wrong. Please try again`)
      }
      // otp is not exist
      if (errorData.message === 'OTP record not found') {
        throw new Error('This OTP & email address is invalid. Please try again')
      }
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const signUp = async (body: ISignUpBody) => {
  try {
    const res = await axiosInstance.post<ISignUpResponse>(requests.signUp, body)

    if (res.status === 201) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // email is used
    if (status && status === 409) {
      throw new Error(
        `${body.email} is already used! Try another email address.`
      )
    }

    if (status && status === 400) {
      throw new Error('Your data is invalid! Please check it.')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get<IGetCurrentUserResponse>(
      requests.getCurrentUser
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    // general error
    throw new Error(
      (error as Error).message || 'Something went wrong! Please try later.'
    )
  }
}

export const signOut = async () => {
  try {

    // response is nothing
    await axiosInstance.get(requests.signOut)

  } catch (error) {

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
