import { forOwn } from 'lodash'
import { useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { yupResolver } from '@hookform/resolvers/yup'

// component libraries
import { RiCheckLine, RiCloseLine, RiLinkM } from 'react-icons/ri'
import Select from '@mui/material/Select'
import { MenuItem, Typography } from '@mui/material'

// components
import {
  ActionGroup,
  Avatar,
  Form,
  Info,
  Input,
  InputContainer,
  Loading,
  Owner,
  SquareButton,
  SubTaskItem,
  SubTaskItemBody,
  SubTaskItemHeader,
  SubtaskName,
  SubtaskStatus
} from './style'
import DateTimeInput from '~/components/DateTimeInput'

// services
import {
  ICard,
  ISubtask,
  IUpdatableSubtask,
  SUBTASK_STATUS
} from '~/services/types'
import copy from '~/utils/copy'
import { updateSubtask } from '~/services/subtaskService'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { IFormFields } from './IFormFields'
import schema from './schema'
import { DATE_FORMAT } from '~/utils/constant'

type TSubtaskStatus = keyof typeof SUBTASK_STATUS
interface IProps {
  subtask: ISubtask
  card: ICard
  cardMembers: { _id: string; avatar: string; fullName: string }[]
  onRefresh: () => Promise<void>
}

const UPDATE_FIELDS = {
  assignee: 'assignee',
  status: 'status',
  name: 'name',
  dueDate: 'dueDate'
}

export default function Subtask({
  subtask,
  card,
  cardMembers,
  onRefresh
}: IProps) {
  const dispatch = useDispatch()
  const [updatingField, setUpdatingField] = useState<string>('')
  const [editingName, setIsEditingName] = useState<boolean>(false)
  const [dueDate, setDueDate] = useState<Date | Dayjs | null>(
    subtask.dueDate ? dayjs(subtask.dueDate) : null
  )

  const statusList = useMemo(() => {
    const list: { status: TSubtaskStatus }[] = []
    forOwn(SUBTASK_STATUS, (value: string, _key: string) => {
      list.push({ status: value as TSubtaskStatus })
    })
    return list
  }, [])

  const handleAddToClipBoard = async (valueToRemember: string) => {
    const baseURL = window.location.origin
    await copy(baseURL + valueToRemember)
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' })
  }

  const handleUpdateSubtask = async (changes: IUpdatableSubtask) => {
    try {
      const res = await updateSubtask({ subtaskId: subtask._id, changes })
      if (res && res.data) {
        await onRefresh()
        dispatch(setShouldRefreshBoardDetail(true))
      }
    } catch (error) {
      enqueueSnackbar((error as Error).message)
    }
  }

  const handleUpdateAssignee = async (memberId: string) => {
    setUpdatingField(UPDATE_FIELDS.assignee)
    await handleUpdateSubtask({ assignedTo: memberId })
    setUpdatingField('')
  }

  const handleUpdateStatus = async (status: TSubtaskStatus) => {
    setUpdatingField(UPDATE_FIELDS.status)
    await handleUpdateSubtask({ status })
    setUpdatingField('')
  }

  const handleUpdateTitle = async (name: string) => {
    setUpdatingField(UPDATE_FIELDS.name)
    await handleUpdateSubtask({ name })
    setUpdatingField('')
  }

  const handleUpdateDueDate = async (dueDate: string) => {
    setUpdatingField(UPDATE_FIELDS.dueDate)
    setDueDate(dueDate ? dayjs(dueDate) : null)
    await handleUpdateSubtask({ dueDate })
    setUpdatingField('')
  }

  const handleSubmitDueDate = async (e: Dayjs | Date | null) => {
    // delete due date
    if (e === null) {
      await handleUpdateDueDate('')
      return
    }
    const newDate = dayjs(e).format('MMM DD, HH:mm').toString()
    if (newDate === 'Invalid Date' || newDate === 'minDate') return
    await handleUpdateDueDate(dayjs(e).format(DATE_FORMAT))
  }

  const {
    handleSubmit,
    register,
    reset,
    getFieldState,
    watch,
    formState: { isDirty: isFormDirty }
  } = useForm<IFormFields>({
    defaultValues: { title: subtask.name },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    setUpdatingField(UPDATE_FIELDS.name)
    await handleUpdateTitle(data.title)
    reset({ title: data.title })
    setIsEditingName(false)
    setUpdatingField('')
  }

  const onReset = () => {
    reset({ title: subtask.name })
    setIsEditingName(false)
  }

  const { isDirty, error } = getFieldState('title')

  return (
    <SubTaskItem>
      <SubtaskName>
        <div
          className="item__id"
          onClick={() =>
            handleAddToClipBoard(`/u/boards/${card.boardId}/cards/${card._id}`)
          }
        >
          <span>{subtask.subCardId}</span>
          <RiLinkM />
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(
            editingName && 'expanded',
            isFormDirty && 'fully-expanded'
          )}
        >
          <InputContainer>
            <Input
              type="text"
              size={
                isFormDirty
                  ? watch('title').length + 1
                  : subtask.name.length + 1
              }
              {...register('title')}
              maxLength={50}
              className={clsx(error && 'error', isDirty && 'dirty')}
            ></Input>
            {isFormDirty && (
              <div className="input-length">{watch('title').length}/50</div>
            )}
          </InputContainer>
          {updatingField === UPDATE_FIELDS.name && <Loading />}
          {isFormDirty && (
            <ActionGroup>
              {/* <Error>{errors.title?.message}</Error> */}
              <SquareButton onClick={onReset}>
                <RiCloseLine />
              </SquareButton>
              <SquareButton color="success" type="submit">
                <RiCheckLine />
              </SquareButton>
            </ActionGroup>
          )}
        </Form>
      </SubtaskName>
      <div className="subtask__top">
        <SubTaskItemHeader></SubTaskItemHeader>
        <SubTaskItemBody>
          <div className="section section-member">
            <span className="section-loading">
              {updatingField === UPDATE_FIELDS.assignee && <Loading />}
            </span>
            <Select
              sx={{
                border: 'none',
                padding: '0',
                '& .MuiList-root': {
                  flexDirection: 'column'
                },
                '& .MuiSelect-select': {
                  padding: '0',
                  outline: 'none'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
              value={
                (subtask.assignedTo?._id as string) ||
                'select-member-placeholder'
              }
              onChange={(e) => handleUpdateAssignee(e.target.value as string)}
            >
              <MenuItem value="select-member-placeholder" disabled>
                <Typography>Select</Typography>
              </MenuItem>
              {cardMembers?.map((member) => (
                <MenuItem value={member._id} key={member._id}>
                  <Owner className="member-item">
                    <Avatar>
                      <img src={member?.avatar} alt="" />
                    </Avatar>
                    <Info>
                      <p className="name">{`${member.fullName}`}</p>
                    </Info>
                  </Owner>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="section section-date">
            <span className="section-loading">
              {updatingField === UPDATE_FIELDS.dueDate && <Loading />}
            </span>
            <DateTimeInput
              disableOpenPicker={false}
              format="MMM DD YYYY, HH:mm"
              value={dueDate}
              onAccept={handleSubmitDueDate}
              minDateTime={card.createdAt ? dayjs(card.createdAt) : undefined}
            />
          </div>

          <div className="section">
            <span className="section-loading">
              {updatingField === UPDATE_FIELDS.status && <Loading />}
            </span>
            <Select
              value={subtask.status}
              sx={{
                height: '30px',
                '& .MuiList-root': {
                  flexDirection: 'column'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                  paddingX: '0'
                },
                '& .MuiSelect-select': {
                  padding: '0'
                }
              }}
              onChange={(e) =>
                handleUpdateStatus(e.target.value as TSubtaskStatus)
              }
            >
              {statusList.map((item) => (
                <MenuItem
                  value={item.status as string}
                  key={item.status as string}
                >
                  <SubtaskStatus className={item.status}>
                    {item.status as string}
                  </SubtaskStatus>
                </MenuItem>
              ))}
            </Select>
          </div>
        </SubTaskItemBody>
      </div>
    </SubTaskItem>
  )
}
