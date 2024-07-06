import { ChartData, Point } from 'chart.js'

export interface ILineChartProps {
  data: ChartData<'line', (number | Point | null)[], string>
  options?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: any
}
