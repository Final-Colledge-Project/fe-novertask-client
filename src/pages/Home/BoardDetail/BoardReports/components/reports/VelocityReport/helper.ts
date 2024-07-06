import jsPDF from 'jspdf'
import { IReportType } from '../../../helper'

export interface IDataChart {
  sprintName: string[]
  totalStoryPoint: number[]
  completedStoryPoint: number[]
}

export interface IVelocityReportProps {
  boardId: string
  reportType: IReportType
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Velocity Chart'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Sprints'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Story Points'
      },
      beginAtZero: true
    }
  }
}

export const exportChartPdf = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef: any,
  fileName: string,
  reportType: IReportType,
  setIsExport: (isExport: boolean) => void
) => {
  setIsExport(true)
  const pdf = new jsPDF()
  const chart = chartRef.current
  const margin = 10
  let yOffset = margin
  const lineHeight = 8
  if (chart) {
    //Add title
    pdf.setFontSize(14)
    pdf.text(reportType.name, 10, 10)
    yOffset += 10
    //Add description
    pdf.setFontSize(10)
    const descriptionLines = pdf.splitTextToSize(
      reportType.description,
      pdf.internal.pageSize.getWidth() - 20
    )
    descriptionLines.forEach((line: string) => {
      pdf.text(line, 10, yOffset)
      yOffset += lineHeight
    })
    yOffset += 10
    const chartImage = chart.toBase64Image()
    const width = 190
    const height = (chart.height * width) / chart.width
    pdf.addImage(chartImage, 'PNG', 10, yOffset, width, height)
    if (yOffset > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage() // Add new page if content exceeds current page height
      yOffset = margin
    }
    pdf.save(`${fileName}.pdf`)
  }
  setIsExport(false)
}
