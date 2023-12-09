import { AxiosError } from 'axios'
import axiosInstance from '../axiosInstance'
import { ICreateCardBody, IUpdateCardBody } from './reqTypes'
import requests from './requests'

export const createCard = async (body: ICreateCardBody) => {
  try {
    const res = await axiosInstance.post(requests.createCard, body)
    if (res && res.status === 201 && res.data) {
      return res.data
    }
  } catch (error) {
    const status = (error as AxiosError).response?.status

    if (status && status === 409) {
      // const errorData: IErrorResponse = (error as AxiosError).response
      //   ?.data as IErrorResponse
      // // board is not found
      // if (errorData.message === 'Board not found') {
      //   throw new Error(`Board not found!`)
      // }
      // // duplicate column name
      // if (errorData.message === 'Column with title Done already exists') {
      //   throw new Error('Column with title Done already exists')
      // }
    }

    // // user is not an admin
    // if (status && status === 403) {
    //   throw new Error('Only admin users can create a new column!')
    // }
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
