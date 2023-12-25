import dayjs, { Dayjs } from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

// component libraries
import { Button, Switch, Typography } from '@mui/material'

// components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Form,
  FormActionsGroup,
  GeneralAvatar,
  GeneralInfo as GeneralInfoStyled,
  Input,
  User
} from './style'
import WithController from '~/components/InputWithController'
import TextInput from '~/components/TextInput'
import DateTimeInput from '~/components/DateTimeInput'

// services
import { IBoard, IGeneralWorkspace, IMemberInBoard } from '~/services/types'
import { StoreDispatchType, StoreType } from '~/redux'
import IFormFields from './IFormField'
import schema from './schema'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { updateBoard } from '~/services/boardService'
import { DATE_FORMAT } from '~/utils/constant'

export default function GeneralInfo({
  board,
  owner
}: {
  board: IBoard
  owner: IMemberInBoard
}) {
  const [enableEditDueDate, setEnableEditDueDate] = useState<boolean>(
    board.dueDate ? true : false
  )
  const [boardAccessibility, setBoardAccessibility] = useState<
    'public' | 'private'
  >(board.type)
  const [dueDateString, setDueDateString] = useState<string>(
    board.dueDate || ''
  )
  const [dateError, setDateError] = useState<string>('')

  const allWorkspaces = useSelector((state: StoreType) => state.board.boards)
  const currentUserInfo = useSelector((state: StoreType) => state.auth.userInfo)

  const dispatch = useDispatch<StoreDispatchType>()

  const workspaceOfCurrentBoard = useMemo(() => {
    return allWorkspaces.find(
      (workspace: IGeneralWorkspace) => workspace._id === board.teamWorkspaceId
    )
  }, [allWorkspaces, board])

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState,
    getValues,
    setError
  } = useForm<IFormFields>({
    defaultValues: {
      title: board.title,
      description: board.description,
      dueDate: board.dueDate || '',
      type: board.type
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const isCurrentUSerOwner = () => {
    return owner._id === currentUserInfo?._id
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    if (dayjs(dueDateString).isBefore(dayjs(board.createdAt))) return

    try {
      dispatch(showLoading())

      let { dueDate } = { ...data }
      if (enableEditDueDate) {
        dueDate = dayjs(data.dueDate).format(DATE_FORMAT)
      }

      const res = await updateBoard({
        boardId: board._id,
        changes: {
          title: data.title,
          description: data.description,
          type: boardAccessibility,
          dueDate: enableEditDueDate ? dueDate : ''
        }
      })

      if (res && res.data) {
        dispatch(setShouldRefreshBoardDetail(true))
        reset({
          title: res.data.title,
          description: res.data.description,
          dueDate: res.data.dueDate,
          type: res.data.type
        })
        setBoardAccessibility(res.data.type)
        setDueDateString(res.data.dueDate || '')
        setEnableEditDueDate(!!res.data.dueDate === true)
      }
    } catch (err) {
      const message = (err as AxiosError).message
      if (message === 'UNAUTHORIZED') {
        enqueueSnackbar(
          'You are not an admin to create board in this workspace.',
          {
            variant: 'error'
          }
        )
      } else {
        enqueueSnackbar((err as AxiosError).message, {
          variant: 'error'
        })
      }
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleToggleBoardAccessibility = () => {
    setBoardAccessibility((prev) => {
      let newType = prev
      if (prev === 'private') newType = 'public'
      else newType = 'private'

      if (newType === board.type) {
        setValue('type', newType, { shouldDirty: false })
      }
      setValue('type', newType, { shouldDirty: true })
      return newType
    })
  }

  const handleResetForm = () => {
    setBoardAccessibility(board.type)
    setDueDateString(board.dueDate || '')
    setEnableEditDueDate(!!board.dueDate === true)
    reset()
  }

  const isOnlyDueDateChange = () => {
    let count = 0

    for (const key in formState.dirtyFields) {
      if (
        Object.prototype.hasOwnProperty.call(formState.dirtyFields, key) &&
        formState.dirtyFields[key] === true
      ) {
        count++
      }
    }

    return count === 1 && formState.dirtyFields.dueDate === true
  }

  const handleEnableEditDueDate = () => {
    setEnableEditDueDate((prev) => {
      const nextState = !prev

      // enable edit
      if (nextState) {
        // board has already had due date
        if (!!board.dueDate === true) {
          // temp way to reset dueDate field
          if (isOnlyDueDateChange()) reset()
          setDueDateString(dayjs(board.dueDate).format(DATE_FORMAT))
        } else {
          setDueDateString(dayjs().add(1, 'day').format(DATE_FORMAT))
          setValue('dueDate', dayjs().add(1, 'day').format(DATE_FORMAT), {
            shouldDirty: true
          })
        }
      }
      // disable edit
      else if (!board.dueDate && isOnlyDueDateChange()) reset()
      else {
        setDueDateString('')
        setValue('dueDate', '', { shouldDirty: true })
      }

      return nextState
    })
  }

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>General info</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input>
            <p className="label">Name</p>
            <WithController control={control} name="title">
              <TextInput
                label=""
                sx={{ height: '35px', border: '0' }}
                disabled={!isCurrentUSerOwner()}
              />
            </WithController>
          </Input>

          <Input className="disabled">
            <p className="label">Workspace</p>
            <TextInput
              disabled
              label=""
              sx={{ height: '35px' }}
              value={workspaceOfCurrentBoard?.name}
            />
          </Input>

          <Input>
            <div className="label label--one-line">
              <p>Due date</p>
              <Switch
                disabled={!isCurrentUSerOwner()}
                size="small"
                id="enable-edit-date-time"
                checked={enableEditDueDate}
                onChange={handleEnableEditDueDate}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
            <DateTimeInput
              format={DATE_FORMAT}
              value={dayjs(dueDateString)}
              disabled={!enableEditDueDate || !isCurrentUSerOwner()}
              minDateTime={dayjs(board.createdAt)}
              sx={{
                opacity: enableEditDueDate ? 1 : 0.5
              }}
              onChange={(value: Dayjs | Date | null) => {
                setDueDateString(dayjs(value).toString())
                setValue('dueDate', dayjs(value).toString(), {
                  shouldDirty: true
                })
              }}
              onError={(error, _value) => {
                setError('dueDate', { message: 'error' })
                setDateError(error as string)
              }}
            />
            <p className="error">
              {dateError === 'minDate' &&
                `Must be after created date: ${dayjs(board.createdAt).format(
                  DATE_FORMAT
                )}`}

              {dateError === 'invalidDate' &&
                `Mus be in the format YYYY-MM-DD HH:mm`}
            </p>
          </Input>

          <Input className="one-line">
            <p className="label">Public</p>
            <Switch
              disabled={!isCurrentUSerOwner()}
              checked={boardAccessibility === 'public'}
              onChange={handleToggleBoardAccessibility}
              id="is-project-public"
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Input>

          <Input>
            <p className="label">Description</p>
            <WithController control={control} name="description">
              <TextInput
                label=""
                multiple={true}
                row={3}
                disabled={!isCurrentUSerOwner()}
              />
            </WithController>
          </Input>

          {isCurrentUSerOwner() && formState.isDirty && (
            <FormActionsGroup>
              <Button
                color="error"
                variant="outlined"
                onClick={handleResetForm}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={() => console.log(getValues())}
              >
                Save
              </Button>
            </FormActionsGroup>
          )}

          <Input>
            <p className="label">Owner</p>
            <User>
              <GeneralAvatar>
                <img src={owner?.avatar} alt="" />
              </GeneralAvatar>
              <GeneralInfoStyled>
                <p className="name">{`${owner?.firstName} ${owner?.lastName}`}</p>
                <p className="email">{`${owner?.email}`}</p>
              </GeneralInfoStyled>
            </User>
          </Input>
        </Form>
      </AccordionDetails>
    </Accordion>
  )
}
