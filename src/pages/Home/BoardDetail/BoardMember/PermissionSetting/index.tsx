import PermissionGroup from '../PermissionGroup'
import {
  PermissionHeader,
  PermissionSettingContainer,
  Placeholder
} from './style'
import { useEffect, useMemo, useState } from 'react'
import { IBoardPermission } from '~/services/types'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import PermissionGroupEdit from '../PermissionGroupEdit'
import { BOARD_PERMISSIONS_POPUP_MODE } from '~/utils/constant/board'
import { clearDuplicateByKey } from '~/utils/helper'
import { StoreType } from '~/redux'
import { cloneDeep } from 'lodash'
import usePermission from '~/hooks/usePermission'
import Empty from '~/components/Empty'

export default function PermissionSetting({
  searchKeyWord,
  startSearch
}: {
  searchKeyWord: string
  startSearch: boolean
}) {
  const permissionStore = useSelector((state: StoreType) => state.permission)
  const [addPermission, setAddPermission] = useState<boolean>(false)
  const dispatch = useDispatch()

  // handle raw data: remove duplicate memberIds,...
  const handleRawData = (permissionList: IBoardPermission[]) => {
    permissionList.forEach((permission) => {
      permission.memberIds = clearDuplicateByKey(permission.memberIds)
    })
    return permissionList
  }

  const userPermissionOnBoard = usePermission()
  // check if logged user is admin of current board
  const isAdmin = () => userPermissionOnBoard?.isAdmin

  const boardPermissions = useMemo(() => {
    if (permissionStore.currentBoardPermission) {
      return handleRawData(cloneDeep(permissionStore.currentBoardPermission))
    }
    return []
  }, [permissionStore.currentBoardPermission])

  const closeAddPermission = () => {
    setAddPermission(false)
  }

  const openAddPermission = () => {
    setAddPermission(true)
  }

  const renderedList = useMemo(() => {
    if (searchKeyWord === '') return boardPermissions
    else {
      return boardPermissions.filter((permission) => {
        return permission.name
          .toLowerCase()
          .includes(searchKeyWord.toLowerCase())
      })
    }
  }, [searchKeyWord, boardPermissions])

  useEffect(() => {
    dispatch(showLoading())
    // fake loading
    setTimeout(() => {
      dispatch(hideLoading())
    }, 1000)
  }, [])

  return (
    <div>
      <PermissionHeader>
        <Typography fontWeight={600}>
          Total: {renderedList?.length}
          {searchKeyWord && `/${boardPermissions.length}`}
        </Typography>
        {isAdmin() && (
          <Button variant="contained" size="small" onClick={openAddPermission}>
            Add
          </Button>
        )}
        {!isAdmin() && (
          <Tooltip title="Only admin can do this action">
            <span>
              <Button
                variant="contained"
                size="small"
                disabled={true}
                sx={{ '&.MuiButton-root': { color: '#606060' } }}
                onClick={openAddPermission}>
                Add
              </Button>
            </span>
          </Tooltip>
        )}
      </PermissionHeader>
      {!startSearch && (
        <PermissionSettingContainer>
          {renderedList?.map((permission) => (
            <PermissionGroup permission={permission} key={permission._id} />
          ))}
        </PermissionSettingContainer>
      )}

      {!startSearch && renderedList.length == 0 && (
        <Empty description="No group found!" isFullWidth pY={50} />
      )}

      {startSearch && (
        <Placeholder>
          <CircularProgress size={30} />
        </Placeholder>
      )}

      {/* ADD PERMISSION */}
      <PermissionGroupEdit
        permissionProps={{} as IBoardPermission}
        open={addPermission}
        closeCallback={closeAddPermission}
        mode={BOARD_PERMISSIONS_POPUP_MODE.ADD}
      />
    </div>
  )
}
