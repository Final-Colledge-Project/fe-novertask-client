const requests = {
  getAllByBoard: (boardId: string, query: string) =>
    !query.length
      ? `/link-types/board/${boardId}`
      : `/link-types/board/${boardId}?${query}`,
  createIssueLinkType: (boardId: string) => `/link-types/board/${boardId}`,
  updateIssueLinkType: (issueLinkTypeId: string, boardId: string) =>
    `/link-types/${issueLinkTypeId}/board/${boardId}`,
  deleteIssueLinkType: (issueLinkTypeId: string, boardId: string) =>
    `/link-types/${issueLinkTypeId}/board/${boardId}`
}

export default requests
