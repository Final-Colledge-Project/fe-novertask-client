import { IModifyIssueTypeBody } from '~/services/issueTypeService/reqTypes'

export interface ICreateIssueType {
  boardId: string
  data: IModifyIssueTypeBody
  cb: () => void
}

export interface IUpdateIssueType {
  issueTypeId: string
  boardId: string
  data: IModifyIssueTypeBody
  cb: () => void
}

export interface IDeleteIssueType {
  issueTypeId: string
  boardId: string
  cb: () => void
}
