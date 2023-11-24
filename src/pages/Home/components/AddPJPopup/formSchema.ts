import * as yup from 'yup'

const schema = yup.object().shape({
  PJName: yup
    .string()
    .required("Project's name is required")
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters'),
  workspace: yup.string().required()
})

export default schema
