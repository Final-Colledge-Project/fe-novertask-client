import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  columnId: string
  title: string
  description: string
  labelId: string
  priorityId: string
  reporterId: string
  assigneeId: string
  sprintId: string
  epicId: string
  issueTypeId: string
  storyPoint: number
}
