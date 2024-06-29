const requests = {
  getBurnDownReport: (boardId: string, sprintId: string) =>
    `/statistics/burn-down/board/${boardId}?sprint=${sprintId}`,
  getVelocityReport: (boardId: string) =>
    `/statistics/velocity/board/${boardId}`,
  getSprintReport: (boardId: string, sprintId: string) =>
    `/statistics/sprint-report/board/${boardId}?sprint=${sprintId}`,
  getAverageAgeReport: (boardId: string, queryString: string) =>
    `/statistics/average-age/board/${boardId}?${queryString}`
}

export default requests
