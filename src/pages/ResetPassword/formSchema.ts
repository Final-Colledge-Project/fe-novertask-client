import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

export default schema
