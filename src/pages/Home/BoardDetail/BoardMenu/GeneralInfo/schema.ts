import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Project's name is required")
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(2, 'At least 2 characters')
    .max(100, 'Maximum 30 characters'),
  dueDate: yup.string().notRequired().nullable().trim()
  // .test({
  //   name: 'checkDueDateType',
  //   test: (_value, context) => {
  //     const isValid =
  //       dayjs(context.originalValue).isValid() || context.originalValue === ''
  //     if (!isValid) {
  //       return context.createError({
  //         message: 'Date must be satisfied MM/DD/YYYY HH:mm:ss format!'
  //       })
  //     }
  //     return true
  //   }
  // }),
})

export default schema
