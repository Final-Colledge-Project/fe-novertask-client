const requests = {
  getAllByBoard: (boardId: string, query: string) =>
    !query.length
      ? `/issue-types/board/${boardId}`
      : `/issue-types/board/${boardId}?${query}`,
  createIssueType: (boardId: string) => `/issue-types/board/${boardId}`,
  updateIssueType: (issueTypeId: string, boardId: string) =>
    `/issue-types/${issueTypeId}/board/${boardId}`,
  deleteIssueType: (issueTypeId: string, boardId: string) =>
    `/issue-types/${issueTypeId}/board/${boardId}`
}

export default requests
