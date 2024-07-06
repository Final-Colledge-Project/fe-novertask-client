import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  name: string
  description: string
  color: string
  memberIds: string[]
  board: { create: boolean; viewAll: boolean }
  member: { invite: boolean }
}
