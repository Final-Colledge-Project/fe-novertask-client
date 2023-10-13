import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  phone: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
  birthday: Date
  address: string
}
