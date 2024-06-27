const requests = {
  getBurnDownReport: (boardId: string, stringId: string) =>
    `/statistics/burn-down/board/${boardId}?sprint=${stringId}`,
  getVelocityReport: (boardId: string) =>
    `/statistics/velocity/board/${boardId}`
}

export default requests
