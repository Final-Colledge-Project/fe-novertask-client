import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import { IBarChartProps } from './helper'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = (props: IBarChartProps) => {
  const { data, options = {}, chartRef } = props
  return <Bar data={data} options={options} ref={chartRef} />
}

export default BarChart
