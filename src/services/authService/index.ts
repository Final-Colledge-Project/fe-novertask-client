import axiosInstance from '../axiosInstance'
import {
  IErrorResponse,
  IForgotPasswordResponse,
  ILoginResponse,
  IRefreshTokenResponse,
  IResetPasswordResponse
} from './resTypes'
import {
  IForgotPasswordBody,
  ILoginSuccessBody,
  IResetPasswordBody,
  ISignInBody
} from './reqTypes'
export type * from './reqTypes'
import requests from './requests'
import { AxiosError, AxiosResponse } from 'axios'

export const signIn = async (body: ISignInBody) => {
  try {
    const res = await axiosInstance.post<ILoginResponse>(requests.signIn, body)

    if (res.status === 200) {
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

export const forgotPassword = async (body: IForgotPasswordBody) => {
  try {
    const res = await axiosInstance.post<IForgotPasswordResponse>(
      requests.forgotPassword,
      body
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // no account matching email address
    if (status && status === 404) {
      throw new Error(
        `This email is not match any account as well. Please check your email.`
      )
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const resetPassword = async (body: IResetPasswordBody) => {
  try {
    const res = await axiosInstance.patch<IResetPasswordResponse>(
      requests.resetPassword,
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

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.get<IRefreshTokenResponse>(
      requests.refreshToken
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const response = (error as AxiosError)
      .response as AxiosResponse<IErrorResponse>

    // const status = response.status
    const message = response.data.message

    // refresh token is expired
    if (message === 'Unauthorized' || message === 'Invalid refresh token') {
      throw new Error('Token is expired or invalid! Please sign in.')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const loginSuccess = async (body: ILoginSuccessBody) => {
  try {
    const res = await axiosInstance.post<ILoginResponse>(requests.loginSuccess, body)
    if (res.status === 200) {
      return res.data
    }
  }
  catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
