import WindowDialog from '~/components/dialog/WIndowDialog'
import { IModalDetailReportProps, ITypeExport, exportChartPdf } from './helper'
import './styles.scss'
import { ReactElement, useRef, useState } from 'react'
import { REPORT_TYPE } from '~/utils/constant/common'
import SprintBurnDown from '../reports/SprintBurnDown'
import { useParams } from 'react-router-dom'
import { Button, MenuItem, Popover } from '@mui/material'
import { RiDownloadLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import { EXPORT_TYPE } from '~/utils/constant'
import VelocityReport from '../reports/VelocityReport'
const ModalDetailReport = (props: IModalDetailReportProps) => {
  const { visible, setVisible, reportType } = props
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const openPop = Boolean(anchorEl)
  let itemExport: ITypeExport[] = []
  const idPop = openPop ? 'export-popover' : undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null)
  const { id } = useParams()
  let ReportDetail: ReactElement = <></>
  switch (reportType.type) {
    case REPORT_TYPE.sprintBurnDownReport: {
      const fileName = `sprint-burn-down-${dayjs().unix()}`
      itemExport = [
        {
          type: EXPORT_TYPE.pdf,
          label: 'Export PDF',
          exportFunc: () => exportChartPdf(chartRef, fileName)
        }
      ]
      ReportDetail = <SprintBurnDown boardId={id || ''} chartRef={chartRef} />
      break
    }
    case REPORT_TYPE.sprintVelocityReport: {
      const fileName = `velocity-report-${dayjs().unix()}`
      itemExport = [
        {
          type: EXPORT_TYPE.pdf,
          label: 'Export PDF',
          exportFunc: () => exportChartPdf(chartRef, fileName)
        }
      ]
      ReportDetail = <VelocityReport boardId={id || ''} chartRef={chartRef} />
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
        <div className="modalFooter">
          <Button
            aria-describedby={idPop}
            variant="contained"
            startIcon={<RiDownloadLine />}
            onClick={(event) => setAnchorEl(event.currentTarget)}>
            Export
          </Button>
          <Popover
            id={idPop}
            open={openPop}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}>
            {itemExport.map((item, index) => (
              <MenuItem key={index} onClick={item.exportFunc}>
                {item.label}
              </MenuItem>
            ))}
          </Popover>
        </div>
      </div>
    </WindowDialog>
  )
}

export default ModalDetailReport
