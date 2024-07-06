import { IBoardPermission } from '~/services/types'
import { COLOR } from '~/utils/constant'

const emptyPermission: IBoardPermission = {
  _id: '',
  name: '',
  description: '',
  color: COLOR.BLUE.main,
  column: {
    create: false,
    update: false,
    delete: false
  },
  issueType: {
    create: false,
    update: false,
    delete: false
  },
  priority: {
    create: false,
    update: false,
    delete: false
  },
  label: {
    create: false,
    update: false,
    delete: false
  },
  card: {
    create: false,
    update: false,
    delete: false
  },
  member: {
    invite: false
  },
  memberIds: []
}

export default emptyPermission
