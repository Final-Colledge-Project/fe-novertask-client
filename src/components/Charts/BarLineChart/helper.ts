import { ChartData } from 'chart.js'

export interface IBarLineChartProps {
  data: ChartData<'bar' | 'line', number[], string>
  options?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef?: any
}
