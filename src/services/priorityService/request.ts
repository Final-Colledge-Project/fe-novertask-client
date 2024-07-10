const requests = {
  getAllByBoard: (boardId: string, query: string) =>
    !query.length
      ? `/priorities/board/${boardId}`
      : `/priorities/board/${boardId}?${query}`,
  createPriority: (boardId: string) => `/priorities/board/${boardId}`,
  updatePriority: (priorityId: string, boardId: string) =>
    `/priorities/${priorityId}/board/${boardId}`,
  deletePriority: (priorityId: string, boardId: string) =>
    `/priorities/${priorityId}/board/${boardId}`
}

export default requests
