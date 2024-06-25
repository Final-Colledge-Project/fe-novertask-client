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
import { Button, CircularProgress, Typography } from '@mui/material'
import PermissionGroupEdit from '../PermissionGroupEdit'
import { BOARD_PERMISSIONS_POPUP_MODE } from '~/utils/constant/board'
import { clearDuplicateByKey } from '~/utils/helper'
import { StoreType } from '~/redux'
import { cloneDeep } from 'lodash'

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
        <Button variant="contained" size="small" onClick={openAddPermission}>
          Add
        </Button>
      </PermissionHeader>
      {!startSearch && (
        <PermissionSettingContainer>
          {renderedList?.map((permission) => (
            <PermissionGroup permission={permission} key={permission._id} />
          ))}
        </PermissionSettingContainer>
      )}

      {!startSearch && renderedList.length == 0 && (
        <Placeholder>No group found.</Placeholder>
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
