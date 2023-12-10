import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be in 2~20 characters'),
  lastName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be in 2~20 characters'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Phone must have 10 digit number'),
  birthDate: yup.date().required('Birthday is required'),
  address: yup.string().required('Address is required')
})

export default schema
