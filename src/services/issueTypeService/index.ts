import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import requests from './request'
import { IIssueTypeResponse } from './resTypes'
import { IModifyIssueTypeBody } from './reqTypes'
export const getAllIssueTypesByBoard = async (
  boardId: string,
  query: string
) => {
  try {
    const res = await axiosInstance.get<IIssueTypeResponse>(
      requests.getAllByBoard(boardId, query)
    )
    if (res && res.status === 200 && res.data) {
      return res.data?.data
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

export const createIssueTypeService = async (
  boardId: string,
  data: IModifyIssueTypeBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.post(
      requests.createIssueType(boardId),
      data
    )
    if (res && res.status === 201) {
      cb()
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

export const updateIssueTypeService = async (
  issueTypeId: string,
  boardId: string,
  data: IModifyIssueTypeBody,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.put(
      requests.updateIssueType(issueTypeId, boardId),
      data
    )
    if (res && res.status === 200) {
      cb()
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

export const deleteIssueTypeService = async (
  issueTypeId: string,
  boardId: string,
  cb: () => void
) => {
  try {
    const res = await axiosInstance.delete(
      requests.deleteIssueType(issueTypeId, boardId)
    )
    if (res && res.status === 200) {
      cb()
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
