import dayjs, { Dayjs } from 'dayjs'
import { isEmpty } from 'lodash'
import { useState, useEffect, useRef, useMemo } from 'react'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { forOwn } from 'lodash'

// component libraries
import {
  Breadcrumbs,
  Button,
  MenuItem,
  Tooltip,
  Select as MuiSelect,
  IconButton
} from '@mui/material'
import { RiCheckLine, RiCloseLine, RiLinkM } from 'react-icons/ri'

// components
import {
  Container,
  Cover,
  CardInfoPart,
  Modal,
  SquareButton,
  SubTaskContainer,
  SubTaskItem,
  SubTaskItemBody,
  SubTaskItemHeader,
  CardInfo,
  CardInfoPartDivider,
  Owner,
  Avatar,
  Info,
  Section,
  AvatarGroup,
  Label,
  LabelContainer,
  AddItemButton,
  PriorityItem,
  VisuallyHiddenInput,
  CardHeader,
  Loading,
  ActionGroup,
  Error
} from './style'
import DateTimeInput from '~/components/DateTimeInput'
import GeneralLoading from '../components/GeneralLoading'
import DescriptionInput from './components/DescriptionInput'
import AssignMemberMenu from './components/AssignMemberMenu'
import Menu from './components/Menu'
import TitleInput from './components/TitleInput'
import AddLabelMenu from './components/AddLabelMenu'

// services
import { IBoard, ICard, ISubtask } from '~/services/types'
import {
  assignMemberToCard,
  getCard as getCardDetail,
  getMemberInCard as getMember,
  updateCard,
  updateOnlyCoverCard
} from '~/services/cardService'
import { getBoardDetail } from '~/services/boardService'
import { getAllSubTaskInCard } from '~/services/subtaskService'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'
import { StoreType } from '~/redux'
import { PRIORITIES } from '~/services/types'

import isFileValid from '~/utils/isFileValid'
import { DATE_FORMAT } from '~/utils/constant'

import socketIoClient from 'socket.io-client'
const UPDATING_FIELDS = {
  description: 'description',
  priority: 'priority',
  dueDate: 'dueDate'
}

type TPriority = keyof typeof PRIORITIES

export default function CardDetail() {
  const priorityList = useMemo(() => {
    const list: { priority: TPriority }[] = []
    forOwn(PRIORITIES, (value: string, _key: string) => {
      list.push({ priority: value as TPriority })
    })
    return list
  }, [])

  dayjs.extend(isTomorrow)
  const { selectedCardId, id: boardId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  const [card, setCard] = useState<ICard>()
  const [board, setBoard] = useState<IBoard>()
  const [cardMembers, setCardMembers] =
    useState<{ _id: string; avatar: string; fullName: string }[]>()
  const [subtasks, setSubtasks] = useState<ISubtask[]>()

  const [imageUrl, setImageUrl] = useState(card?.cover || '')
  const [file, setFile] = useState<File>()
  const [updatingField, setUpdatingField] = useState<string>()

  const [dueDateError, setDueDateError] = useState<string>()
  const [dueDateDirty, setDueDateDirty] = useState<boolean>(false)
  const [currentDueDate, setCurrentDueDate] = useState<Date | Dayjs>()

  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (file) {
      try {
        dispatch(showLoading())

        const res = await updateOnlyCoverCard({
          cardId: selectedCardId as string,
          file
        })

        if (res && res.data) {
          dispatch(setShouldRefreshBoardDetail(true))
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
    try {
      const res = await updateCard({
        cardId: selectedCardId as string,
        changes: { cover: '' }
      })

      if (res && res.data) {
        dispatch(setShouldRefreshBoardDetail(true))
        setImageUrl('')
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
      setCard(card)
    } finally {
      setFile(undefined)
    }
  }

  const handleUpdateCard = async (changes: {
    title?: string
    description?: string
    priority?: string
    dueDate?: string
    labelId?: string | null
  }) => {
    try {
      if (isEmpty(changes)) return

      const res = await updateCard({
        cardId: selectedCardId as string,
        changes
      })

      if (res && res.data) {
        dispatch(setShouldRefreshBoardDetail(true))
        await getCard()
      }
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

  const handleUpdatePriority = async (priority: string) => {
    setUpdatingField(UPDATING_FIELDS.priority)
    await handleUpdateCard({ priority })
    setUpdatingField('')
  }

  const handleUpdateDueDate = async () => {
    if (dueDateError) return
    setUpdatingField(UPDATING_FIELDS.dueDate)
    await handleUpdateCard({
      dueDate: dayjs(currentDueDate).format(DATE_FORMAT).toString()
    })
    setUpdatingField('')
    setDueDateDirty(false)
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

  const handleSocketAssign = (memberId: string) => {
    const socket = socketIoClient(import.meta.env.VITE_SERVER_URL)
    socket.emit('assignMemberToCard', memberId)
  }

  const assignMember = async (memberId: string) => {
    try {
      const res = await assignMemberToCard({
        cardId: selectedCardId as string,
        memberId
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

  const handleChangeDate = (e: Date | Dayjs | null) => {
    setCurrentDueDate(e as Date | Dayjs)
    if (card) {
      const initDate = dayjs(card.dueDate).format(DATE_FORMAT).toString()
      const newDate = dayjs(e).format(DATE_FORMAT).toString()

      if (newDate === 'Invalid Date' || newDate === 'minDate') {
        if (newDate === 'Invalid Date' && !card.dueDate) {
          setDueDateDirty(false)
        }
        setDueDateDirty(true)
      } else if (initDate !== newDate) {
        setDueDateDirty(true)
      } else {
        setDueDateDirty(false)
      }
    }
  }

  const handleResetDate = () => {
    setDueDateDirty(false)
    setDueDateError(undefined)
    setCurrentDueDate(dayjs(card?.dueDate))
  }

  const isAdminOrSuperAdminOfBoard: () => boolean = () => {
    if (board) {
      return !!board?.ownerIds.find((owner) => owner.user === currentUser?._id)
    }
    return false
  }

  return (
    <Container onClick={() => navigate(`/u/boards/${boardId}`)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {!(board && card) ? (
          <GeneralLoading />
        ) : (
          <>
            <CardHeader>
              <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%' }}>
                <Link
                  to={`/u/boards/${boardId}`}
                  color="inherit"
                  className="breadcrumb__item"
                >
                  {board?.title}
                </Link>
                <Link
                  to={`/u/boards/${boardId}`}
                  className="breadcrumb__item"
                  color="inherit"
                >
                  {columnOfCurrentCard()?.title}
                </Link>
                <div color="text.primary" className="breadcrumb__current-item">
                  <p>{card.cardId}</p>
                  <RiLinkM />
                </div>
              </Breadcrumbs>
              <Menu items={menuItems} />
              <IconButton
                size="small"
                onClick={() => navigate(`/u/boards/${boardId}`)}
              >
                <RiCloseLine />
              </IconButton>
            </CardHeader>
            <CardInfo>
              <CardInfoPart className="part--main">
                <Cover className={!imageUrl ? 'no-image' : ''}>
                  {imageUrl && (
                    <img src={imageUrl || '/img/item-cover-2.png'} alt="" />
                  )}

                  <div className="cover__edit-group">
                    {card.cover && (
                      <Button
                        className="cover__edit-button"
                        onClick={deleteCover}
                      >
                        Delete cover
                      </Button>
                    )}
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
                <div className="title">
                  <TitleInput card={card} onUpdateTitle={handleUpdateTitle} />
                </div>
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
                  />
                </Section>
                <div className="part__divider"></div>
                <Section className="section">
                  <SubTaskContainer>
                    <div className="section__header">
                      <p className="section__title">Sub tasks</p>
                      <p>TOTAL_COUNT</p>
                      <AddItemButton />
                    </div>
                  </SubTaskContainer>
                  {subtasks?.map((subtask) => (
                    <SubTaskItem>
                      <SubTaskItemHeader>
                        <p className="item__id">
                          <span>{subtask.subCardId}</span>
                          <RiLinkM />
                        </p>
                        <p className="item__title">{subtask.name}</p>
                      </SubTaskItemHeader>
                      <SubTaskItemBody>
                        <MuiSelect
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
                          className="section"
                          value={subtask.assignedTo?._id as string}
                        >
                          {cardMembers?.map((member) => (
                            <MenuItem value={member._id}>
                              <Owner>
                                <Avatar>
                                  <img src={member?.avatar} alt="" />
                                </Avatar>
                                <Info>
                                  <p className="name">{`${member.fullName}`}</p>
                                </Info>
                              </Owner>
                            </MenuItem>
                          ))}
                        </MuiSelect>
                        <p className="section">Due date</p>
                        <p className="section">Status</p>
                      </SubTaskItemBody>
                    </SubTaskItem>
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
                    {isAdminOrSuperAdminOfBoard() && (
                      <AssignMemberMenu
                        currentMembers={cardMembers!}
                        boardId={card.boardId}
                        onChoose={assignMember}
                      />
                    )}
                  </div>
                  <AvatarGroup>
                    {cardMembers?.map((member) => {
                      return (
                        <Tooltip title={member.fullName}>
                          <Avatar>
                            <img src={member.avatar} alt="" />
                          </Avatar>
                        </Tooltip>
                      )
                    })}
                  </AvatarGroup>
                </Section>
                <div className="part__divider"></div>
                <Section>
                  <p className="section__label">
                    <span>Due date</span>
                    <span>
                      {updatingField === UPDATING_FIELDS.dueDate && <Loading />}
                    </span>
                  </p>
                  <DateTimeInput
                    className={
                      dayjs(card.dueDate).isTomorrow()
                        ? 'due-date--tomorrow due-date'
                        : 'due-date'
                    }
                    format={DATE_FORMAT}
                    value={currentDueDate}
                    sx={{ width: '100%' }}
                    disableOpenPicker={true}
                    minDateTime={dayjs(card.createdAt)}
                    onError={(e) => {
                      setDueDateError(e as string)
                    }}
                    onChange={handleChangeDate}
                    onAccept={() => {
                      setDueDateError(undefined)
                    }}
                  />
                  {dueDateDirty && (
                    <ActionGroup className="mr-10">
                      <SquareButton onClick={handleResetDate}>
                        <RiCloseLine />
                      </SquareButton>
                      <SquareButton
                        color="success"
                        onClick={handleUpdateDueDate}
                      >
                        <RiCheckLine />
                      </SquareButton>
                    </ActionGroup>
                  )}
                  {dueDateError === 'minDate' && (
                    <Error>
                      {`Should be later than created day 
                      ${dayjs(card.startDate).format(`YYYY/DD/MM`)}`}
                    </Error>
                  )}
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
                    value={card.priority}
                    sx={{
                      height: '50px',
                      '& .MuiList-root': {
                        flexDirection: 'column'
                      }
                    }}
                    onChange={(e) => handleUpdatePriority(e.target.value)}
                  >
                    {priorityList.map((item) => (
                      <MenuItem
                        value={item.priority as string}
                        key={item.priority as string}
                      >
                        <PriorityItem className={item.priority}>
                          {item.priority as string}
                        </PriorityItem>
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </Section>
                <div className="part__divider"></div>
                <Section>
                  <div className="section__header">
                    <p className="section__title">Labels</p>
                    <AddLabelMenu
                      boardId={boardId as string}
                      onChoose={handleUpdateLabel}
                      card={card}
                      refreshCard={refreshCard}
                      isAdmin={isAdminOrSuperAdminOfBoard() as boolean}
                    />
                  </div>
                  <LabelContainer>
                    <Label $color={card?.label?.color as string}>
                      {card?.label?.name}
                    </Label>
                  </LabelContainer>
                </Section>
              </CardInfoPart>
            </CardInfo>
          </>
        )}
      </Modal>
    </Container>
  )
}
