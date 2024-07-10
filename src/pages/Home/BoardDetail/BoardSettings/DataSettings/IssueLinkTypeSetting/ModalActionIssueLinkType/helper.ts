import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { CommonSettingType } from '../../helper'
import { IIssueLinkType } from '~/services/types'
export interface IActionIssueLinkTypeModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  selectedIssueLinkType?: CommonSettingType | null
  refetch: () => void
  setSelectedIssueLinkType: (priority: IIssueLinkType | null) => void
}

export interface IFormFields extends FieldValues {
  name: string
  inwardName: string
  outwardName: string
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Priority name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters'),
  inwardName: yup
    .string()
    .required('Inward name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters'),
  outwardName: yup
    .string()
    .required('Outward name is required')
    .min(3, 'At least 3 characters')
    .max(50, 'Maximum 50 characters')
})
