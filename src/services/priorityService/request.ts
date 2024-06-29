const requests = {
  getAllByBoard: (boardId: string, query: string) =>
    !query.length
      ? `/priorities/board/${boardId}`
      : `/priorities/board/${boardId}?${query}`
}

export default requests
