import { IModifyIssueLinkTypeBody } from '~/services/issueLinkTypeService/reqTypes'

export interface ICreateIssueLinkType {
  boardId: string
  data: IModifyIssueLinkTypeBody
  cb: () => void
}

export interface IUpdateIssueLinkType {
  issueLinkTypeId: string
  boardId: string
  data: IModifyIssueLinkTypeBody
  cb: () => void
}

export interface IDeleteIssueLinkType {
  issueLinkTypeId: string
  boardId: string
  cb: () => void
}
