import dayjs, { Dayjs } from 'dayjs'
import { isEmpty } from 'lodash'
import { useState, useEffect, useRef, useMemo } from 'react'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { uniq } from 'lodash'

// component libraries
import {
  Breadcrumbs,
  Button,
  MenuItem,
  Tooltip,
  Select as MuiSelect,
  IconButton,
  Select,
  Stack
} from '@mui/material'
import { RiCheckLine, RiCloseLine, RiEyeLine, RiLinkM } from 'react-icons/ri'

// components
import {
  Container,
  Cover,
  CardInfoPart,
  Modal,
  SquareButton,
  SubTaskContainer,
  CardInfo,
  CardInfoPartDivider,
  Owner,
  Avatar,
  Info,
  Section,
  AvatarGroup,
  Label,
  LabelContainer,
  PriorityItem,
  VisuallyHiddenInput,
  CardHeader,
  Loading,
  ReadOnlyInput,
  IssueTypeItem,
  PlaceHolder,
  Watcher,
  LogItem
} from './style'
import DateTimeInput from '~/components/DateTimeInput'
import GeneralLoading from '../components/GeneralLoading'
import DescriptionInput from './components/DescriptionInput'
import AssignMemberMenu from './components/AssignMemberMenu'
import Menu from './components/Menu'
import TitleInput from './components/TitleInput'
import AddLabelMenu from './components/AddLabelMenu'
import Subtask from './components/Subtask'
import AddSubtask from './components/AddSubtask'

// services
import {
  IBoard,
  ICard,
  ISubtask,
  ITaskLog,
  IUpdatableCard
} from '~/services/types'
import {
  assignMemberToCard,
  getCard as getCardDetail,
  getMemberInCard as getMember,
  unassignMemberToCard,
  updateCard,
  updateOnlyCoverCard
} from '~/services/cardService'
import { getBoardDetail } from '~/services/boardService'
import { getAllSubTaskInCard } from '~/services/subtaskService'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { StoreType } from '~/redux'
import { PRIORITIES } from '~/services/types'
import socketIoClient from 'socket.io-client'
import copy from '~/utils/copy'

import isFileValid from '~/utils/isFileValid'
import { DATE_FORMAT } from '~/utils/constant'
import usePermission from '~/hooks/usePermission'
import useInfo from '~/hooks/useInfo'
import WatcherList from './components/WatcherList'
import StoryPointInput from './components/StoryPointInput'
import { getIssueLog } from '~/services/taskLogService'
import { ISSUE_MODELS } from '~/utils/constant/taskLog'

const UPDATING_FIELDS = {
  description: 'description',
  priority: 'priority',
  dueDate: 'dueDate',
  label: 'label',
  storyPoint: 'storyPoint'
}

type TPriority = keyof typeof PRIORITIES

export default function CardDetail() {
  // const priorityList = useMemo(() => {
  //   const list: { priority: TPriority }[] = []
  //   forOwn(PRIORITIES, (value: string, _key: string) => {
  //     list.push({ priority: value as TPriority })
  //   })
  //   return list
  // }, [])

  dayjs.extend(isTomorrow)
  const { selectedCardId, id: boardId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useInfo()

  const userPermission = usePermission()
  const canUpdateCard = () => userPermission?.card.update

  const [card, setCard] = useState<ICard>()
  const [board, setBoard] = useState<IBoard>()
  const [cardMembers, setCardMembers] =
    useState<{ _id: string; avatar: string; fullName: string }[]>()
  const [subtasks, setSubtasks] = useState<ISubtask[]>()

  const [imageUrl, setImageUrl] = useState(card?.cover || '')
  const [file, setFile] = useState<File>()
  const [updatingField, setUpdatingField] = useState<string>()

  const [dueDateError, setDueDateError] = useState<string>()
  const [currentDueDate, setCurrentDueDate] = useState<Date | Dayjs | null>()

  const [logs, setLogs] = useState<ITaskLog[]>([])
  const memberData = useSelector((state: StoreType) => state.board.members)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cardId = useMemo(() => board?.key + '-' + card?.cardId, [board, card])
  const issueTypeData = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )
  const ISSUE_HIERARCHY = useMemo<number>(() => {
    if (!card || !issueTypeData) return -1

    const issueType = issueTypeData.find(
      (item) => item._id === card.issueType._id
    )

    if (!issueType) return -1
    return issueType.hierarchy
  }, [issueTypeData, card])
  const priorityList = useSelector(
    (state: StoreType) => state.priority.allPriorities
  )

  const handleSocketUpdateCard = (memberId: string[]) => {
    const socket = socketIoClient(import.meta.env.VITE_SERVER_URL)
    socket.emit('updateCard', memberId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const reader = new FileReader()

      const isValidError = isFileValid(file, 2, 'image')

      if (isValidError) {
        enqueueSnackbar(isValidError, { variant: 'error' })
        return
      }

      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }

      setFile(file)
      reader.readAsDataURL(file)
      event.target.value = ''
    }
  }

  const submitCover = async () => {
    // check permission before updating
    if (!canUpdateCard()) {
      enqueueSnackbar('You do not have permission to do this action!', {
        variant: 'error'
      })
      return
    }

    if (file) {
      try {
        dispatch(showLoading())

        const res = await updateOnlyCoverCard({
          cardId: selectedCardId as string,
          file,
          boardId: boardId as string
        })

        if (res && res.data) {
          dispatch(setShouldRefreshBoardDetail(true))
          await getCard()
        }
      } catch (err) {
        enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
        setCard(card)
        setImageUrl(card?.cover || '')
      } finally {
        setFile(undefined)
        dispatch(hideLoading())
      }
    }
  }

  const deleteCover = async () => {
    // check permission before updating
    if (!canUpdateCard()) {
      enqueueSnackbar('You do not have permission to do this action!', {
        variant: 'error'
      })
      return
    }

    try {
      const res = await updateCard({
        cardId: selectedCardId as string,
        changes: { cover: '' },
        boardId: boardId as string
      })

      if (res && res.data) {
        dispatch(setShouldRefreshBoardDetail(true))
        await getCard()
        setImageUrl('')
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      setCard(card)
    } finally {
      setFile(undefined)
    }
  }

  const handleUpdateCard = async (changes: IUpdatableCard) => {
    // check permission before updating
    if (!canUpdateCard()) {
      enqueueSnackbar('You do not have permission to do this action!', {
        variant: 'error'
      })
      return
    }

    try {
      if (isEmpty(changes)) return

      const res = await updateCard({
        cardId: selectedCardId as string,
        changes,
        boardId: boardId as string
      })

      if (res && res.data) {
        enqueueSnackbar('Updated successfully!', { variant: 'success' })
        dispatch(setShouldRefreshBoardDetail(true))
        await getCard()
      }
      handleSocketUpdateCard(card?.watcherIds?.map((e) => e, toString) || [])
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      setCard(card)
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleUpdateTitle = async (title: string) => {
    await handleUpdateCard({ title })
  }

  const handleUpdateDescription = async (description: string) => {
    setUpdatingField(UPDATING_FIELDS.description)
    await handleUpdateCard({ description })
    setUpdatingField('')
  }

  const handleUpdatePriority = async (priorityId: string) => {
    setUpdatingField(UPDATING_FIELDS.priority)
    await handleUpdateCard({ priorityId })
    setUpdatingField('')
  }

  const handleUpdateDueDate = async (dueDate: string) => {
    if (dueDateError) return
    setUpdatingField(UPDATING_FIELDS.dueDate)
    await handleUpdateCard({ dueDate })
    setUpdatingField('')
    setCurrentDueDate(dueDate ? dayjs(dueDate) : null)
  }

  const handleUpdateIssueType = async (issueTypeId: string) => {
    await handleUpdateCard({ issueTypeId })
  }

  const handleUpdateStoryPoint = async (storyPoint: number) => {
    setUpdatingField(UPDATING_FIELDS.storyPoint)
    await handleUpdateCard({ storyPoint })
    setUpdatingField('')
  }

  const handleSubmitDueDate = async (e: Dayjs | Date | null) => {
    // delete due date
    if (e === null) {
      await handleUpdateDueDate('')
      return
    }
    const newDate = dayjs(e).format(DATE_FORMAT).toString()
    if (newDate === 'Invalid Date' || newDate === 'minDate') return
    await handleUpdateDueDate(dayjs(e).format(DATE_FORMAT))
    setDueDateError(undefined)
  }

  const handleUpdateLabel = async (
    labelId: string,
    action: 'add' | 'remove'
  ) => {
    try {
      if (action === 'add') {
        await handleUpdateCard({ labelId })
        return
      }
      if (action === 'remove') {
        await handleUpdateCard({ labelId: null })
        return
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getUserInfoById = (userId: string) => {
    if (!memberData || !userId) return null
    let info = memberData.members.find((member) => member._id === userId)
    if (!info) {
      info = memberData.oweners.find((member) => member._id === userId)
    }
    return info
  }

  const getCard = async () => {
    try {
      const res = await getCardDetail({ cardId: selectedCardId as string })
      if (res && res.data) {
        setCard(res.data)
        setImageUrl(res.data.cover)
        setCurrentDueDate(dayjs(res.data.dueDate))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getLogs = async () => {
    try {
      const res = await getIssueLog({
        boardId: boardId as string,
        id: selectedCardId as string,
        model: ISSUE_MODELS.card
      })
      if (res && res.data) {
        setLogs(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getBoard = async () => {
    try {
      const res = await getBoardDetail({ id: boardId as string })
      if (res && res.data) {
        setBoard(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getMemberInCard = async () => {
    try {
      const res = await getMember({ cardId: selectedCardId as string })
      if (res && res.data) {
        setCardMembers(res.data.members)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const getSubtask = async () => {
    try {
      const res = await getAllSubTaskInCard({
        cardId: selectedCardId as string
      })
      if (res && res.data) {
        setSubtasks(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const refreshCard = async () => {
    await getCard()
  }

  const refreshSubtask = async () => {
    await getSubtask()
  }

  const handleSocketAssign = (memberId: string) => {
    const socket = socketIoClient(import.meta.env.VITE_SERVER_URL)
    socket.emit('assignMemberToCard', memberId)
  }

  const assignMember = async (memberId: string) => {
    try {
      const res = await assignMemberToCard({
        cardId: selectedCardId as string,
        memberId,
        boardId: boardId as string
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
        getMemberInCard()
        await getCard()
        handleSocketAssign(memberId)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const unassignMember = async (memberId: string) => {
    try {
      const res = await unassignMemberToCard({
        cardId: selectedCardId as string,
        memberId,
        boardId: boardId as string
      })

      if (res) {
        dispatch(setShouldRefreshBoardDetail(true))
        getMemberInCard()
        await getCard()
        handleSocketAssign(memberId)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  useEffect(() => {
    if (selectedCardId) {
      getCard()
      getMemberInCard()
      getSubtask()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCardId])

  useEffect(() => {
    if (boardId) {
      getBoard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId])

  useEffect(() => {
    if (boardId && selectedCardId) {
      getLogs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, selectedCardId])

  const handleCancel = () => {
    setFile(undefined)
    setImageUrl(card?.cover || '')
  }

  const columnOfCurrentCard = () => {
    if (board && card) {
      return board.columns?.find((column) => column._id === card?.columnId)
    }
    return undefined
  }

  const menuItems = [
    {
      title: 'Add cover',
      onChoose: () => {
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
      }
    },
    {
      title: 'Change column',
      onChoose: () => {}
    }
  ]

  const isAdminOrSuperAdminOfBoard: () => boolean = () => {
    if (board) {
      return !!board?.ownerIds.find((owner) => owner.user === currentUser?._id)
    }
    return false
  }

  const handleAddToClipBoard = async (valueToRemember: string) => {
    const baseURL = window.location.origin
    await copy(baseURL + valueToRemember)
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' })
  }

  // TODO: update logic + code
  const computedMenuItems = () => {
    if (card?.cover) {
      return [menuItems[1]]
    } else {
      return menuItems
    }
  }

  return (
    <Container onClick={() => {}}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {!(board && card) ? (
          <GeneralLoading />
        ) : (
          <>
            <CardHeader>
              {/* BREADCRUMB */}
              <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%' }}>
                <Link
                  to={`/u/boards/${boardId}`}
                  color="inherit"
                  className="breadcrumb__item">
                  {board?.title}
                </Link>
                <Link
                  to={`/u/boards/${boardId}`}
                  className="breadcrumb__item"
                  color="inherit">
                  {card.column.title}
                </Link>
                <div
                  color="text.primary"
                  className="breadcrumb__current-item"
                  onClick={() =>
                    handleAddToClipBoard(
                      `/u/boards/${card.boardId}/cards/${card._id}`
                    )
                  }>
                  <p>{cardId}</p>
                  <RiLinkM />
                </div>
              </Breadcrumbs>
              <WatcherList watcherIds={uniq(card.watcherIds)} />
              {canUpdateCard() && <Menu items={computedMenuItems()} />}
              <IconButton
                size="small"
                onClick={() => navigate(`/u/boards/${boardId}`)}>
                <RiCloseLine />
              </IconButton>
            </CardHeader>

            {/* CARD INFO */}
            <CardInfo>
              <CardInfoPart className="part--main">
                {/* CARD COVER */}
                <Cover className={!imageUrl ? 'no-image' : ''}>
                  {imageUrl && (
                    <img src={imageUrl || '/img/item-cover-2.png'} alt="" />
                  )}

                  <div className="cover__edit-group">
                    {card.cover && canUpdateCard() && (
                      <Button
                        className="cover__edit-button"
                        onClick={deleteCover}>
                        Delete cover
                      </Button>
                    )}
                    {canUpdateCard() && (
                      <Button className="cover__edit-button" component="label">
                        {file && imageUrl && 'Change image'}
                        {!file && imageUrl && 'Edit cover'}
                        <VisuallyHiddenInput
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileUpload}
                          accept="image/*"
                        />
                      </Button>
                    )}
                    {file && (
                      <>
                        <SquareButton onClick={handleCancel}>
                          <RiCloseLine />
                        </SquareButton>
                        <SquareButton color="success" onClick={submitCover}>
                          <RiCheckLine />
                        </SquareButton>
                      </>
                    )}
                  </div>
                </Cover>

                <Stack direction="row" spacing={1} alignItems={'center'}>
                  {/* ISSUE TYPE */}
                  <Select
                    value={card?.issueType._id}
                    onChange={(e) => handleUpdateIssueType(e.target.value)}
                    size="small"
                    IconComponent={null}
                    variant="standard"
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '.MuiInput-input': {
                        padding: '0 0 12px !important',
                        '&:focus': {
                          bgcolor: 'white !important'
                        }
                      }
                    }}
                    disableUnderline={true}>
                    {issueTypeData
                      .filter((item) => item.hierarchy === ISSUE_HIERARCHY)
                      .map((item) => (
                        <MenuItem key={item._id} value={item._id} dense>
                          <Tooltip title={item.name} placement="right">
                            <IssueTypeItem src={item.icon} />
                          </Tooltip>
                        </MenuItem>
                      ))}
                  </Select>

                  {/* CARD TITLE */}
                  <div className="title">
                    {canUpdateCard() ? (
                      <TitleInput
                        card={card}
                        onUpdateTitle={handleUpdateTitle}
                      />
                    ) : (
                      <ReadOnlyInput>{card.title}</ReadOnlyInput>
                    )}
                  </div>
                </Stack>

                {/* CARD DESCRIPTION */}
                <Section>
                  <p className="section__label">
                    <span>Description</span>
                    <span>
                      {updatingField === UPDATING_FIELDS.description && (
                        <Loading />
                      )}
                    </span>
                  </p>
                  <DescriptionInput
                    card={card}
                    onUpdateDescription={handleUpdateDescription}
                    disabled={!canUpdateCard()}
                  />
                </Section>

                <div className="part__divider"></div>

                <Section className="section">
                  <SubTaskContainer>
                    <div className="section__header">
                      <p className="section__title">Sub tasks</p>
                      <p>{subtasks && subtasks.length}</p>
                      {canUpdateCard() && (
                        <AddSubtask
                          cardId={card._id}
                          onRefresh={refreshSubtask}
                          boardId={boardId as string}
                        />
                      )}
                    </div>
                    {subtasks?.map((subtask) => (
                      <Subtask
                        card={card}
                        cardMembers={cardMembers!}
                        subtask={subtask}
                        key={subtask._id}
                        onRefresh={refreshSubtask}
                      />
                    ))}
                  </SubTaskContainer>
                </Section>

                <div className="part__divider"></div>
                <Section className="section">
                  <div className="section__header">
                    <p className="section__title">History</p>
                  </div>
                  {logs.map((log) => (
                    <LogItem>
                      <Tooltip
                        title={
                          getUserInfoById(log.userId)?.firstName +
                          ' ' +
                          getUserInfoById(log.userId)?.lastName
                        }>
                        <Avatar>
                          <img
                            src={getUserInfoById(log.userId)?.avatar}
                            alt=""
                          />
                        </Avatar>
                      </Tooltip>
                      <p>{`${
                        getUserInfoById(log.userId)?.firstName +
                        ' ' +
                        getUserInfoById(log.userId)?.lastName
                      } ${log.msg} ${log.issueModel}`}</p>
                    </LogItem>
                  ))}
                </Section>
              </CardInfoPart>

              <CardInfoPartDivider />

              <CardInfoPart className="part--sub">
                <Section>
                  <p className="section__label">Created by</p>
                  <Owner>
                    <Avatar>
                      <img src={card.reporter.avatar} alt="" />
                    </Avatar>
                    <Info>
                      <p className="name">{`${card.reporter.fullName}`}</p>
                    </Info>
                  </Owner>
                </Section>

                <div className="part__divider"></div>

                <Section>
                  <div className="section__header">
                    <p className="section__title">Assignee</p>
                    {canUpdateCard() && (
                      <AssignMemberMenu
                        currentMembers={cardMembers!}
                        boardId={card.boardId}
                        onChoose={assignMember}
                        onRemove={unassignMember}
                      />
                    )}
                  </div>

                  <AvatarGroup>
                    {cardMembers?.map((member) => (
                      <Owner>
                        <Avatar>
                          <img src={member.avatar} alt="" />
                        </Avatar>
                        <Info>
                          <p className="name">{member.fullName}</p>
                        </Info>
                      </Owner>
                    ))}

                    {cardMembers?.length === 0 && (
                      <PlaceHolder>Choose a user</PlaceHolder>
                    )}
                  </AvatarGroup>
                </Section>

                <div className="part__divider"></div>

                {/* DUE DATE */}
                <Section>
                  <p className="section__label">
                    <span>Due date</span>
                    <span>
                      {updatingField === UPDATING_FIELDS.dueDate && <Loading />}
                    </span>
                  </p>
                  <DateTimeInput
                    disableOpenPicker={false}
                    disabled={!canUpdateCard()}
                    className={
                      dayjs(card.dueDate).isTomorrow()
                        ? 'due-date--tomorrow due-date'
                        : 'due-date'
                    }
                    format={'MMM DD YYYY, HH:mm'}
                    value={currentDueDate}
                    sx={{ width: '100%' }}
                    minDateTime={dayjs(card.createdAt)}
                    onError={(e) => {
                      setDueDateError(e as string)
                    }}
                    onAccept={handleSubmitDueDate}
                  />
                </Section>

                <div className="part__divider"></div>

                <Section>
                  <p className="section__label">
                    <span>Priority</span>
                    <span>
                      {updatingField === UPDATING_FIELDS.priority && (
                        <Loading />
                      )}
                    </span>
                  </p>
                  <MuiSelect
                    value={card.priority._id}
                    disabled={!canUpdateCard()}
                    sx={{
                      height: '50px',
                      '& .MuiList-root': {
                        flexDirection: 'column'
                      }
                    }}
                    onChange={(e) => handleUpdatePriority(e.target.value)}>
                    {priorityList.map((item) => (
                      <MenuItem
                        value={item._id as string}
                        key={item._id as string}>
                        <PriorityItem $color={item.color}>
                          {item.name}
                        </PriorityItem>
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </Section>

                <div className="part__divider"></div>

                <Section>
                  <div className="section__header">
                    <p className="section__title">Labels</p>
                    {canUpdateCard() && (
                      <AddLabelMenu
                        boardId={boardId as string}
                        onChoose={handleUpdateLabel}
                        card={card}
                        refreshCard={refreshCard}
                      />
                    )}
                  </div>
                  <LabelContainer>
                    <Label $color={card?.label?.color as string}>
                      {card?.label?.name}
                      {card?.label && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleUpdateLabel('', 'remove')}>
                          <RiCloseLine />
                        </IconButton>
                      )}
                    </Label>
                    {!card?.label && <PlaceHolder>Choose a label</PlaceHolder>}
                  </LabelContainer>
                </Section>

                {/* CARD STORY POINT */}
                <Section>
                  <p className="section__label">
                    <span>Story point</span>
                    <span>
                      {updatingField === UPDATING_FIELDS.storyPoint && (
                        <Loading />
                      )}
                    </span>
                  </p>
                  <StoryPointInput
                    card={card}
                    onUpdate={handleUpdateStoryPoint}
                    disabled={!canUpdateCard()}
                  />
                </Section>
              </CardInfoPart>
            </CardInfo>
          </>
        )}
      </Modal>
    </Container>
  )
}
