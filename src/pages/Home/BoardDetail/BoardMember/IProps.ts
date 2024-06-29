import { IAllMemberInBoard, IBoard } from '~/services/types'

export interface IHeaderProps {
  onRoleChange: (newRole: number) => void
  count: number
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  onStartSearch: (startSearch: boolean) => void
  onOpenAddMemberPopup: () => void
  shouldShowAddMemberButton: boolean
  onModeChange: (newMode: number) => void
}

export interface IMainProps {
  members: IAllMemberInBoard | undefined
  leaderId: string | undefined
  board: IBoard | undefined
}
