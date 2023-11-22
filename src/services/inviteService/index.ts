import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  IGetDetailBody,
  IRespondInvitationBody,
  ISendInvitationBody
} from './reqTypes'
import { IGetDetailResponse } from './resTypes'
import requests from './requests'
import { IErrorResponse } from '../types'

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

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // invitation is not found
      if (errorData.message === 'Invitation not found') {
        throw new Error(`Invitation not found!`)
      }
      // // workspace not found
      // if (errorData.message === 'Workspace not found') {
      //   throw new Error(
      //     "Workspace not found.  Please check the invitation you've received"
      //   )
      // }
      // // already in
      // if (errorData.message === 'User is already a member') {
      //   throw new Error('You are already a member of this workspace.')
      // }
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const respondInvitation = async (body: IRespondInvitationBody) => {
  try {
    const res = await axiosInstance.patchForm(
      requests.respondInvitation(
        body.wsID,
        body.isAccepted ? 'accepted' : 'rejected'
      ),
      {
        emailUser: body.email
      }
    )
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // invitation is not found
      if (errorData.message === 'Invitation not found') {
        throw new Error(
          `Invitation not found. Please check the invitation you've received`
        )
      }
      // workspace not found
      if (errorData.message === 'Workspace not found') {
        throw new Error(
          "Workspace not found.  Please check the invitation you've received"
        )
      }
      // already in
      if (errorData.message === 'User is already a member') {
        throw new Error('You are already a member of this workspace.')
      }
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
    if (res.status === 201) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // 409: throw the error form api
    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // user is not found
      if (errorData.message === 'User not found') {
        throw new Error(`Account for this email is not exist!`)
      }
      // workspace not found
      if (errorData.message === 'Workspace not found') {
        throw new Error('Workspace not found!')
      }
      // already in
      if (errorData.message === 'User is already a member') {
        throw new Error('This user is already a member of this workspace.')
      }
      // update invitation failed
      if (errorData.message === 'Update invitation failed') {
        throw new Error('This user is already a member of this workspace.')
      }
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
