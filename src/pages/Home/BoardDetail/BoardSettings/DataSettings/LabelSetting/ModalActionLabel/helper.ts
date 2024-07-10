import { ILabel } from '~/services/types'
import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { CommonSettingType } from '../../helper'
export interface IActionLabelModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  selectedLabel: CommonSettingType | null
  refetch: () => void
  setSelectedLabel: (issueType: ILabel | null) => void
}

export interface IFormFields extends FieldValues {
  name: string
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Issue type name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters')
})
