import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(2, 'Must have 2~50 characters')
    .max(50, 'Must have 2~50 characters')
})

export default schema
