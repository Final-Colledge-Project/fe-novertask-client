/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf'
import { IReportType } from '../../../helper'

export interface ISprintBurnDownProps {
  boardId: string
  reportType: IReportType
}

export interface IDataChart {
  sprintDays: string[]
  actualBurnDown: number[]
  idealBurnDown: number[]
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow the chart to be resized
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Story Points'
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Sprint Burn Down Chart'
    }
  }
}

export const exportChartPdf = (
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
