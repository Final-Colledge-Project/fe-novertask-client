const requests = {
  createCard: (boardId: string) => `/cards/board/${boardId}`,
  updateCard: (id: string, boardId: string) => `/cards/${id}/board/${boardId}`,
  getCard: (id: string) => `/cards/${id}`,
  getMemberInCard: (id: string) => `/cards/${id}/members`,
  updateCover: (id: string, boardId: string) =>
    `/cards/${id}/upload-cover/board/${boardId}`,
  assignMember: (cardId: string, boardId: string) =>
    `/cards/${cardId}/assign-member/board/${boardId}`,
  assignedToMe: '/cards/assigned-me',
  unAssignMember: (cardId: string, boardId: string) =>
    `/cards/${cardId}/unassign-member/board/${boardId}`,
  deleteCard: (id: string, boardId: string) => `/cards/${id}/board/${boardId}`,
  uploadAttachment: (cardId: string, boardId: string) =>
    `/cards/${cardId}/attachments/board/${boardId}`,
  deleteAttachment: (cardId: string, boardId: string) =>
    `/cards/${cardId}/attachments/board/${boardId}`,
  downloadAttachment: (cardId: string, boardId: string) =>
    `/cards/${cardId}/attachments/board/${boardId}/download`,
  getAllByUserId: (userId: string, boardId: string) => `/cards/user/${userId}/board/${boardId}`
}
export default requests
