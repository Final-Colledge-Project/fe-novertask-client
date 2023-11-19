import * as yup from 'yup'

const schema = yup.object().shape({
  WSName: yup
    .string()
    .required("Workspace's name is required")
    .min(2, 'At least 2 characters')
    .max(20, 'Maximum 20 characters')
})

export default schema
