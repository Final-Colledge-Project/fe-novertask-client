/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReportType } from '../../helper'
export interface IModalDetailReportProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  reportType: IReportType
}

export interface ITypeExport {
  type: string
  label: string
  exportFunc: () => void
}
