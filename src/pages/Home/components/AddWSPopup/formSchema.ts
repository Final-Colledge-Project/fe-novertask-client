import * as yup from 'yup'

const schema = yup.object().shape({
  WSName: yup
    .string()
    .required("Workspace's name is required")
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters')
})

export default schema
