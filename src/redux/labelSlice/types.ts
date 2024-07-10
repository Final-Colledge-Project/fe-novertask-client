import {
  ICreateLabelBody,
  IUpdateLabelBody
} from '~/services/labelService/reqTypes'

export interface ICreateLabel {
  data: ICreateLabelBody
}

export interface IUpdateLabel {
  data: IUpdateLabelBody
}

export interface IDeleteLabel {
  issueTypeId: string
  boardId: string
  cb: () => void
}
