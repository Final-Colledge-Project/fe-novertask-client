import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  phone: string
  firstName: string
  lastName: string
  birthDate: string
  address: string
}
