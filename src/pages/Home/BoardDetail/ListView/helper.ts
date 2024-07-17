export interface IGeneralIssue {
  _id: string
  boardId: string
  hierarchy: number
  taskId: string
  name: string
  description: string
  issueType: IIssueTypeCol
  status: IStatusCol
  assignee: IAssigneeCol
  storyPoint?: number
  sprint?: ISprintCol
  startDate: string
  dueDate: string
  label: ILabelCol
  priority: IPriorityCol
  resolvedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface IIssueTypeCol {
  _id: string
  name: string
  icon: string
}

export interface IStatusCol {
  _id: string
  title: string
  color: string
}

export interface IAssigneeCol {
  _id: string
  fullName: string
  avatar: string
}

export interface ISprintCol {
  _id: string
  name: string
}

export interface ILabelCol {
  _id: string
  name: string
  color: string
}

export interface IPriorityCol {
  _id: string
  name: string
  color: string
}
