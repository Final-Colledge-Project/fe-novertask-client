import { useNavigate } from 'react-router-dom'
import IProps from './IProps'
import {
  Assignee,
  IssueContainer,
  IssueKey,
  IssueTitle,
  IssueTypeIcon,
  Status,
  StatusContainer,
  StoryPoint
} from './styles'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { Avatar, Tooltip } from '@mui/material'
import { EMPTY_ISSUE_TYPE } from '~/utils/constant/card'
import { COLOR } from '~/utils/constant'

export default function Issue(props: IProps) {
  // ----------------STATE AND PROPS----------------
  const { issue } = props
  const issueTypeData = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )
  const statusData = useSelector((state: StoreType) => state.column.allColumns)

  // ----------------FUNCTIONS----------------
  const navigateTo = useNavigate()

  const showIssueDetail = () => {
    navigateTo(`cards/${issue._id}`)
  }

  const findIssueTypeIcon = (issueTypeId: string) => {
    if (issueTypeId) {
      const issueType = issueTypeData.find(
        (issueType) => issueType._id === issueTypeId
      )
      return issueType?.icon || EMPTY_ISSUE_TYPE
    }
    return EMPTY_ISSUE_TYPE
  }

  const findStatusColor = (statusId: string) => {
    if (statusId) {
      const status = statusData.find((status) => status._id === statusId)
      return status?.color ?? COLOR.BLUE.main
    }
    return COLOR.BLUE.main
  }

  return (
    <IssueContainer onClick={showIssueDetail}>
      {/* -------KEY------- */}
      {/* <IssueKey>{issue.cardId}</IssueKey> */}

      {/* -------ISSUE TYPE ICON------- */}
      <Tooltip title={issue.issueType.name}>
        <IssueTypeIcon src={findIssueTypeIcon(issue.issueType._id)} />
      </Tooltip>

      {/* -------TITLE------- */}
      <IssueTitle $isResolved={issue.column.isResolved}>
        {issue.title}
      </IssueTitle>

      {/* -------STATUS------- */}
      <StatusContainer>
        <Tooltip title={'Status'}>
          <Status $color={findStatusColor(issue.column._id)}>
            {issue.column.title}
          </Status>
        </Tooltip>
      </StatusContainer>

      {/* -------STORY POINT------- */}
      <Tooltip title="Story Point">
        <StoryPoint>{issue.storyPoint ? issue.storyPoint : '-'}</StoryPoint>
      </Tooltip>

      {/* -------ASSIGNEE------- */}
      <Assignee>
        {issue.assignee ? (
          <Tooltip title={issue.assignee?.fullName}>
            <Avatar
              src={issue.assignee?.avatar}
              sx={{ width: '30px', height: '30px' }}
            />
          </Tooltip>
        ) : (
          <Tooltip title={'Unassigned'}>
            <Avatar src={''} sx={{ width: '30px', height: '30px' }} />
          </Tooltip>
        )}
      </Assignee>
    </IssueContainer>
  )
}
