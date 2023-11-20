export interface IGetDetailBody {
  id: string
}
export interface IRespondInvitationBody {
  wsID: string
  isAccepted: boolean
  email: string
}

export interface ISendInvitationBody {
  email: string
  wsID: string
}
