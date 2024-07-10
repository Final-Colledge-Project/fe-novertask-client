import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { IIssueLinkTypeResponse } from './resType'
import requests from './request'
import { IModifyIssueLinkTypeBody } from './reqTypes'

export const getAllIssueLinkTypes = async (boardId: string, query: string) => {
  try {
    const res = await axiosInstance.get<IIssueLinkTypeResponse>(
      requests.getAllByBoard(boardId, query)
    )
    if (res && res.status === 200 && res.data) {
      return res.data.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status
    const message = (error as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const createIssueLinkTypeService = async (
  boardId: string,
  data: IModifyIssueLinkTypeBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.post(
      requests.createIssueLinkType(boardId),
      data
    )
    if (res && res.status === 201) {
      cb && cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const updateIssueLinkTypeService = async (
  issueLinkTypeId: string,
  boardId: string,
  data: IModifyIssueLinkTypeBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.put(
      requests.updateIssueLinkType(issueLinkTypeId, boardId),
      data
    )
    if (res && res.status === 200) {
      cb && cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}

export const deleteIssueLinkTypeService = async (
  issueLinkTypeId: string,
  boardId: string,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.delete(
      requests.deleteIssueLinkType(issueLinkTypeId, boardId)
    )
    if (res && res.status === 200) {
      cb && cb()
    }
  } catch (err) {
    const status = (err as AxiosError).response?.status
    const message = (err as AxiosError).message
    if (status && status.toString().startsWith('4')) {
      throw new Error(message)
    }
    throw new Error('Something went wrong! Please try later.')
  }
}
