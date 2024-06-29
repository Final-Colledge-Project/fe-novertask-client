import { ChartData } from 'chart.js'

export interface IBarChartProps {
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>
  options?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef?: any
}
