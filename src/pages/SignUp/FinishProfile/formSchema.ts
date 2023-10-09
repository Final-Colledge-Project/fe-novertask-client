import * as yup from 'yup'

const schema = yup.object().shape({
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Phone must have 10 digit number'),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(20, 'First name can have at most 20 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(20, 'Last name can have at most 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .min(8, 'Password must be at least 8 characters')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  birthday: yup.date().required('Birthday is required'),
  address: yup.string().required('Address is required')
})

export default schema
