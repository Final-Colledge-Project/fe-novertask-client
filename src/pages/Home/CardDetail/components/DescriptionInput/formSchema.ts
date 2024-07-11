import * as yup from 'yup'

const schema = yup.object().shape({
  description: yup
    .string()
    .required('Should not be empty')
    .min(2, 'Must have 2~2000 characters')
    .max(2000, 'Must have 2~2000 characters')
})

export default schema
