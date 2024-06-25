const requests = {
  getColumnInBoard: (id: string) => `/columns/board/${id}`,
  createColumn: (boardId: string) => `/columns/board/${boardId}`,
  updateColumn: (id: string, boardId: string) =>
    `/columns/${id}/board/${boardId}`,
  deleteColumn: (id: string, boardId: string) =>
    `/columns/${id}/board/${boardId}`
}
export default requests
