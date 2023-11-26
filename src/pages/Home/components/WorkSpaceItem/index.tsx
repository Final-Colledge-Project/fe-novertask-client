import { styled } from '@mui/material'
import './style.scss'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiMore2Fill } from 'react-icons/ri'
import IWSItemProps from './IWSItemProps'

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
  const { name, members, totalTask, completeTask, target, cover } = data
  return (
    <div className="workspace-summary-item">
      <div className="item__cover">
        <div className="item-header">
          <div className="item-header__title">{name}</div>
          <IconButton
            aria-label="more"
            sx={{
              p: '2px'
            }}
          >
            <RiMore2Fill />
          </IconButton>
        </div>
        <img src={cover} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </div>
      <div className="item-bottom">
        <div className="item-bottom__task-progress">
          <div className="progress-text">
            <p className="progress-text__title">Task progress</p>
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
        </div>
        <div className="item-bottom__info-group">
          {target ? (
            <div className="item__estimate">
              <RiFlagLine />
              <p>{target}</p>
            </div>
          ) : (
            <div></div>
          )}
          <div className="item__avatar-group">
            <AvatarGroup
              max={4}
              sx={{
                flexDirection: 'row',
                '& .MuiAvatar-root': {
                  width: '25px',
                  height: '25px',
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
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WorkSpaceItem
