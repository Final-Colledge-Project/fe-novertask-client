import dayjs from 'dayjs'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be in 2~20 characters'),
  lastName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'First name must be in 2~20 characters'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Phone must have 10 digit number'),
  birthDate: yup
    .string()
    .test({
      name: 'checkBirthDate',
      test: (_value, context) => {
        const isValid = dayjs(context.originalValue).isValid()
        if (!isValid) {
          return context.createError({
            message: 'Birthday must be satisfied MM/DD/YYYY format!'
          })
        }

        const isLaterThanNow = dayjs(context.originalValue).isAfter(dayjs())

        if (isLaterThanNow) {
          return context.createError({
            message: 'This day seems to be in the future!'
          })
        }
        return true
      }
    })
    .required('Birthday is required'),
  address: yup.string().trim().required('Address is required')
})

export default schema
