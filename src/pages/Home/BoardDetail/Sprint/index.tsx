import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tooltip
} from '@mui/material'
import { RiArrowDownSLine } from 'react-icons/ri'
import { SprintSummary } from './styles'
import { IProps } from './IProps'
import { useState } from 'react'
import { IssueList, StatusItem } from './styles'
import Issue from './Issue'
import Empty from '~/components/Empty'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import dayjs from 'dayjs'
import { SPRINT_MODAL_VIEW_MODE, SPRINT_STATUS } from '~/utils/constant/sprint'
import { DATE_FORMAT } from '~/utils/constant/common'
import AddSprintDialog from '../AddSprintDialog'
import { IBoard } from '~/services/types'

export default function Sprint(props: IProps) {
  const { sprint, board, canStartSprint } = props
  const [expanded, setExpanded] = useState<string | false>(false)
  const columnData = useSelector((state: StoreType) => state.column.allColumns)
  const [startSprint, setStartSprint] = useState(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const statusList = () => {
    if (columnData.length === 0) return []
    else {
      const result = []
      columnData.forEach((column) => {
        result.push({
          count: sprint.cards.filter((card) => card.column._id === column._id)
            .length,
          color: column.color,
          name: column.title
        })
      })
      return result
    }
  }

  const isBacklog = () => sprint.status === SPRINT_STATUS.backlog

  const dateString = () => {
    if (sprint.startDate && sprint.endDate) {
      return `${dayjs(sprint.startDate).format(DATE_FORMAT)} - ${dayjs(
        sprint.endDate
      ).format(DATE_FORMAT)}`
    }
    return ''
  }

  const handleStartSprint = (newValue: boolean) => {
    setStartSprint(newValue)
  }

  return (
    <>
      <Accordion
        key={sprint._id}
        sx={{ width: '100%' }}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}>
        <AccordionSummary
          sx={{
            width: '100%',
            '.MuiAccordionSummary-content': {
              width: '100%'
            }
          }}
          expandIcon={<RiArrowDownSLine />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <SprintSummary style={{ width: '100%' }}>
            <div className="sprint-key">{`${board?.key} ${sprint.name}`}</div>
            {!isBacklog() && <p className="time">{dateString()}</p>}
            <p className="time">{`${sprint.cardOrderIds.length} issues`}</p>
            {canStartSprint && !isBacklog() && (
              <div className="actions">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleStartSprint(true)
                  }}
                  sx={{ marginLeft: 'auto' }}>
                  Start
                </Button>
              </div>
            )}
            <div className="status-static">
              {statusList().map((status) => (
                <Tooltip title={status.name}>
                  <StatusItem $color={status.color}>{status.count}</StatusItem>
                </Tooltip>
              ))}
            </div>
          </SprintSummary>
        </AccordionSummary>
        <AccordionDetails>
          <IssueList>
            {sprint.cards.map((card) => (
              <Issue key={card._id} issue={card} />
            ))}

            {sprint.cards.length === 0 && (
              <Empty description="Sprint is empty!" />
            )}
          </IssueList>
        </AccordionDetails>
      </Accordion>
      <AddSprintDialog
        board={board as IBoard}
        createSuccessCb={() => {}}
        open={startSprint}
        onCancel={() => handleStartSprint(false)}
        mode={SPRINT_MODAL_VIEW_MODE.edit}
      />
    </>
  )
}
