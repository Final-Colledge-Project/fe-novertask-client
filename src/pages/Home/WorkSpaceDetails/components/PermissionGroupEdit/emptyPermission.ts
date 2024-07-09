import { IWSPermission } from '~/services/types'
import { COLOR } from '~/utils/constant'

const emptyPermission: IWSPermission = {
  _id: '',
  name: '',
  description: '',
  color: COLOR.BLUE.main,
  board: {
    create: false,
    viewAll: false
  },
  member: {
    invite: false
  },
  memberIds: []
}

export default emptyPermission
