import { useQuery } from '@tanstack/react-query'
import { getVelocityReport } from '~/services/reportService'
import { QUERY_KEY } from '~/utils/constant'
import { IDataChart, IVelocityReportProps, chartOptions } from './helper'
import Loading from '~/components/Loading'
import { useEffect, useRef, useState } from 'react'
import './styles.scss'
import BarChart from '~/components/Charts/BarChart'
import { exportChartPdf } from '../../ModalDetailReport/helper'
import dayjs from 'dayjs'
const VelocityReport = (props: IVelocityReportProps) => {
  const { boardId, setExportFn } = props
  const chartRef = useRef<unknown>(null)
  const [dataChart, setDataChart] = useState<IDataChart>({
    sprintName: [],
    totalStoryPoint: [],
    completedStoryPoint: []
  })
  const { data: sprintData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.velocity_report, boardId],
    queryFn: () => {
      return getVelocityReport(boardId)
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setExportFn(() => () => {
      const fileName = `velocity-report-${dayjs().unix()}`
      exportChartPdf(chartRef, fileName)
    })
  }, [])

  useEffect(() => {
    if (sprintData) {
      const sprintName = sprintData.map((sprint) => sprint.name)
      const totalStoryPoint = sprintData.map((sprint) => sprint.totalStoryPoint)
      const completedStoryPoint = sprintData.map(
        (sprint) => sprint.completedStoryPoint
      )
      setDataChart({
        sprintName,
        totalStoryPoint,
        completedStoryPoint
      })
    }
  }, [JSON.stringify(sprintData)])

  const dataSet = {
    labels: dataChart.sprintName,
    datasets: [
      {
        label: 'Total Story Point',
        data: dataChart.totalStoryPoint,
        backgroundColor: 'rgba(255, 149, 0, 0.4)',
        borderColor: 'rgba(255, 149, 0, 1 )',
        borderWidth: 2
      },
      {
        label: 'Commitment Story Point',
        data: dataChart.completedStoryPoint,
        backgroundColor: 'rgba(0, 122, 255, 0.4)',
        borderColor: 'rgba(0, 122, 255, 1)',
        borderWidth: 2
      }
    ]
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="sprintChart">
            <BarChart
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

export default VelocityReport
