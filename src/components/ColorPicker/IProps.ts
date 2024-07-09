import { PopperPlacementType } from '@mui/material'

type Placement = PopperPlacementType
export default interface IProps {
  chosenColor: string
  onChange: (color: string) => void
  open?: boolean
  disabled?: boolean
  placement?: Placement
}
