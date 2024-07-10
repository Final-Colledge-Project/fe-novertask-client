import * as yup from 'yup'

const schema = yup.object().shape({
  columnId: yup.string().required('Column is required'),
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Should be 2~100 characters long')
    .max(100, 'Should be 2~100 characters long'),
  description: yup
    .string()
    .required('Description is required')
    .min(2, 'Should be 2~2000 characters long')
    .max(2000, 'Should be 2~2000 characters long'),
  labelId: yup.string().required('Label is required'),
  priorityId: yup.string().required('Priority is required'),
  reporterId: yup.string().required('Reporter is required'),
  assigneeId: yup.string().required('Assignee is required'),
  sprintId: yup.string().required('Sprint is required'),
  epicId: yup.string().required('Epic is required'),
  issueTypeId: yup.string().required('Issue type is required'),
  storyPoint: yup.number().required('Story point is required')
})

export default schema
