import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { ILineChartProps } from './helper'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = (props: ILineChartProps) => {
  const { data, options = {}, chartRef } = props
  return <Line options={options} data={data} ref={chartRef} />
}

export default LineChart
