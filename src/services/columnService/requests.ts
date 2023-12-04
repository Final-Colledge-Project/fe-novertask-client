const requests = {
  getColumnInBoard: (id: string) => `/columns/board/${id}`,
  createColumn: `/columns/`,
  updateColumn: (id: string) => `/columns/${id}`
}
export default requests
