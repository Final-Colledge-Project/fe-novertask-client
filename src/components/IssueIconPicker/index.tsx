import { useState } from 'react'
import { IIconPickerProps } from './helper'
import { Button, Grid, IconButton, Popover, Tooltip } from '@mui/material'
import { defaultIssueTypeIcon, getDefaultIssueIcon } from '~/utils/defaultIcon'
export default function IssueIconPicker(props: IIconPickerProps) {
  const { selectedIcon, setSelectedIcon } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className="pickerWrapper">
      <Button
        aria-describedby="icon-picker"
        variant="outlined"
        onClick={handleClick}
        startIcon={
          selectedIcon ? (
            <img width={20} height={20} src={selectedIcon} alt="icon" />
          ) : null
        }
        // endIcon={<RiArrowDownSLine />}
      >
        {selectedIcon
          ? getDefaultIssueIcon(selectedIcon, defaultIssueTypeIcon)?.name
          : 'Select Issue Type Icon'}
      </Button>
      <Popover
        id="icon-picker"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        sx={{
          marginLeft: '10px',
          marginTop: '100px'
        }}>
        <Grid container spacing={2} sx={{ width: '300px', height: '300px' }}>
          {Object.values(defaultIssueTypeIcon).map((icon, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title={icon.name}>
                <IconButton size="small">
                  <img
                    width={30}
                    height={30}
                    src={icon.icon}
                    alt={icon.name}
                    onClick={() => {
                      setSelectedIcon(icon.icon)
                      handleClose()
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </div>
  )
}
