import { useQuery } from '@tanstack/react-query'
import { getVelocityReport } from '~/services/reportService'
import { QUERY_KEY } from '~/utils/constant'
import { IDataChart, IVelocityReportProps, chartOptions } from './helper'
import Loading from '~/components/Loading'
import { useEffect, useState } from 'react'
import './styles.scss'
import BarChart from '~/components/Charts/BarChart'
const SprintBurnDownReport = (props: IVelocityReportProps) => {
  const { boardId, chartRef } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        backgroundColor: '#FF9500'
      },
      {
        label: 'Commitment Story Point',
        data: dataChart.completedStoryPoint,
        backgroundColor: '#007AFF'
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

export default SprintBurnDownReport
