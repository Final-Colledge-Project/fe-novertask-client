const requests = {
  getAllByUserId: `/boards`,
  getAllByWSId: (
    wsID: string,
    option: string | undefined = '?sort=-createdAt'
  ) => `/boards/workspace/${wsID}${option}`,
  createBoard: `/boards`,
  getBoardDetail: (id: string) => `/boards/${id}`,
  getMemberInBoard: (id: string) => `/boards/${id}/members`,
  addMemberToBoard: (boardId: string) => `/boards/${boardId}/members`,
  updateBoard: (boardId: string) => `/boards/${boardId}`
}
export default requests
