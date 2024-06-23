import { Box, Tooltip } from '@mui/material'
import { IReportTypeProps, reportContentStyle, reportTypeStyle } from './helper'

const ReportTypeItem = (props: IReportTypeProps) => {
  const { item } = props
  
  return (
    <Tooltip title={item.description} placement="bottom">
      <Box sx={{ ...reportTypeStyle }} className="reportTypeItem">
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
  )
}

export default ReportTypeItem
