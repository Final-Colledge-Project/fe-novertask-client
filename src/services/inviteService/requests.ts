const requests = {
  getDetail: `/invitations`,
  respondInvitation: (wsID: string, status: 'accepted' | 'rejected') =>
    `/invitations/workspace/${wsID}?status=${status}`,
  sendInvitation: (wsID: string) => `/invitations/workspace/${wsID}`
}
export default requests
