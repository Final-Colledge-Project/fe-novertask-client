const requests = {
  getAllSubtask: (cardId: string) => `/subcards/card/${cardId}`,
  updateSubtask: (subtaskId: string, boardId: string) =>
    `/subcards/${subtaskId}/board/${boardId}`,
  createSubtask: (boardId: string) => `/subcards/board/${boardId}`,
  assignMember: (subtaskId: string, boardId: string) =>
    `/subcards/${subtaskId}/assign-member/board/${boardId}`,
  unassignMember: (subtaskId: string, boardId: string) =>
    `/subcards/${subtaskId}/unassign-member/board/${boardId}`
}
export default requests
