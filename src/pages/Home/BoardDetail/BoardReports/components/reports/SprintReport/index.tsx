import { getSprintReport } from '~/services/reportService'
import { DATE_FORMAT2, SPRINT_STATUS } from '~/utils/constant'
import { ISprintReportProps, exportChartPdf } from './helper'
import './styles.scss'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { useState } from 'react'
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ISprint } from '~/services/types'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import CompletedTable from './CompletedTable'
import { ISprintReport } from '~/services/reportService/resTypes'
import { RiDownloadLine } from 'react-icons/ri'
import { LoadingOutlined } from '@ant-design/icons'
import { Empty } from 'antd'
const SprintReport = (props: ISprintReportProps) => {
  const { boardId, reportType } = props
  const allSprints = useSelector((state: StoreType) => state.sprint.allSprints)
  const sprintLoading = useSelector((state: StoreType) => state.sprint.loading)
  const [isExport, setIsExport] = useState<boolean>(false)
  const priorityLoading = useSelector(
    (state: StoreType) => state.priority.loading
  )
  const [selectedSprint, setSelectedSprint] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sprintData, setSprintData] = useState<ISprintReport>(
    [] as unknown as ISprintReport
  )

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

  const exportReport = async () => {
    try {
      const table = document.getElementById('sprint-table') as HTMLElement
      const fileName = `sprint-report-${dayjs().unix()}`
      await exportChartPdf(fileName, table, reportType, setIsExport)
    } catch (err) {
      setIsExport(false)
      enqueueSnackbar('Export Failed', { variant: 'error' })
    }
  }

  return (
    <div>
      <div className="wrapper">
        <div className="wrapperHeader">
          <div className="filterGroup">
            <div className="sprintFilterItem">
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#8c8c8c'
                }}>
                Sprint
              </span>
              <Select
                value={selectedSprint}
                onChange={handleChangeSprint}
                size="small">
                {sprintOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <Button
              variant="contained"
              size="medium"
              onClick={handleSubmitSprint}
              disabled={!selectedSprint.length || isProcessing || isExport}
              startIcon={isProcessing ? <LoadingOutlined /> : null}>
              Submit
            </Button>
          </div>
          <Button
            variant="outlined"
            startIcon={isExport ? <LoadingOutlined /> : <RiDownloadLine />}
            onClick={exportReport}
            disabled={isExport || !Object.keys(sprintData).length}>
            Export PDF
          </Button>
        </div>
        {!Object.keys(sprintData).length && <Empty />}
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
                <span className="itemValue">{sprintData.totalStoryPoint}</span>
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
    </div>
  )
}

export default SprintReport
