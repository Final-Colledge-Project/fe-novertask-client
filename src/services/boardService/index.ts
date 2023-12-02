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
  ICreateBoardBody,
  IGetAllByWSIdBody,
  IGetBoardDetailBody,
  IGetMemberInBoardBody
} from './reqTypes'
import { AxiosError } from 'axios'

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
