const requests = {
  getAllByBoard: (boardId: string) => `/labels/board/${boardId}`,
  createLabel: (boardId: string) => `/labels/board/${boardId}`,
  updateLabel: (labelId: string, boardId: string) =>
    `/labels/${labelId}/board/${boardId}`,
  getLabel: (labelId: string, boardId: string) =>
    `/labels/${labelId}/board/${boardId}`,
  deleteLabel: (labelId: string, boardId: string) =>
    `/labels/${labelId}/board/${boardId}`
}
export default requests
