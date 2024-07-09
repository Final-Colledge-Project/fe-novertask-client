import { IIssueType } from '~/services/types'
import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
export interface IActionIssueTypeModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  selectedIssueType?: IIssueType | null
  refetch: () => void
  setSelectedIssueType: (issueType: IIssueType | null) => void
}

export interface IFormFields extends FieldValues {
  name: string
  description?: string
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Issue type name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters'),
  description: yup.string().max(300, 'Maximum 30 characters')
})
