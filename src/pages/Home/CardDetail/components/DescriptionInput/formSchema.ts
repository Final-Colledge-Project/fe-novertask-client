import * as yup from 'yup'

const schema = yup.object().shape({
  description: yup
    .string()
    .required('Should not be empty')
    .min(2, 'Must have 2~200 characters')
    .max(200, 'Must have 2~200 characters')
})

export default schema
