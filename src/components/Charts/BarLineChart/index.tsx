import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { IBarLineChartProps } from './helper'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const BarLineChart = (props: IBarLineChartProps) => {
  const { data, options = {}, chartRef } = props
  return <Chart type="bar" data={data} options={options} ref={chartRef} />
}

export default BarLineChart
