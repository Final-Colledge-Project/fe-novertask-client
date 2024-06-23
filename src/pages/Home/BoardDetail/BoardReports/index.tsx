import { Box, Tab, Tabs, Tooltip, tooltipClasses } from '@mui/material'
import './styles.scss'
import { useState } from 'react'
import { a11yProps, getReportTypesByTab } from './helper'
import ReportTypeItem from './components/ReportTypeItem'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ padding: '10px' }}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

export default function BoardOverview() {
  const [value, setValue] = useState(0)
  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className="sectionWrapper">
      <div className="sectionHeader">
        <Tabs
          value={value}
          onChange={onChangeTab}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#000',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#000',
              height: '3px'
            }
          }}>
          <Tab label="Task Analysis Reports" {...a11yProps(0)} />
          <Tab label="Agile Scrum Reports" {...a11yProps(1)} />
          <Tab label="Others" {...a11yProps(2)} />
        </Tabs>
      </div>

      <div className="sectionBody">
        <CustomTabPanel value={value} index={0}>
          {getReportTypesByTab(0).map((item, index) => {
            return <ReportTypeItem key={index} item={item} />
          })}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '30px'
            }}>
            {getReportTypesByTab(1).map((item, index) => {
              return <ReportTypeItem key={index} item={item} />
            })}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
    </div>
  )
}
