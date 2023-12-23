const requests = {
  createCard: '/cards',
  updateCard: (id: string) => `/cards/${id}`,
  getCard: (id: string) => `/cards/${id}`,
  getMemberInCard: (id: string) => `/cards/${id}/members`,
  updateCover: (id: string) => `/cards/${id}/upload-cover`,
  assignMember: (cardId: string, memberId: string) =>
    `/cards/${cardId}/assign-member/${memberId}`
}
export default requests
