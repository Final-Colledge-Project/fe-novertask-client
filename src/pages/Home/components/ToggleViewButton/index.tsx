import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import { RiLayoutGridFill } from 'react-icons/ri'
import { MdViewList } from 'react-icons/md'
import { useState } from 'react'
const ToggleViewButton = ({
  onChange
}: {
  onChange: (viewType: 'list' | 'block') => void
}) => {
  const [current, setCurrent] = useState<'list' | 'block'>('block')

  return (
    <div>
      <ToggleButtonGroup
        orientation="horizontal"
        value={current}
        exclusive
        sx={{
          '& .MuiToggleButton-root': {
            border: '1px solid var(--mui-palette-divider)',
            '&:hover': {
              border: '1px solid var(--mui-palette-divider)',
              bgcolor:
                'rgba(var(--mui-palette-text-primaryChannel) / var(--mui-palette-action-selectedOpacity))'
            }
          }
        }}
      >
        <ToggleButton
          value="block"
          aria-label="block"
          onClick={() => {
            setCurrent('block')
            onChange('block')
          }}
        >
          <RiLayoutGridFill />
        </ToggleButton>
        <ToggleButton
          value="list"
          aria-label="list"
          onClick={() => {
            setCurrent('list')
            onChange('list')
          }}
        >
          <MdViewList />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default ToggleViewButton
