/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf'
import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { IAverageTaskAge } from '~/services/reportService/resTypes'
import html2canvas from 'html2canvas'
import { IReportType } from '../../../helper'
export interface IAverageAgeReportProps {
  boardId: string
  reportType: IReportType
}

export interface IFormFields extends FieldValues {
  period: string
  previousDays: number
}

export const schema = yup.object().shape({
  period: yup.string().required('Period is required'),
  previousDays: yup.number().required('Previous days is required').min(1)
})

export interface IAverageAgeReport {
  averageAge: number
  averageEachTask: IAverageTaskAge[]
}

export interface IAverageData {
  dates: string[]
  totalAges: number[]
  averageAges: number[]
}

export const preProcessData = (averageTask: IAverageTaskAge[]) => {
  const groupedData = (averageTask || []).reduce(
    (acc: { [key: string]: { totalAge: number; count: number } }, task) => {
      const date = task.createDate.toString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { totalAge: 0, count: 0 }
      }
      acc[date].totalAge += task.age
      acc[date].count += 1
      return acc
    },
    {}
  )
  const dates = Object.keys(groupedData)
  const totalAges = dates.map((date) => groupedData[date].totalAge)
  const averageAges = dates.map(
    (date) => groupedData[date].totalAge / groupedData[date].count
  )
  return { dates, totalAges, averageAges }
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Task Age and Average Age'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

export const exportChartPdf = async (
  chartRef: any,
  fileName: string,
  table: HTMLElement,
  reportType: IReportType,
  setIsExport: (isExport: boolean) => void
) => {
  setIsExport(true)
  const pdf = new jsPDF()
  const chart = chartRef.current
  const margin = 10
  let yOffset = margin

  if (chart || table) {
    //Add title
    pdf.setFontSize(14)
    pdf.text(reportType.name, 10, 10)
    yOffset += 10
    //Add description
    pdf.setFontSize(10)
    pdf.text(reportType.description, 10, 20)
    yOffset += 10
  }

  if (chart) {
    const chartImage = chart.toBase64Image()
    const width = 190
    const height = (chart.height * width) / chart.width
    pdf.addImage(chartImage, 'PNG', 10, yOffset, width, height)
    yOffset = height + 50
  }

  if (table) {
    const tblCanvas = await html2canvas(table, { scale: 2 })
    const width = 190
    const height = (tblCanvas.height * width) / tblCanvas.width
    //Add table
    const imgTable = tblCanvas.toDataURL('image/png')
    pdf.addImage(imgTable, 'PNG', 10, yOffset, width, height)
    yOffset = height + 30
  }
  if (yOffset > pdf.internal.pageSize.getHeight() - margin) {
    pdf.addPage() // Add new page if content exceeds current page height
    yOffset = margin
  }
  if (table || chart) {
    pdf.save(`${fileName}.pdf`)
  }
  setIsExport(false)
}
