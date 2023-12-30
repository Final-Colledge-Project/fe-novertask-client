import { IAssignedCard } from '~/services/types'

export interface ITaskPopoverProps {
  task: IAssignedCard
  controlHide: () => void
}
