import { getSprintReport } from '~/services/reportService'
import { DATE_FORMAT2, SPRINT_STATUS } from '~/utils/constant'
import { ISprintReportProps } from './helper'
import Loading from '~/components/Loading'
import './styles.scss'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import useFetchBoardData from '~/hooks/useFetchBoardData'
import { BOARD_RESOURCES } from '~/utils/constant/board'
import { useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { ISprint } from '~/services/types'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import CompletedTable from './CompletedTable'
import { ISprintReport } from '~/services/reportService/resTypes'
const SprintReport = (props: ISprintReportProps) => {
  const { boardId, setExportFn } = props
  const allSprints = useSelector((state: StoreType) => state.sprint.allSprints)
  const sprintLoading = useSelector((state: StoreType) => state.sprint.loading)
  const priorityLoading = useSelector(
    (state: StoreType) => state.priority.loading
  )
  const [selectedSprint, setSelectedSprint] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sprintData, setSprintData] = useState<ISprintReport>(
    [] as unknown as ISprintReport
  )
  useFetchBoardData({ key: BOARD_RESOURCES.sprint, boardId })
  useFetchBoardData({ key: BOARD_RESOURCES.priority, boardId })
  useFetchBoardData({ key: BOARD_RESOURCES.issueType, boardId })

  const sprintOptions = (allSprints || [])
    .filter((item: ISprint) => item?.status !== SPRINT_STATUS.backlog)
    .map((sprint) => ({
      value: sprint._id,
      label: sprint.name
    }))

  const handleChangeSprint = (e: SelectChangeEvent) => {
    setSelectedSprint(e.target.value)
  }

  const getReportData = async () => {
    try {
      setIsLoading(true)
      const data = await getSprintReport(boardId, selectedSprint)
      if (!data) return
      setSprintData(data)
      setIsLoading(false)
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const handleSubmitSprint = () => {
    if (selectedSprint) {
      getReportData()
    }
  }

  const isProcessing = sprintLoading || priorityLoading || isLoading
  return (
    <div>
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="filterGroup">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="sprint-select">Sprint</InputLabel>
              <Select
                id="sprint-select"
                value={selectedSprint}
                label="Sprint"
                onChange={handleChangeSprint}
                autoWidth>
                {sprintOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="medium"
              onClick={handleSubmitSprint}
              disabled={!selectedSprint.length}>
              Submit
            </Button>
          </div>
          {Object.keys(sprintData).length > 0 && selectedSprint.length > 0 && (
            <div className="sprintInfo">
              <div className="sprintItemGroup">
                <div className="sprintItem">
                  <span className="itemLabel">StartDate:</span>
                  <span className="itemValue">
                    {dayjs(sprintData.startDate).format(DATE_FORMAT2)}
                  </span>
                </div>
                <div className="sprintItem">
                  <span className="itemLabel">EndDate:</span>
                  <span className="itemValue">
                    {dayjs(sprintData.endDate).format(DATE_FORMAT2)}
                  </span>
                </div>
              </div>
              <div className="sprintItemGroup">
                <div className="sprintItem">
                  <span className="itemLabel">Created By:</span>
                  <span className="itemValue">{sprintData.creatorId}</span>
                </div>
              </div>
              <div className="sprintItemGroup">
                <div className="sprintItem">
                  <span className="itemLabel">Story point committed:</span>
                  <span className="itemValue">
                    {sprintData.totalStoryPoint}
                  </span>
                </div>
                <div className="sprintItem">
                  <span className="itemLabel">Story point achieved:</span>
                  <span className="itemValue">
                    {sprintData.completedStoryPoint}
                  </span>
                </div>
              </div>
            </div>
          )}
          {sprintData?.completedTasks && selectedSprint.length > 0 && (
            <div className="sprintTable">
              <CompletedTable data={sprintData.completedTasks} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SprintReport
