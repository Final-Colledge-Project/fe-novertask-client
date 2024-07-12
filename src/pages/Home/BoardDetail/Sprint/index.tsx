import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

export default function Sprint(props: IProps) {
  const { sprint, board } = props
  const [expanded, setExpanded] = useState<string | false>(false)
  const columnData = useSelector((state: StoreType) => state.column.allColumns)

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

  return (
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
          {sprint.status !== 'backlog' && (
            <p className="time">{`${sprint.startDate} ${sprint.endDate}`}</p>
          )}
          <p className="time">{`${sprint.cardOrderIds.length} issues`}</p>
          <div className="status-static" style={{ width: '100%' }}>
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
  )
}
