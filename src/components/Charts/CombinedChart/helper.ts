import { ChartData } from 'chart.js'

export interface ICombinedChartProps {
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>
  options?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef?: any
}
