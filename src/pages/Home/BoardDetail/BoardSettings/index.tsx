import { Box, Tab, Tabs } from '@mui/material'
import './styles.scss'
import { useState } from 'react'
import { a11yProps } from './helper'

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
export default function BoardSettings() {
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
          <Tab label="General Setting" {...a11yProps(0)} />
          <Tab label="Data Setting" {...a11yProps(1)} />
        </Tabs>
      </div>

      <div className="sectionBody">
        <CustomTabPanel value={value} index={0}>
          <div>General Setting</div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div>Data Setting</div>
        </CustomTabPanel>
      </div>
    </div>
  )
}
