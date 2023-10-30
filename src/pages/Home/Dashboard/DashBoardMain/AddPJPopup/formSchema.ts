import * as yup from 'yup'

const schema = yup.object().shape({
  PJName: yup.string().required("Project's name is required"),
  workspace: yup.string().required()
})

export default schema
