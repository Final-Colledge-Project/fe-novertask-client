import { Box, Menu, MenuItem, Tab, Tabs } from '@mui/material'
import './styles.scss'
import { useState } from 'react'
import { DATA_SETTING_ITEMS, a11yProps } from './helper'
import { DATA_SETTING } from '~/utils/constant/common'
import DataSettings from './DataSettings'
import usePermission from '~/hooks/usePermission'

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
      sx={{
        height: 'fit-content',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'scroll'
      }}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

export default function BoardSettings() {
  const userPerm = usePermission()
  const isAdmin = userPerm ? userPerm.isAdmin : false
  const [value, setValue] = useState(isAdmin ? 0 : 1)
  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [selectedDataSetting, setSelectedDataSetting] = useState(
    DATA_SETTING.issueType
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openDataMenu = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTabMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleTabMouseLeave = () => {
    setAnchorEl(null)
  }

  return (
    <div className="sectionWrapper">
      <div className="sectionHeader">
        <Tabs
          value={value}
          onChange={onChangeTab}
          sx={{
            fontSize: '14px',
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
            },
            padding: '0 10px'
          }}>
          {/* {isAdmin && <Tab label="General Setting" {...a11yProps(0)} />} */}
          <Tab
            label="Data Setting"
            {...a11yProps(1)}
            id="tab-data"
            onMouseEnter={handleTabMouseEnter}
            // onMouseLeave={handleTabMouseLeave}
            aria-owns={anchorEl ? 'data-menu' : undefined}
          />
        </Tabs>
      </div>

      <div className="sectionBody">
        {/* {isAdmin && (
          <CustomTabPanel value={value} index={0}>
            <div>General Setting</div>
          </CustomTabPanel>
        )} */}
        <CustomTabPanel value={value} index={1}>
          <DataSettings settingItem={selectedDataSetting} />
        </CustomTabPanel>
        <Menu
          id="data-menu"
          anchorEl={anchorEl}
          open={openDataMenu}
          onClose={handleTabMouseLeave}
          MenuListProps={{
            'aria-labelledby': 'tab-data',
            onMouseLeave: handleTabMouseLeave
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          {DATA_SETTING_ITEMS.map((item) => (
            <MenuItem
              key={item.value}
              selected={item.value === selectedDataSetting}
              onClick={() => {
                setSelectedDataSetting(item.value)
                handleClose()
                setValue(1)
              }}
              sx={{
                '&.Mui-selected': {
                  color: '#000',
                  fontWeight: 600
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                },
                fontSize: '14px'
              }}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}
