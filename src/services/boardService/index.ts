import axiosInstance from '../axiosInstance'
import {
  ICreateBoardResponse,
  IGetAllByUserIdResponse,
  IGetAllByWSIdResponse,
  IGetBoardDetailResponse,
  IGetMemberInBoardResponse
} from './resTypes'
import requests from './requests'
import {
  IAddMemberToBoardBody,
  IAssignAdminBody,
  ICreateBoardBody,
  IGetAllByWSIdBody,
  IGetBoardDetailBody,
  IGetMemberInBoardBody,
  IRevokeAdminBody,
  IUpdateBoardBody
} from './reqTypes'
import { AxiosError } from 'axios'
import { IErrorResponse } from '../types'

// it's the same with get all workspace of current user
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

    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getAllByWSId = async (body: IGetAllByWSIdBody) => {
  try {
    const res = await axiosInstance.get<IGetAllByWSIdResponse>(
      // handle option first
      requests.getAllByWSId(body.wsId)
    )
    if (res && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createBoard = async (body: ICreateBoardBody) => {
  try {
    const res = await axiosInstance.post<ICreateBoardResponse>(
      requests.createBoard,
      body
    )
    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const getBoardDetail = async (body: IGetBoardDetailBody) => {
  try {
    const res = await axiosInstance.get<IGetBoardDetailResponse>(
      requests.getBoardDetail(body.id)
    )
    if (res && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    // user is not allowed to
    if (status && status === 403) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
export const getAllMemberInBoard = async (body: IGetMemberInBoardBody) => {
  try {
    const res = await axiosInstance.get<IGetMemberInBoardResponse>(
      requests.getMemberInBoard(body.id)
    )
    if (res && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    // user is not allowed to
    if (status && status === 409) {
      throw new Error(`UNAUTHORIZED`)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const addMember = async (body: IAddMemberToBoardBody) => {
  try {
    const res = await axiosInstance.patch(
      requests.addMemberToBoard(body.boardId),
      {
        memberIds: body.memberIds
      }
    )

    if (res && res.status) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // added member is not found
      if (errorData.message === 'Member not found') {
        throw new Error(`User being added is not found!`)
      }

      // added member is already added
      if (errorData.message === 'Member already exists') {
        throw new Error(`User being added is already in!`)
      }
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateBoard = async (body: IUpdateBoardBody) => {
  try {
    const res = await axiosInstance.patch(
      requests.updateBoard(body.boardId),
      body.changes
    )

    if (res && res.status) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 404) {
      throw new Error('Board not found')
    }

    if (status && status === 403) {
      throw new Error('You are not admin of this board')
    }

    if (status && status === 409) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      // added member is not found
      if (errorData.message === 'Board not updated') {
        throw new Error('Board not updated')
      }
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const assignMemberToAdmin = async (body: IAssignAdminBody) => {
  try {
    const res = await axiosInstance.patch(
      requests.assignAdmin(body.boardId, body.memberId)
    )

    if (res && res.status) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    if ((status && status === 409) || status === 403) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      throw new Error(errorData.message as string)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}

export const revokeAdmin = async (body: IRevokeAdminBody) => {
  try {
    const res = await axiosInstance.delete(
      requests.revokeAdmin(body.boardId, body.memberId)
    )

    if (res && res.status) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    if ((status && status === 409) || status === 403) {
      const errorData: IErrorResponse = (error as AxiosError).response
        ?.data as IErrorResponse

      throw new Error(errorData.message as string)
    }
    // general error
    throw new Error('Something went wrong! Please try later.')
  }
}
