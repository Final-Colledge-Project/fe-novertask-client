import { SpeedDial, SpeedDialAction } from '@mui/material'
import { RiAddLine, RiTaskLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { StoreDispatchType } from '~/redux'
import { showAddCardDialog } from '~/redux/cardSlice'

const ActionMenu = () => {
  const dispatch = useDispatch<StoreDispatchType>()

  const openAddCardDialog = () => {
    dispatch(showAddCardDialog())
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<RiAddLine />}>
      <SpeedDialAction
        onClick={openAddCardDialog}
        icon={<RiTaskLine />}
        tooltipTitle={'Create new issue'}
      />
    </SpeedDial>
  )
}
export default ActionMenu
