import WindowDialog from '~/components/dialog/WIndowDialog'
import { IModalDetailReportProps } from './helper'
import './styles.scss'
import { ReactElement, useState } from 'react'
import { REPORT_TYPE } from '~/utils/constant/common'
import SprintBurnDown from '../reports/SprintBurnDown'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { RiDownloadLine } from 'react-icons/ri'
import VelocityReport from '../reports/VelocityReport'
import SprintReport from '../reports/SprintReport'
import AverageAgeReport from '../reports/AverageAgeReport'
const ModalDetailReport = (props: IModalDetailReportProps) => {
  const { visible, setVisible, reportType } = props
  const { id } = useParams()
  let ReportDetail: ReactElement = <></>
  switch (reportType.type) {
    case REPORT_TYPE.sprintBurnDownReport: {
      ReportDetail = (
        <SprintBurnDown boardId={id || ''} reportType={reportType} />
      )
      break
    }
    case REPORT_TYPE.sprintVelocityReport: {
      ReportDetail = (
        <VelocityReport boardId={id || ''} reportType={reportType} />
      )
      break
    }
    case REPORT_TYPE.sprintReport: {
      ReportDetail = <SprintReport boardId={id || ''} reportType={reportType} />
      break
    }
    case REPORT_TYPE.averageAgeReport: {
      ReportDetail = (
        <AverageAgeReport boardId={id || ''} reportType={reportType} />
      )
      break
    }
  }
  return (
    <WindowDialog
      onClose={() => setVisible(false)}
      open={visible}
      title={
        <div className="title">
          <p>{reportType.name}</p>
        </div>
      }
      isFullScreen={true}>
      <div className="modalWrapper">
        <span className="modelDescription">{reportType.description}</span>
        <div className="modalDetail">{ReportDetail}</div>
      </div>
    </WindowDialog>
  )
}

export default ModalDetailReport
