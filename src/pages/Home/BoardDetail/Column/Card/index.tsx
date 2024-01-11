import dayjs from 'dayjs'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import html from 'sanitize-html'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// component libraries
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { RiMore2Fill, RiTimerLine } from 'react-icons/ri'

// components
import {
  CardContainer,
  CardHeader,
  Cover,
  Divider,
  DueDate,
  Info,
  Label,
  LabelContainer,
  MemberAvatarGroup,
  Priority,
  Title
} from './style'

//services
import { ICard } from '~/services/types'
import convertDate from '~/utils/convertDate'
import { StoreType } from '~/redux'

// Dnd specific
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ card, className }: { card: ICard; className?: string }) => {
  dayjs.extend(isTomorrow)
  const {
    transform,
    transition,
    setNodeRef,
    attributes,
    listeners,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const navigate = useNavigate()
  const titleRef = useRef<HTMLDivElement>(null)
  const cardIdRef = useRef<HTMLParagraphElement>(null)
  const [isMatchedSearch, setIsMatchedSearch] = useState<boolean>(false)
  const [isUnMatchedSearch, setIsUnMatchedSearch] = useState<boolean>(false)

  const searchString = useSelector(
    (state: StoreType) => state.card.searchString
  )
  const filter = useSelector((state: StoreType) => state.card.filter)
  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)

  useEffect(() => {
    if (!titleRef.current || !cardIdRef.current) return
    else {
      if (!searchString?.trim()) {
        titleRef.current.innerHTML = html(card.title)
        cardIdRef.current.innerHTML = html(card.cardId)
        setIsMatchedSearch(false)
        setIsUnMatchedSearch(false)
        return
      }
      const startIndexesOfTitle = findAllIndex(card.title, searchString)
      const startIndexesOfId = findAllIndex(card.cardId, searchString)

      if (startIndexesOfTitle.length > 0 || startIndexesOfId.length > 0) {
        const resultOfTitle = highlightedString(
          card.title,
          searchString,
          startIndexesOfTitle[0]
        )

        titleRef.current.innerHTML = html(resultOfTitle, {
          allowedAttributes: { span: ['class'] }
        })

        const resultOfId = highlightedString(
          card.cardId,
          searchString,
          startIndexesOfId[0]
        )

        cardIdRef.current.innerHTML = html(resultOfId, {
          allowedAttributes: { span: ['class'] }
        })

        setIsMatchedSearch(true)
        setIsUnMatchedSearch(false)
      } else {
        setIsMatchedSearch(false)
        setIsUnMatchedSearch(true)
        titleRef.current.innerHTML = html(card.title)
        cardIdRef.current.innerHTML = html(card.cardId)
      }
    }
  }, [searchString, card])

  const findAllIndex = (baseString: string, searchString: string) => {
    let index = -1
    const indexes = []

    // eslint-disable-next-line no-constant-condition
    while (true) {
      index = baseString
        .toLowerCase()
        .indexOf(searchString.toLowerCase(), index + 1)
      if (index === -1) break
      indexes.push(index)
    }

    return indexes
  }

  const highlightedString = (
    baseString: string,
    searchString: string,
    index: number
  ) => {
    const pattern = new RegExp(`${searchString}`, 'gi')

    let result = baseString

    const original = result.substring(index, index + searchString.length)

    result = result.replace(
      pattern,
      `<span class="highlight">${original}</span>`
    )
    return result
  }

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerHTML = html(card.title)
    }
    if (cardIdRef.current) {
      cardIdRef.current.innerHTML = html(card.cardId)
    }
  }, [card.title, card.cardId])

  const isAssignToCurrentUser = useCallback(() => {
    return !!card.memberIds.find((member) => member._id === currentUser?._id)
  }, [card.memberIds, currentUser?._id])

  return (
    <CardContainer
      onClick={(e) => {
        navigate('cards/' + card._id)
        e.stopPropagation()
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={clsx(
        card.FE_ONLY_PLACEHOLDER && 'fe-only',
        className,
        isMatchedSearch && 'matched-search',
        isUnMatchedSearch && 'un-matched-search',
        !isAssignToCurrentUser() && filter.assignToMe && 'unassigned-to-me'
      )}
    >
      {card.cover && (
        <Cover>
          <img src={card.cover} alt="" />
        </Cover>
      )}
      {card.label && (
        <LabelContainer>
          <Label $color={card.label.color}>{card.label.name}</Label>
        </LabelContainer>
      )}
      {card.label && <Divider />}
      <CardHeader>
        <div className="badges">
          <p ref={cardIdRef} className={clsx('card-id')}></p>
          <Priority $priority={card.priority} className={card.priority}>
            {card.priority}
          </Priority>
        </div>
        {/* <IconButton size="small">
          <RiMore2Fill />
        </IconButton> */}
      </CardHeader>
      <Title ref={titleRef} />
      <Info>
        <div className="info-section">
          {convertDate(card.dueDate) ? (
            <DueDate
              $isOverDue={card.isOverdue}
              $isCloseToDue={dayjs(card.dueDate).isTomorrow()}
            >
              <RiTimerLine />
              <p>{convertDate(card.dueDate)}</p>
            </DueDate>
          ) : (
            <div></div>
          )}
          <MemberAvatarGroup>
            {card.memberIds.map((mem) => (
              <Tooltip key={mem._id} title={mem.fullName}>
                <Avatar src={mem.avatar} />
              </Tooltip>
            ))}
          </MemberAvatarGroup>
        </div>
      </Info>
    </CardContainer>
  )
}

export default Card
