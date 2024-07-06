import PermissionGroup from '../PermissionGroup'
import {
  PermissionHeader,
  PermissionSettingContainer,
  Placeholder
} from './style'
import { useEffect, useMemo, useState } from 'react'
import { IWSPermission } from '~/services/types'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { Button, CircularProgress, Tooltip, Typography } from '@mui/material'
import PermissionGroupEdit from '../PermissionGroupEdit'
import { clearDuplicateByKey } from '~/utils/helper'
import { StoreType } from '~/redux'
import { cloneDeep } from 'lodash'
import { WS_PERMISSIONS_POPUP_MODE } from '~/utils/constant/workspace'
import useWSPermission from '~/hooks/useWSPermission'
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
  const handleRawData = (permissionList: IWSPermission[]) => {
    permissionList.forEach((permission) => {
      permission.memberIds = clearDuplicateByKey(permission.memberIds)
    })
    return permissionList
  }

  // get permission on WS logged user
  const userPermissionOnWS = useWSPermission()
  const isAdmin = () => userPermissionOnWS?.isWSAdmin

  const wsPermissions = useMemo(() => {
    if (permissionStore.currentWSPermission) {
      return handleRawData(cloneDeep(permissionStore.currentWSPermission))
    }
    return []
  }, [permissionStore.currentWSPermission])

  const closeAddPermission = () => {
    setAddPermission(false)
  }

  const openAddPermission = () => {
    setAddPermission(true)
  }

  const renderedList = useMemo(() => {
    if (searchKeyWord === '') return wsPermissions
    else {
      return wsPermissions.filter((permission) => {
        return permission.name
          .toLowerCase()
          .includes(searchKeyWord.toLowerCase())
      })
    }
  }, [searchKeyWord, wsPermissions])

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
          {searchKeyWord && `/${wsPermissions.length}`}
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
                disabled={true}
                size="small"
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
        permissionProps={{} as IWSPermission}
        open={addPermission}
        closeCallback={closeAddPermission}
        mode={WS_PERMISSIONS_POPUP_MODE.ADD}
      />
    </div>
  )
}
