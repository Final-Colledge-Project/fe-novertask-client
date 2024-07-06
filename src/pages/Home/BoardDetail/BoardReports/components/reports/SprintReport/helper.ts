import jsPDF from 'jspdf'
import { IReportType } from '../../../helper'
import html2canvas from 'html2canvas'

export interface ISprintReportProps {
  boardId: string
  reportType: IReportType
}

export const exportChartPdf = async (
  fileName: string,
  table: HTMLElement,
  reportType: IReportType,
  setIsExport: (isExport: boolean) => void
) => {
  setIsExport(true)
  const pdf = new jsPDF()
  const margin = 10
  let yOffset = margin
  const lineHeight = 8
  if (table) {
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
    const tblCanvas = await html2canvas(table, { scale: 2 })
    const width = 190
    const height = (tblCanvas.height * width) / tblCanvas.width
    //Add table
    const imgTable = tblCanvas.toDataURL('image/png')
    pdf.addImage(imgTable, 'PNG', 10, yOffset, width, height)
    yOffset = height + 30
    if (yOffset > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage() // Add new page if content exceeds current page height
      yOffset = margin
    }
    pdf.save(`${fileName}.pdf`)
  }
  setIsExport(false)
}
