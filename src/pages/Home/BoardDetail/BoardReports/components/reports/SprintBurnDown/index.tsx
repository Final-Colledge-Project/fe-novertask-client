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
  const workingDays = [1, 2, 3, 4, 5]
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
      const distanceSprint = dayjs(
        dayjs(sprintData.endDate?.split('T')[0])
      ).diff(dayjs(sprintData.startDate?.split('T')[0]), 'day')
      const sprintDays = []
      for (let i = 0; i <= distanceSprint; i++) {
        const endDate = dayjs(sprintData.startDate).add(i, 'day').day()
        if (workingDays.includes(endDate)) {
          sprintDays.push(
            dayjs(sprintData.startDate).add(i, 'day').format(FORMAT_DATE)
          )
        }
      }
      const actualBurnDown: number[] = []
      const extendSprintDays = sprintDays
      if ((dailyStoryPoints || []).length) {
        if (
          dayjs(dailyStoryPoints[dailyStoryPoints.length - 1].date).isAfter(
            dayjs(sprintData.endDate)
          )
        ) {
          extendSprintDays.push(
            dayjs(dailyStoryPoints[dailyStoryPoints.length - 1].date).format(
              FORMAT_DATE
            )
          )
        }
      }

      sprintDays.forEach((day, index) => {
        const dailyStoryPoint = (dailyStoryPoints || []).find(
          (point) =>
            dayjs(point.date).format(FORMAT_DATE).toString() === day.toString()
        )
        if (dailyStoryPoint) {
          actualBurnDown[index] = dailyStoryPoint.storyPoints
        } else {
          actualBurnDown[index] = actualBurnDown[index - 1]
        }
      })
      const idealBurnDown = Array.from(
        { length: sprintDays.length },
        (_, i) => totalStoryPoint - (totalStoryPoint / sprintDays.length) * i
      )
      setDataChart({
        sprintDays: extendSprintDays,
        actualBurnDown: actualBurnDown,
        idealBurnDown: idealBurnDown
      })
    }
  }, [JSON.stringify(sprintData)])

  const dataSet = {
    labels: dataChart.sprintDays,
    datasets: [
      {
        label: 'Actual Story Points Remaining',
        data: dataChart.actualBurnDown,
        fill: false,
        backgroundColor: 'rgba(255, 149, 0, 0.2)',
        borderColor: 'rgba(255, 149, 0, 1 )',
        tension: 0.1
      },
      {
        label: 'Ideal Story Points Remaining',
        data: dataChart.idealBurnDown,
        fill: false,
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        borderColor: 'rgba(0, 122, 255, 1)',
        tension: 0.1
      }
    ]
  }

  const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterDraw: (chart: any) => {
      const ctx = chart.ctx
      const xAxis = chart.scales.x

      // Draw vertical line at x-axis value (assuming it's index-based)
      const xValue = xAxis.getPixelForValue(
        dayjs(sprintData.endDate).toISOString().split('T')[0]
      ) // Change to match your date label
      if (xValue) {
        ctx.save()
        ctx.strokeStyle = 'rgb(255, 99, 132)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(xValue, 0)
        ctx.lineTo(xValue, chart.height - 50)
        ctx.stroke()
        ctx.restore()
        ctx.fillStyle = 'rgb(255, 99, 132)'
        ctx.textAlign = 'center'
        ctx.fillText('Sprint End', xValue, chart.height - 20)
      }
    }
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
        <div className="wrapperHeader--burnDown">
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
              plugins={verticalLinePlugin}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SprintBurnDownReport
