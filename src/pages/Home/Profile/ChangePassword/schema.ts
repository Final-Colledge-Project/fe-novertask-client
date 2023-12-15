import * as yup from 'yup'

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters'),
  repeatNewPassword: yup
    .string()
    .required('Repeat password is required')
    .min(8, 'Password must be at least 8 characters')
    .oneOf([yup.ref('newPassword')], 'New passwords must match')
})

export default schema
