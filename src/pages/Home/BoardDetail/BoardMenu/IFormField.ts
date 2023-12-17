import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  title: string
  description: string
  dueDate?: string | undefined | null // YYYY-MM-DD HH:mm:ss,
}
