import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(2, 'Must have 2~30 characters')
    .max(30, 'Must have 2~30 characters')
})

export default schema
