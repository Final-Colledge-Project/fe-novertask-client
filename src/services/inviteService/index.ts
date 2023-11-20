import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  IGetDetailBody,
  IRespondInvitationBody,
  ISendInvitationBody
} from './reqTypes'
import { IGetDetailResponse } from './resTypes'
import requests from './requests'

export const getDetail = async (body: IGetDetailBody) => {
  try {
    const res = await axiosInstance.get<IGetDetailResponse>(
      requests.getDetail + `/${body.id}`
    )

    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // invatation is not exist
    if (status && status === 500) {
      throw new Error(`Invitation is not exist! Please check your email.`)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const respondInvitation = async (body: IRespondInvitationBody) => {
  try {
    const res = await axiosInstance.patch(
      requests.respondInvitation(
        body.wsID,
        body.isAccepted ? 'accepted' : 'rejected'
      ),
      {
        emailUser: body.email
      }
    )
    if (res.status === 2000) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message

    // 409: throw the error form api
    if (status && status === 409) {
      throw new Error(message)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const sendInvitation = async (body: ISendInvitationBody) => {
  try {
    const res = await axiosInstance.post(requests.sendInvitation(body.wsID), {
      emailUser: body.email
    })
    if (res.status === 2000) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message

    // 409: throw the error form api
    if (status && status === 409) {
      throw new Error(message)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
