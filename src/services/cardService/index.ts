import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import {
  IAssignMemberToCardBody,
  ICreateCardBody,
  IDeleteAttachmentBody,
  IDeleteCard,
  IDownloadAttachmentBody,
  IGetCardBody,
  IGetCardMembersBody,
  IUnassignMemberToCardBody,
  IUpdateCardBody,
  IUpdateCoverBody
} from './reqTypes'
import requests from './requests'
import {
  IAssignMemberToCardReponse,
  IAssignedToMeResponse,
  IGetMemberInCardResponse,
  IUnassignMemberToCardReponse,
  IUpdateCoverResponse
} from './resTypes'
import { IErrorResponse } from '../types'

export const createCard = async (body: ICreateCardBody) => {
  try {
    const res = await axiosInstance.post(
      requests.createCard(body.boardId),
      body
    )
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
      requests.updateCard(body.cardId, body.boardId),
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
      requests.updateCover(body.cardId, body.boardId),
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
      requests.assignMember(body.cardId, body.boardId),
      { memId: body.memberId }
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

export const unassignMemberToCard = async (body: IUnassignMemberToCardBody) => {
  try {
    const res = await axiosInstance.patch<IUnassignMemberToCardReponse>(
      requests.unAssignMember(body.cardId, body.boardId),
      { memId: body.memberId }
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
    const res = await axiosInstance.get<IAssignedToMeResponse>(
      requests.assignedToMe
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    throw new Error('Something went wrong! Please try later.')
  }
}

export const deleteCard = async (body: IDeleteCard) => {
  try {
    const res = await axiosInstance.delete(
      requests.deleteCard(body.cardId, body.boardId)
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Delete card failed!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const deleteAttachment = async (body: IDeleteAttachmentBody) => {
  try {
    const res = await axiosInstance.delete(
      requests.deleteAttachment(body.cardId, body.boardId),
      {
        params: {
          fileName: body.fileName
        }
      }
    )
    if (res && res.status === 200 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Delete attachment failed!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const downloadAttachment = async (body: IDownloadAttachmentBody) => {
  try {
    const res = await axiosInstance.get(
      requests.downloadAttachment(body.cardId, body.boardId),
      {
        params: {
          fileName: body.fileName
        }
        // responseType: 'blob'
      }
    )
    if (res) {
      return res
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      throw new Error('Download attachment failed!')
    }

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
