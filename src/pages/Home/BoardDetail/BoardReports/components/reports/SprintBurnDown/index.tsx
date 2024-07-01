import { getBurnDownReport } from '~/services/reportService'
import { FORMAT_DATE, SPRINT_STATUS } from '~/utils/constant'
import {
  IDataChart,
  ISprintBurnDownProps,
  chartOptions,
  exportChartPdf
} from './helper'
import { Button, MenuItem, Select } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import './styles.scss'
import LineChart from '~/components/Charts/LineChart'
import dayjs from 'dayjs'
import { RiDownloadLine } from 'react-icons/ri'
import { LoadingOutlined } from '@ant-design/icons'
import { enqueueSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { ISprint } from '~/services/types'
import { IBurnDownReport } from '~/services/reportService/resTypes'
import { Empty } from 'antd'
const SprintBurnDownReport = (props: ISprintBurnDownProps) => {
  const { boardId, reportType } = props
  const chartRef = useRef<unknown>(null)
  const { allSprints } = useSelector((state: StoreType) => state.sprint)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedSprint, setSelectedSprint] = useState<string>('')
  const [estimationField, setEstimationField] = useState<string>('Story Points')
  const sprintOptions = (allSprints || [])
    .filter((item: ISprint) => item?.status !== SPRINT_STATUS.backlog)
    .map((sprint) => ({
      value: sprint._id,
      label: sprint.name
    }))
  const [isExport, setIsExport] = useState<boolean>(false)
  const [dataChart, setDataChart] = useState<IDataChart>({
    sprintDays: [],
    actualBurnDown: [],
    idealBurnDown: []
  })
  const [sprintData, setSprintData] = useState<IBurnDownReport>(
    {} as IBurnDownReport
  )

  // const { data: sprintData, isLoading } = useQuery({
  //   queryKey: [QUERY_KEY.burndown_report, sprintId],
  //   queryFn: () => {
  //     return getBurnDownReport(boardId, sprintId)
  //   },
  //   refetchOnWindowFocus: false
  // })

  const getReportData = async () => {
    try {
      setIsLoading(true)
      const data = await getBurnDownReport(boardId, selectedSprint)
      if (!data) return
      setSprintData(data)
      setIsLoading(false)
    } catch (err) {
      enqueueSnackbar('Generate Export Failed', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (sprintData) {
      const { dailyStoryPoints, totalStoryPoint } = sprintData
      const sprintDays = (dailyStoryPoints || []).map((point) =>
        dayjs(point.date).format(FORMAT_DATE)
      )
      const actualBurnDown = (dailyStoryPoints || []).map(
        (point) => point.storyPoints
      )
      const idealBurnDown = Array.from(
        { length: sprintDays.length },
        (_, i) => totalStoryPoint - (totalStoryPoint / sprintDays.length) * i
      )
      setDataChart({
        sprintDays: sprintDays,
        actualBurnDown: actualBurnDown,
        idealBurnDown: idealBurnDown
      })
    }
  }, [JSON.stringify(sprintData)])

  const dataSet = {
    labels: dataChart.sprintDays,
    datasets: [
      {
        label: 'Actual Burn Down',
        data: dataChart.actualBurnDown,
        fill: false,
        backgroundColor: 'rgba(255, 149, 0, 0.2)',
        borderColor: 'rgba(255, 149, 0, 1 )',
        tension: 0.1
      },
      {
        label: 'Ideal Burn Down',
        data: dataChart.idealBurnDown,
        fill: false,
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        borderColor: 'rgba(0, 122, 255, 1)',
        tension: 0.1
      }
    ]
  }

  const exportReport = async () => {
    try {
      const fileName = `sprint-burn-down-${dayjs().unix()}`
      await exportChartPdf(chartRef, fileName, reportType, setIsExport)
    } catch (err) {
      console.log('🚀 ~ exportReport ~ err:', err)
      setIsExport(false)
      enqueueSnackbar('Export Failed', { variant: 'error' })
    }
  }

  const handleSubmitSprint = () => {
    if (selectedSprint) {
      getReportData()
    }
  }
  return (
    <div>
      <div className="wrapper">
        <div className="wrapperHeader">
          <div className="sprintFilter">
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
                onChange={(e) => {
                  setSelectedSprint(e.target.value)
                }}
                sx={{
                  width: '200px'
                }}
                size="small">
                {sprintOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="sprintFilterItem">
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#8c8c8c'
                }}>
                Estimation field
              </span>
              <Select
                value={estimationField}
                onChange={(e) => {
                  setSelectedSprint(e.target.value)
                }}
                sx={{
                  width: '200px'
                }}
                size="small">
                <MenuItem value={'Story Points'}>Story Point</MenuItem>
                <MenuItem value={'Time'}>Time</MenuItem>
              </Select>
            </div>
            <div className="submitBtn">
              <Button
                variant="contained"
                size="medium"
                startIcon={isLoading ? <LoadingOutlined /> : null}
                onClick={handleSubmitSprint}
                disabled={!selectedSprint.length}>
                Submit
              </Button>
            </div>
          </div>
          <Button
            variant="outlined"
            startIcon={isExport ? <LoadingOutlined /> : <RiDownloadLine />}
            onClick={exportReport}
            disabled={isExport || !(sprintData.dailyStoryPoints || []).length}>
            Export PDF
          </Button>
        </div>
        <div className="sprintChart">
          {!(sprintData.dailyStoryPoints || []).length ? (
            <Empty />
          ) : (
            <LineChart
              options={chartOptions}
              data={dataSet}
              chartRef={chartRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SprintBurnDownReport
