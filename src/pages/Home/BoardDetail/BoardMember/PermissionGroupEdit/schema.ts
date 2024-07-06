import * as yup from 'yup'
import { isHexColor } from '~/utils/helper'

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Title is required')
    .min(2, 'Title must be between 2~50 characters long')
    .max(50, 'Title must be between 2~50 characters long'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(2, 'Description must be between 2~50 characters long')
    .max(255, 'Description must be between 2~50 characters long'),
  color: yup
    .string()
    .required()
    .trim()
    .test({
      name: 'checkHexColor',
      test: (_value, context) => {
        const isValid = isHexColor(context.originalValue)
        if (!isValid) {
          return context.createError({
            message: 'Color must be a valid hex color code!'
          })
        }
        return true
      }
    }),
  memberIds: yup.array().required(),
  column: yup.object().shape({
    create: yup.boolean().required(),
    update: yup.boolean().required(),
    delete: yup.boolean().required()
  }),
  card: yup.object().required().shape({
    create: yup.boolean().required(),
    update: yup.boolean().required(),
    delete: yup.boolean().required()
  }),
  member: yup.object().required().shape({
    invite: yup.boolean().required()
  }),
  issueType: yup.object().required().shape({
    create: yup.boolean().required(),
    update: yup.boolean().required(),
    delete: yup.boolean().required()
  }),
  priority: yup.object().required().shape({
    create: yup.boolean().required(),
    update: yup.boolean().required(),
    delete: yup.boolean().required()
  }),
  label: yup.object().required().shape({
    create: yup.boolean().required(),
    update: yup.boolean().required(),
    delete: yup.boolean().required()
  })
})

export default schema
