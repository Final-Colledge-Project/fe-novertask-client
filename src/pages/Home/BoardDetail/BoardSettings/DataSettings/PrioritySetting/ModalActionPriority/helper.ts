import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { CommonSettingType } from '../../helper'
import { IPriority } from '~/services/types'
export interface IActionPriorityModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  selectedPriority?: CommonSettingType | null
  refetch: () => void
  setSelectedPriority: (priority: IPriority | null) => void
}

export interface IFormFields extends FieldValues {
  name: string
  description?: string
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Priority name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters'),
  description: yup.string().max(300, 'Maximum 30 characters')
})
