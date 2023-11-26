import * as yup from 'yup'

const schema = yup.object().shape({
  PJName: yup
    .string()
    .required("Project's name is required")
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters'),
  workspace: yup.string().required('Workspace is required'),
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'At least 2 characters')
    .max(100, 'Maximum 30 characters')
})

export default schema
