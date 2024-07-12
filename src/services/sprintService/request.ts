const requests = {
  getAllByBoard: (boardId: string) => `/sprints/board/${boardId}`,
  createSprint: (boardId: string) => `/sprints/board/${boardId}`,
  getAllSprintDetail: (boardId: string) =>
    `/sprints/board/${boardId}/backlog-detail`
}
export default requests
