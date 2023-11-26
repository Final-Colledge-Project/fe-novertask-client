import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
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
