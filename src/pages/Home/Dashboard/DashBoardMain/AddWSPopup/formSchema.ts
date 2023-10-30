import * as yup from 'yup'

const schema = yup.object().shape({
  WSName: yup.string().required("Workspace's name is required")
})

export default schema
