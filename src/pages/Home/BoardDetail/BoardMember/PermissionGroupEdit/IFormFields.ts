import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  name: string
  description: string
  color: string
  memberIds: string[]
  column: { create: boolean, update: boolean, delete: boolean }
  card: { create: boolean, update: boolean, delete: boolean }
  member: {invite: boolean}
  issueType: { create: boolean, update: boolean, delete: boolean }
  priority: { create: boolean, update: boolean, delete: boolean }
  label: { create: boolean, update: boolean, delete: boolean }
}
