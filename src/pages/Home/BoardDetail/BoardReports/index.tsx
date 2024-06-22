import { Box, Tab, Tabs } from '@mui/material'
import './styles.scss'
import { useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function BoardOverview() {
  const [value, setValue] = useState(0)
  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    console.log("🚀 ~ onChangeTab ~ newValue:", newValue)
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
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
    </div>
  )
}
