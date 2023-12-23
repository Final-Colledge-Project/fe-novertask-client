export interface ITempUser {
  _id: string
  avatar: string
  fullName: string
}

export default interface IProps {
  currentMembers: ITempUser[]
  onChoose: (chosenMemberId: string) => void
  boardId: string
}
