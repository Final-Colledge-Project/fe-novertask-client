import {
  Avatar,
  AvatarGroup,
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiFolderAddLine, RiMore2Fill } from 'react-icons/ri'
import IWSItemProps from './IWSItemProps'
import {
  CreatedDate,
  Item,
  ItemCover,
  MoreButton,
  ProgressSection,
  TargetDate,
  Title
} from './styles'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(4, 199, 190, 0.20)'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mint.main
  }
}))

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  const { name, members, totalTask, completeTask, target, cover, createdAt } =
    data
  return (
    <Item $img={cover}>
      <ItemCover className="section">
        <img src={cover} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </ItemCover>
      <Title className="section">
        <p>{name}</p>
      </Title>
      <div className="section">
        <AvatarGroup
          max={5}
          sx={{
            flexDirection: 'row',
            '& .MuiAvatar-root': {
              width: '30px',
              height: '30px',
              ml: '-12px'
            },

            '& .MuiAvatar-root:first-child': {
              order: 3,
              fontSize: '12px',
              bgcolor: (theme) => theme.palette.gray5.main,
              color: (theme) => theme.palette.gray.main
            },
            '& .MuiAvatar-root:last-child': {
              ml: '-12px'
            }
          }}
        >
          {members.map((member) => (
            <Avatar alt="Remy Sharp" src={member.img} />
          ))}
          <Avatar alt="Remy Sharp" src={'/'} />
          <Avatar alt="Remy Sharp" src={'/'} />
          <Avatar alt="Remy Sharp" src={'/'} />
          <Avatar alt="Remy Sharp" src={'/'} />
          <Avatar alt="Remy Sharp" src={'/'} />
          <Avatar alt="Remy Sharp" src={'/'} />
        </AvatarGroup>
      </div>
      <ProgressSection className="section">
        <div className="progress-text">
          <p className="progress-text__title">Task</p>
          <p className="progress-text__number">
            {completeTask}/{totalTask}
          </p>
        </div>
        <div className="progress__bar">
          <BorderLinearProgress
            variant="determinate"
            value={(completeTask / totalTask) * 100}
          />
        </div>
      </ProgressSection>
      {createdAt ? (
        <CreatedDate className="section">
          <RiFolderAddLine />
          <p>{target}</p>
        </CreatedDate>
      ) : (
        <div></div>
      )}
      {target ? (
        <TargetDate className="section">
          <RiFlagLine />
          <p>{target}</p>
        </TargetDate>
      ) : (
        <div></div>
      )}

      <MoreButton className="section">
        <IconButton>
          <RiMore2Fill />
        </IconButton>
      </MoreButton>
    </Item>
  )
}
export default WorkSpaceItem
