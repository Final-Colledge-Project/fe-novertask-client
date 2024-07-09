import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { isEmpty } from 'lodash'
import { IWSPermission } from '~/services/types'

/*
  useWSPermission hook
  check the permission in workspace of the current user (logged in user)
*/
const useWSPermission: () => IWSPermission | undefined = () => {
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const wsPermission = useSelector(
    (state: StoreType) => state.permission.userPermissionOnWS
  )

  // return if the current user or board permission is empty
  if (
    !currentUser ||
    !wsPermission ||
    isEmpty(currentUser) ||
    isEmpty(wsPermission)
  ) {
    return undefined
  }

  return wsPermission
}

export default useWSPermission
