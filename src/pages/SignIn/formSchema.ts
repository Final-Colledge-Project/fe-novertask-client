import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email is in wrong format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
})

export default schema
