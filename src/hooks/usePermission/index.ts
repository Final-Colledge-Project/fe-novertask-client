import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { isEmpty } from 'lodash'
import { isValueExistInNestedObject } from '~/utils/helper'
import { IBoardPermission } from '~/services/types'

/*
  usePermission hook
  check the permission of the current user (logged in user)
*/
const usePermission: () => IBoardPermission | undefined = () => {
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const boardPermission = useSelector(
    (state: StoreType) => state.permission.userPermissionOnBoard
  )

  // return if the current user or board permission is empty
  if (
    !currentUser ||
    !boardPermission ||
    isEmpty(currentUser) ||
    isEmpty(boardPermission)
  ) {
    return undefined
  }

  // find permission of current user
  // const userPermission = boardPermission.find((permission) =>
  //   isValueExistInNestedObject(permission, currentUser._id)
  // )

  // if (!userPermission) return undefined

  return boardPermission
}

export default usePermission
