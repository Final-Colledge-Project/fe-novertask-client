import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Tooltip
} from '@mui/material'
import { RiArrowDownSLine, RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
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
import { IBoard, ISprint } from '~/services/types'
import ActionMenu from './ActionMenu'
import { updateSprint } from '~/services/sprintService'
import { enqueueSnackbar } from 'notistack'
import clsx from 'clsx'

export default function Sprint(props: IProps) {
  const { sprint, board, canStartSprint, updateSuccessCb } = props
  const [expanded, setExpanded] = useState<string | false>(false)
  const columnData = useSelector((state: StoreType) => state.column.allColumns)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState(SPRINT_MODAL_VIEW_MODE.edit)

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
  const isActive = () => sprint.status === SPRINT_STATUS.active
  const isCompleted = () => sprint.status === SPRINT_STATUS.completed
  const isPending = () => sprint.status === SPRINT_STATUS.pending

  const isStartMode = () => dialogMode === SPRINT_MODAL_VIEW_MODE.start
  const isEditMode = () => dialogMode === SPRINT_MODAL_VIEW_MODE.edit

  const dateString = () => {
    if (sprint.startDate && sprint.endDate) {
      return `${dayjs(sprint.startDate).format(DATE_FORMAT)} - ${dayjs(
        sprint.endDate
      ).format(DATE_FORMAT)}`
    }
    return ''
  }

  const getSprintStatus = () => {
    if (isBacklog()) return 'Backlog'
    if (isActive()) return 'Active'
    if (isCompleted()) return 'Completed'
    if (isPending()) return 'Pending'
  }

  // open start sprint dialog
  const handleOpenSprintDialog = (newValue: boolean) => {
    setOpenDialog(newValue)
  }

  const handleEditSprintForStart = () => {
    setDialogMode(SPRINT_MODAL_VIEW_MODE.start)
    handleOpenSprintDialog(true)
  }

  const handleEditSprintOnly = () => {
    setDialogMode(SPRINT_MODAL_VIEW_MODE.edit)
    handleOpenSprintDialog(true)
  }

  const handleCompleteSprint = async () => {
    if (!board?._id || !sprint?._id) return
    try {
      await updateSprint({
        boardId: board._id,
        sprint: {
          _id: sprint._id,
          status: SPRINT_STATUS.completed
        }
      })
      enqueueSnackbar('Complete sprint successfully', { variant: 'success' })
      if (updateSuccessCb) updateSuccessCb()
    } catch (e) {
      enqueueSnackbar('Complete sprint failed', { variant: 'error' })
    }
  }
  const handleEditSprint = () => {}
  const handleDeleteSprint = () => {}

  const actionMenuItems = [
    {
      title: 'Edit',
      onChoose: handleEditSprintOnly,
      icon: <RiEditLine />,
      color: 'blue',
      disabled: isCompleted() || isBacklog()
    },
    {
      title: 'Delete',
      onChoose: handleDeleteSprint,
      icon: <RiDeleteBinLine />,
      color: 'pink',
      disabled: isActive() || isBacklog()
    }
  ]

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
            <div className="status-badge-container">
              <Tooltip title={`This sprint is ${sprint.status}`}>
                <div className={clsx('status-badge', sprint.status)}>
                  {getSprintStatus()}
                </div>
              </Tooltip>
            </div>
            <div
              className={clsx(
                'sprint-key',
                isCompleted() && 'completed'
              )}>{`${board?.key} ${sprint.name}`}</div>
            {!isBacklog() && <p className="time">{dateString()}</p>}
            <p className="time">{`${sprint.cardOrderIds.length} issues`}</p>
            <div className="actions">
              {isActive() && !isBacklog() && (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ '&.MuiButton-root': { color: 'white !important' } }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleCompleteSprint()
                  }}>
                  Complete
                </Button>
              )}
              {canStartSprint && isPending() && (
                <Tooltip title="Start sprint">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      handleEditSprintForStart()
                    }}>
                    Start
                  </Button>
                </Tooltip>
              )}
            </div>
            <div className="status-static">
              {statusList().map((status) => (
                <Tooltip title={status.name}>
                  <StatusItem $color={status.color}>{status.count}</StatusItem>
                </Tooltip>
              ))}
            </div>
            {actionMenuItems.filter((item) => !item.disabled).length > 0 && (
              <ActionMenu
                items={actionMenuItems.filter((item) => !item.disabled)}
              />
            )}
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
        createSuccessCb={updateSuccessCb as () => void}
        open={openDialog}
        onCancel={() => handleOpenSprintDialog(false)}
        mode={dialogMode}
        defaultSprint={sprint as ISprint}
      />
    </>
  )
}
