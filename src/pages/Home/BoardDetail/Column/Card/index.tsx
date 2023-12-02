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

const Card = ({ card }: { card: ICard }) => {
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
          <DueDate $isOverDue={card.isOverdue}>
            <RiTimerLine />
            <p>{convertDate(card.dueDate)}</p>
          </DueDate>
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
