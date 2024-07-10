import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Should be 2~100 characters long')
    .max(100, 'Should be 2~100 characters long'),
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Should be 2~2000 characters long')
    .max(2000, 'Should be 2~2000 characters long')
})

export default schema
