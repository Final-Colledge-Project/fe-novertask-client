import { IReportType } from '../../helper'
import jsPDF from 'jspdf'
export interface IModalDetailReportProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  reportType: IReportType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportChartPdf = (chartRef: any, fileName: string) => {
  const chart = chartRef.current
  if (chart) {
    const chartImage = chart.toBase64Image()
    const pdf = new jsPDF()
    pdf.addImage(chartImage, 'PNG', 10, 10, 190, 100)
    pdf.save(`${fileName}.pdf`)
  }
}
export interface ITypeExport {
  type: string
  label: string
  exportFunc: () => void
}
