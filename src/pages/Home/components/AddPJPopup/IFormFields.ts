import { FieldValues } from 'react-hook-form'

export default interface IFormFields extends FieldValues {
  PJName: string
  workspace: string
  description: string
}
