import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  IAssignMemberToCardBody,
  ICreateCardBody,
  IGetCardBody,
  IGetCardMembersBody,
  IUpdateCardBody,
  IUpdateCoverBody
} from './reqTypes'
import requests from './requests'
import {
  IAssignMemberToCardReponse,
  IAssignedToMeResponse,
  IGetMemberInCardResponse,
  IUpdateCoverResponse
} from './resTypes'
import { IErrorResponse } from '../types'

export const createCard = async (body: ICreateCardBody) => {
  try {
    const res = await axiosInstance.post(requests.createCard, body)
    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateCard = async (body: IUpdateCardBody) => {
  try {
    const res = await axiosInstance.patch(
      requests.updateCard(body.cardId),
      body.changes
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Update card failed!')
    }
    if (status && status === 403) {
      throw new Error('You are not a member of this board!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateOnlyCoverCard = async (body: IUpdateCoverBody) => {
  try {
    const res = await axiosInstance.patchForm<IUpdateCoverResponse>(
      requests.updateCover(body.cardId),
      {
        cover: body.file
      }
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Update card failed!')
    }
    if (status && status === 403) {
      throw new Error('You are not a member of this board!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getCard = async (body: IGetCardBody) => {
  try {
    const res = await axiosInstance.get(requests.getCard(body.cardId))
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Card not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getMemberInCard = async (body: IGetCardMembersBody) => {
  try {
    const res = await axiosInstance.get<IGetMemberInCardResponse>(
      requests.getMemberInCard(body.cardId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Card not found!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const assignMemberToCard = async (body: IAssignMemberToCardBody) => {
  try {
    const res = await axiosInstance.patch<IAssignMemberToCardReponse>(
      requests.assignMember(body.cardId, body.memberId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse
      throw new Error(errorData.message)
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const cardAssignToMe = async () => {
  try {
    const res = await axiosInstance.get<IAssignedToMeResponse>(requests.assignedToMe)
    console.log('~~~~~~~~~~>KhiemLd')
    if (res && res.status === 200 && res.data) {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>Test')
      return res.data
    }
  }
  catch(error) {
    throw new Error('Something went wrong! Please try later.')
  }
}
