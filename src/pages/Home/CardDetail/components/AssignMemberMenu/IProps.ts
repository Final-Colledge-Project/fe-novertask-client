export interface ITempUser {
  _id: string
  avatar: string
  fullName: string
}

export default interface IProps {
  currentMembers: ITempUser[]
  onChoose: (chosenMemberId: string) => Promise<void> | void
  boardId: string
  onRemove: (memberId: string) => Promise<void> | void
}
