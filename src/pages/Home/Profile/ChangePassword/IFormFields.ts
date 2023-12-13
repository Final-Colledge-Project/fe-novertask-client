import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  currentPassword: string
  newPassword: string
  repeatNewPassword: string
}
