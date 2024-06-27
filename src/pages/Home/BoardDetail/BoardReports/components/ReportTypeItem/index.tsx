import { Box, Tooltip } from '@mui/material'
import { IReportTypeProps, reportContentStyle, reportTypeStyle } from './helper'
import { useState } from 'react'
import ModalDetailReport from '../ModalDetailReport'

const ReportTypeItem = (props: IReportTypeProps) => {
  const { item } = props
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <Tooltip title={item.description} placement="bottom">
        <Box
          sx={{ ...reportTypeStyle }}
          className="reportTypeItem"
          onClick={() => setOpenModal(true)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              height: '70%'
            }}>
            <img src={item.img} style={{ width: '150px' }} />
          </Box>
          <Box sx={{ ...reportContentStyle }} className="multiple-line">
            <h3 style={{ color: '#363638' }}>{item.name}</h3>

            <p style={{ color: '#AEAEB2' }}>{item.description}</p>
          </Box>
        </Box>
      </Tooltip>
      <ModalDetailReport
        visible={openModal}
        setVisible={setOpenModal}
        reportType={item}
      />
    </div>
  )
}

export default ReportTypeItem
