import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Must have 2~30 characters')
    .max(30, 'Must have 2~30 characters')
})

export default schema
