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
  ICreateBoardBody,
  IGetAllByWSIdBody,
  IGetBoardDetailBody,
  IGetMemberInBoardBody
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

    // // invatation is not exist
    // if (status && status === 500) {
    //   throw new Error(`Invitation is not exist! Please check your email.`)
    // }

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
