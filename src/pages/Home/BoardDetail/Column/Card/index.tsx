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

//servicesv
import { ICard } from '~/services/types'
import convertDate from '~/utils/convertDate'
import dayjs from 'dayjs'
import isTomorrow  from 'dayjs/plugin/isTomorrow'

const Card = ({ card }: { card: ICard }) => {
  dayjs.extend(isTomorrow)

  return (
    <CardContainer>
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
          <p className="card-id">{card.cardId}</p>
          <Priority $priority={card.priority}>{card.priority}</Priority>
        </div>
        <IconButton size="small">
          <RiMore2Fill />
        </IconButton>
      </CardHeader>
      <Title>{card.title}</Title>
      <Info>
        <div className="info-section">
          {convertDate(card.dueDate) ? (
            <DueDate
              $isOverDue={card.isOverdue}
              $isCloseToDue={true}
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
