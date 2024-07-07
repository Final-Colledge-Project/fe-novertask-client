import * as yup from 'yup'

const schema = yup.object().shape({
  PJName: yup
    .string()
    .required('Board name is required')
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters'),
  workspace: yup.string().required('Workspace is required'),
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'At least 2 characters')
    .max(100, 'Maximum 30 characters'),
  PJKey: yup
    .string()
    .required('Board key is required')
    .min(2, 'Too short')
    .max(10, 'Maximum 10 characters'),
  template: yup.string().required('Template is required')
})

export default schema
