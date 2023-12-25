import { IAssignedCard, ICard } from '../types'

export interface ICreateCardResponse {
  data: ICard
  message: string
}
export interface IUpdateCardResponse {
  data: ICard
  message: string
}

export interface IGetCardResponse {
  data: ICard
  message: string
}

export interface IGetMemberInCardResponse {
  data: {
    _id: string
    members: {
      _id: string
      avatar: string
      fullName: string
    }[]
  }
  message: string
}

export interface IUpdateCoverResponse {
  data: string
  message: string
}

export interface IAssignMemberToCardReponse {
  message: string
}

export interface IAssignedToMeResponse {
  data: IAssignedCard[],
  message: string
}