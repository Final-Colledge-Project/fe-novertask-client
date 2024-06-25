import { IAllMemberInBoard, IBoard } from '~/services/types'

export interface IHeaderProps {
  onRoleChange: (newRole: string) => void
  count: number
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  onStartSearch: (startSearch: boolean) => void
  onOpenAddMemberPopup: () => void
  onModeChange: (newMode: number) => void
  mode: number
}

export interface IMainProps {
  members: IAllMemberInBoard | undefined
  leaderId: string | undefined
  board: IBoard | undefined
}
