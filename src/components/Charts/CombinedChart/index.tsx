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
import { ICombinedChartProps } from './helper'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CombinedChart = (props: ICombinedChartProps) => {
  const { data, options = {}, chartRef } = props
  return <Chart type="bar" data={data} options={options} ref={chartRef} />
}

export default CombinedChart
