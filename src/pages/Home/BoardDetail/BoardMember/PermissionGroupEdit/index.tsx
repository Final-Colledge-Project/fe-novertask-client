import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  ActionButtons,
  CloseButton,
  Content,
  Divider,
  Form,
  Mode,
  SubTitle,
  Title,
  User,
  UserList,
  Group,
  Panel,
  AddUserButton,
  SubTitle2,
  CheckBoxList,
  TransitionList,
  TransitionItem,
  EmptyMember
} from './style'
import IProps from './IProps'
import { RiAddLine, RiCloseLine, RiExternalLinkLine } from 'react-icons/ri'
import TextInput from '~/components/TextInput'
import ColorPicker from '~/components/ColorPicker'
import { useEffect, useMemo, useState } from 'react'
import { cloneDeep, has, set, forOwn, get, isEqual } from 'lodash'
import AddUserToGroupPopup from '../AddUserToGroupPopup'
import {
  IBoardPermission,
  IMemberInBoard,
  IUpdatableBoardPermission
} from '~/services/types'
import { mapData } from '~/utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { BOARD_PERMISSIONS_POPUP_MODE } from '~/utils/constant/board'
import WindowDialog from '~/components/dialog/WIndowDialog'
import emptyPermission from './emptyPermission'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import schema from './schema'
import IFormFields from './IFormFields'
import WithController from '~/components/InputWithController'
import {
  createBoardPermission,
  updateBoardPermission
} from '~/services/boardPermissionService'
import { useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { getBoardPermission } from '~/redux/permissionSlice/actions'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'

interface IBasicPermission {
  [key: string]: boolean
}
interface IItem {
  title: string
  value: boolean
  key?: keyof IBasicPermission | string
}

export default function PermissionGroupEdit({
  open,
  closeCallback,
  permissionProps,
  mode
}: Readonly<IProps>) {
  const isViewMode = () => mode === BOARD_PERMISSIONS_POPUP_MODE.VIEW
  const isAddMode = () => mode === BOARD_PERMISSIONS_POPUP_MODE.ADD
  const isEditMode = () => mode === BOARD_PERMISSIONS_POPUP_MODE.EDIT

  const INIT_COLOR = isAddMode()
    ? cloneDeep(emptyPermission).color
    : cloneDeep(permissionProps).color

  const INIT_PERMISSION = isAddMode()
    ? cloneDeep(emptyPermission)
    : cloneDeep(permissionProps)

  const { id: boardId } = useParams()
  const [color, setColor] = useState<string>(INIT_COLOR)
  const [permission, setPermission] =
    useState<IBoardPermission>(INIT_PERMISSION)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)

  const dispatch = useDispatch<StoreDispatchType>()

  // handle open state of add user to group popup
  const [openAddUserToGroupPopup, setOpenAddUserToGroupPopup] =
    useState<boolean>(false)
  const memberData = useSelector((state: StoreType) => state.board.members)
  const permissionSnapShot = useMemo(
    () => cloneDeep(INIT_PERMISSION),
    [INIT_PERMISSION]
  )

  const { control, handleSubmit, reset, getValues } = useForm<IFormFields>({
    defaultValues: cloneDeep(INIT_PERMISSION),
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const handleCloseAddUserToGroupPopup = () => {
    setOpenAddUserToGroupPopup(false)
  }

  const handleOpenAddUserToGroupPopup = () => {
    setOpenAddUserToGroupPopup(true)
  }

  // check if the current permission is not admin or viewer permission
  const canEditPermission = () => !permission.isAdmin && !permission.isViewer

  const computedMembers = useMemo(() => {
    if (memberData && permission.memberIds) {
      const result = [
        ...cloneDeep(memberData.members),
        ...cloneDeep(memberData.oweners)
      ]
      return mapData<IMemberInBoard>(result, '_id', permission.memberIds)
    }
    return []
  }, [memberData, permission.memberIds])

  const ownerId = () => {
    return memberData?.oweners[0]._id
  }
  const isOwner = (userId: string) => {
    if (userId === ownerId()) {
      return true
    }
    return false
  }

  const isChecked = (item: IItem, data: IBasicPermission) => {
    if (item.key && data) {
      if (item.key !== 'all') {
        return data[item.key]
      } else if (item.key === 'all') {
        // return true if all key in data object is true
        return Object.values(data).every((value) => value === true)
      }
    }
  }

  // Define the function with generic types
  function toggleNestedBoolean<
    T extends object,
    K1 extends keyof T,
    K2 extends keyof T[K1]
  >(obj: T, firstKey: K1, secondKey: K2): void {
    const path = `${String(firstKey)}.${String(secondKey)}`

    // Check if the path exists and is a boolean
    if (
      (has(obj, path) && typeof get(obj, path) === 'boolean') ||
      secondKey === 'all'
    ) {
      if (secondKey === 'all') {
        let isCheckedAll = true
        // Check if all the keys in the object are true
        forOwn(get(obj, firstKey), (value, _key) => {
          if (value === false) {
            isCheckedAll = false
          }
        })
        if (isCheckedAll) {
          // If the key is 'all', we need to toggle all the keys in the object
          forOwn(get(obj, firstKey), (_value, key) => {
            set(obj, `${String(firstKey)}.${String(key)}`, false)
          })
        } else {
          forOwn(get(obj, firstKey), (value, key) => {
            set(obj, `${String(firstKey)}.${String(key)}`, true)
          })
        }
      } else {
        // Toggle the boolean value
        set(obj, path, !get(obj, path))
      }
    } else {
      throw new Error(
        `The path ${path} either does not exist or is not a boolean`
      )
    }
    setPermission({ ...(obj as IBoardPermission) })
  }

  const convertPermissionObjectToArray = (permissionObject: {
    [key: string]: boolean
  }) => {
    if (!permissionObject) return []
    const result = []
    for (const key in permissionObject) {
      result.push({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        value: permissionObject[key],
        key: key as keyof IBasicPermission | string
      })
    }
    result.splice(0, 0, {
      title: 'All',
      value: Object.values(permissionObject).every((value) => value === true),
      key: 'all' as keyof IBasicPermission | string
    })
    return cloneDeep(result)
  }

  // handle close this popup
  const close = (ignoreChanges?: boolean) => {
    // check if data is modified && dialogResult is true
    const modifiedKeys = getModifiedKeys({
      ...permission,
      name: getValues('name'),
      description: getValues('description')
    })
    if (modifiedKeys.length > 0 && !ignoreChanges) {
      // open confirm dialog
      setOpenConfirm(true)
      return
    }

    // call close callback if it exists
    if (closeCallback) closeCallback()
    // refresh data
    reset(INIT_PERMISSION)
    setPermission(cloneDeep(INIT_PERMISSION))
    setColor(INIT_COLOR)
  }

  // click cancel on confirm dialog
  const handleExitOnConfirmDialog = () => {
    setOpenConfirm(false)
    close(true)
  }

  // click ok on confirm dialog
  const handleContinueOnConfirmDialog = () => {
    setOpenConfirm(false)
  }

  // click cancel on edit permission dialog
  const handleCancel = () => {
    // ignore change on permission
    close(true)
  }

  // get modified keys: from 'targetValue' object compared to 'permissionSnapShot'
  const getModifiedKeys: (
    targetValue: IBoardPermission
  ) => (keyof IBoardPermission)[] = (targetValue) => {
    // if permissionSnapShot or targetValue is undefined, return empty array
    if (!permissionSnapShot || !targetValue) return []

    const modifiedKeys: (keyof IBoardPermission)[] = []

    // list all keys modified in object
    forOwn(targetValue, (value, key) => {
      const typedKey = key as keyof IBoardPermission

      // if value is different from permissionSnapShot value, add to modifiedKeys
      if (!isEqual(value, permissionSnapShot[typedKey])) {
        modifiedKeys.push(typedKey)
      }
    })

    // return modified keys
    return modifiedKeys
  }

  // return a new object with modified keys
  // from list of key get from getModifiedKeys() function
  const modifiedData = (rawData: IBoardPermission) => {
    // get modified keys
    const modifiedKeys = getModifiedKeys(rawData)

    // if no modified keys, return undefined
    if (modifiedKeys.length === 0) return undefined

    const data: IUpdatableBoardPermission = {}
    modifiedKeys.forEach((key) => {
      const typedKey = key as keyof IUpdatableBoardPermission
      set(data, `${String(typedKey)}`, rawData[typedKey])
    })

    // return new object with modified keys
    return cloneDeep(data)
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    const computedData: IBoardPermission = {
      ...cloneDeep(permission),
      name: data.name,
      description: data.description
    }

    // remove owner from memberIds
    computedData.memberIds = [
      ...computedData.memberIds.filter((id) => id !== ownerId())
    ]

    if (isAddMode()) {
      // create permission
      await onCreatePermission(computedData)
    } else {
      // update permission
      await onUpdatePermission(computedData)
    }
    // update permission
    await dispatch(getBoardPermission(boardId as string))
    // close popup
    close(true)
  }

  const onCreatePermission = async (data: IBoardPermission) => {
    if (!boardId || !data) return
    try {
      dispatch(showLoading())
      set(data, '_id', null)
      const res = await createBoardPermission({
        boardPermission: data,
        boardId
      })
      if (res?.data) {
        enqueueSnackbar('Create permission successfully!', {
          variant: 'success'
        })
      }
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const onUpdatePermission = async (data: IBoardPermission) => {
    if (!boardId || !data) return

    const computedData = modifiedData(data)

    if (!computedData) return
    try {
      dispatch(showLoading())
      const res = await updateBoardPermission({
        boardPermission: computedData,
        permissionId: data._id
      })
      if (res) {
        enqueueSnackbar('Updated permission successfully!', {
          variant: 'success'
        })
      }
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    } finally {
      dispatch(hideLoading())
    }
  }

  const onAddUserFromPopup = (data: string[]) => {
    setPermission((prev) => {
      return cloneDeep({
        ...prev,
        memberIds: [...prev.memberIds, ...data]
      })
    })
  }

  const onRemoveUser = (userId: string) => {
    setPermission((prev) => {
      return cloneDeep({
        ...prev,
        memberIds: prev.memberIds.filter((id) => id !== userId)
      })
    })
  }

  useEffect(() => {
    setPermission((prev) => {
      return cloneDeep({
        ...prev,
        color: color
      })
    })
  }, [color])

  // useEffect(() => {
  //   console.log(INIT_PERMISSION)
  // }, [open])

  return (
    // <Overlay>
    // </Overlay>
    <WindowDialog
      open={open}
      onClose={() => close(false)}
      dialogTitleProp={{ sx: { padding: '0 8px' } }}
      dialogContentProp={{ sx: { padding: '0 8px 8px', overflowY: 'visible' } }}
      title={
        <Title>
          {(isViewMode() || isEditMode()) && permission.name}
          {isAddMode() && 'Permission'}
          {isViewMode() && <Mode> • Detail</Mode>}
          {isAddMode() && <Mode> • Add new</Mode>}
          {isEditMode() && <Mode> • Edit</Mode>}
        </Title>
      }>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* MAIN CONTENT */}
        <Content>
          <Panel className="left">
            {/* TITLE */}
            <Group className="row c-gap-5">
              <Group>
                <SubTitle>Title</SubTitle>
                <WithController control={control} name="name">
                  <TextInput
                    label=""
                    disabled={isViewMode() || !canEditPermission()}
                    placeHolder="Add title..."
                    sx={{ height: '35px' }}
                  />
                </WithController>
              </Group>
              <Group className="flex-1">
                <SubTitle>Color</SubTitle>
                <ColorPicker
                  disabled={isViewMode()}
                  chosenColor={color}
                  onChange={(color) => setColor(color)}
                />
              </Group>
            </Group>

            {/* DESCRIPTION */}
            <Group>
              <SubTitle>Description</SubTitle>
              <WithController control={control} name="description">
                <TextInput
                  label=""
                  multiple
                  placeholder="Add description..."
                  disabled={isViewMode() || !canEditPermission()}
                />
              </WithController>
            </Group>

            {/* USER LIST */}
            <Group>
              <SubTitle>
                Users<SubTitle2> • {computedMembers.length}</SubTitle2>
              </SubTitle>
              <UserList>
                {computedMembers.map((mem: IMemberInBoard) => (
                  <User key={mem._id}>
                    <Tooltip arrow title={mem.firstName + ' ' + mem.lastName}>
                      <Avatar
                        sx={{ width: '40px', height: '40px' }}
                        src={mem.avatar}></Avatar>
                    </Tooltip>

                    {/* DELETE USER BUTTON */}
                    {!isViewMode() && !isOwner(mem._id) && (
                      <CloseButton style={{ width: '20px', height: '20px' }}>
                        <IconButton
                          sx={{
                            width: '35px',
                            height: '35px'
                          }}
                          onClick={() => onRemoveUser(mem._id)}
                          color="inherit">
                          <RiCloseLine />
                        </IconButton>
                      </CloseButton>
                    )}
                  </User>
                ))}

                {isViewMode() && computedMembers.length === 0 && (
                  <EmptyMember>No users</EmptyMember>
                )}

                {/* ADD USER BUTTON */}
                {!isViewMode() && (
                  <AddUserButton onClick={handleOpenAddUserToGroupPopup}>
                    <RiAddLine />
                  </AddUserButton>
                )}
              </UserList>
            </Group>
          </Panel>

          <Divider />

          <Panel className="right">
            <Group className="gap-0">
              <SubTitle className="mb-3">Permission</SubTitle>
              {/* COLUMNS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Columns
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.column).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.column)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'column',
                                item.key as 'delete' | 'create' | 'update'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* ISSUE TYPES */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Issue types
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.issueType).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.issueType)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'issueType',
                                item.key as 'delete' | 'create' | 'update'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* PRIORITY */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Priority
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.priority).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.priority)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'priority',
                                item.key as 'delete' | 'create' | 'update'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* LABEL */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Labels
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.label).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.label)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'label',
                                item.key as 'delete' | 'create' | 'update'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* CARDS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Cards
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.card).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.card)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'card',
                                item.key as 'delete' | 'create' | 'update'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* MEMBERS */}
              <Group className="level-2 row mb-0">
                <SubTitle className="level-2 text-bold fixed-width">
                  Users
                </SubTitle>
                <CheckBoxList>
                  {convertPermissionObjectToArray(permission.member).map(
                    (item, _index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            disabled={isViewMode() || !canEditPermission()}
                            checked={isChecked(item, permission.member)}
                            onChange={() =>
                              toggleNestedBoolean(
                                permission,
                                'member',
                                item.key as 'invite'
                              )
                            }
                          />
                        }
                        key={item.title}
                        label={item.title}
                        sx={{ '.MuiTypography-root': { fontSize: '14px' } }}
                      />
                    )
                  )}
                </CheckBoxList>
              </Group>

              {/* TRANSITION */}
              <Group className="mt-3">
                <SubTitle>
                  Transition
                  <Tooltip title="Open flow page">
                    <IconButton size="small" color="primary">
                      <RiExternalLinkLine />
                    </IconButton>
                  </Tooltip>
                </SubTitle>
                <TransitionList>
                  <TransitionItem>Doraemon</TransitionItem>
                  <TransitionItem>Nobita</TransitionItem>
                </TransitionList>
              </Group>
            </Group>
          </Panel>
        </Content>

        <AddUserToGroupPopup
          open={openAddUserToGroupPopup}
          onClose={handleCloseAddUserToGroupPopup}
          permission={permission}
          onAdd={onAddUserFromPopup}
        />
        {/* ACTIONS */}
        <ActionButtons>
          {!isViewMode() && (
            <>
              <Button variant="text" color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </>
          )}
          {isViewMode() && (
            <Button variant="text" color="error" onClick={handleCancel}>
              Close
            </Button>
          )}
        </ActionButtons>
      </Form>
      <ConfirmDialog
        title="Exit?"
        content={"Your changes haven't been saved. Do you want to exit?"}
        open={openConfirm}
        onConfirm={handleContinueOnConfirmDialog}
        onClose={handleExitOnConfirmDialog}
        cancelBtnText="Exit"
        confirmBtnText="Continue edit"
      />
    </WindowDialog>
  )
}
