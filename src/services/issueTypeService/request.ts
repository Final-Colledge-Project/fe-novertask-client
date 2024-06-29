const requests = {
  getAllByBoard: (boardId: string, query: string) =>
    !query.length
      ? `/issue-types/board/${boardId}`
      : `/issue-types/board/${boardId}?${query}`
}

export default requests
