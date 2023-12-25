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
  updateBoard: (boardId: string) => `/boards/${boardId}`,
  assignAdmin: (boardId: string, memberId: string) =>
    `/boards/grand-ba/${boardId}/members/${memberId}`,
  revokeAdmin: (boardId: string, memberId: string) =>
    `/boards/revoke-ba/${boardId}/members/${memberId}`
}
export default requests
