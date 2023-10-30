import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { RiLayoutGridFill } from 'react-icons/ri'
import { MdViewList } from 'react-icons/md'
const ToggleViewButton = () => {
  return (
    <div>
      <ToggleButtonGroup
        orientation="horizontal"
        value={'card'}
        exclusive
        // onChange={handleChange}
      >
        <ToggleButton value="card" aria-label="card">
          <RiLayoutGridFill />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list">
          <MdViewList />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default ToggleViewButton
