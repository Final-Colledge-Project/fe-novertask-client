const requests = {
  getAllByBoard: (boardId: string) => `/labels/board/${boardId}`,
  createLabel: `/labels`,
  updateLabel: (labelId: string) => `/labels/${labelId}`
}
export default requests
