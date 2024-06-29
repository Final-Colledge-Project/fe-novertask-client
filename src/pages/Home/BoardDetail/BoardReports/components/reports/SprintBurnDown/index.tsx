import { useQuery } from '@tanstack/react-query'
import { getBurnDownReport } from '~/services/reportService'
import { FORMAT_DATE, QUERY_KEY } from '~/utils/constant'
import { IDataChart, ISprintBurnDownProps, chartOptions } from './helper'
import Loading from '~/components/Loading'
import { MenuItem, Select } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import './styles.scss'
import LineChart from '~/components/Charts/LineChart'
import dayjs from 'dayjs'
import { exportChartPdf } from '../../ModalDetailReport/helper'
const SprintBurnDownReport = (props: ISprintBurnDownProps) => {
  const { boardId, setExportFn } = props
  const sprintId = '6676e0392f533b91b738031d'
  const chartRef = useRef<unknown>(null)
  const [selectedSprint, setSelectedSprint] = useState<string>('Sprint 1')
  const [estimationField, setEstimationField] = useState<string>('Story Points')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataChart, setDataChart] = useState<IDataChart>({
    sprintDays: [],
    actualBurnDown: [],
    idealBurnDown: []
  })
  const { data: sprintData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.burndown_report, sprintId],
    queryFn: () => {
      return getBurnDownReport(boardId, sprintId)
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setExportFn(() => () => {
      const fileName = `sprint-burn-down-${dayjs().unix()}`
      exportChartPdf(chartRef, fileName)
    })
  }, [])

  useEffect(() => {
    if (sprintData) {
      const { dailyStoryPoints, totalStoryPoint } = sprintData
      const sprintDays = dailyStoryPoints.map((point) =>
        dayjs(point.date).format(FORMAT_DATE)
      )
      const actualBurnDown = dailyStoryPoints.map((point) => point.storyPoints)
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

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
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
                <MenuItem value={'Sprint 1'}>Sprint 1</MenuItem>
                <MenuItem value={'Sprint 2'}>Sprint 2</MenuItem>
                <MenuItem value={'Sprint 3'}>Sprint 3</MenuItem>
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
          </div>
          <div className="sprintChart">
            <LineChart
              options={chartOptions}
              data={dataSet}
              chartRef={chartRef}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SprintBurnDownReport
