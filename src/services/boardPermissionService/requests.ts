const requests = {
  createBoardPermission: (id: string) => `/board-permissions/board/${id}`,
  getBoardPermission: (id: string) => `/board-permissions/board/${id}`,
  getBoardPermissionByUserId: (id: string) =>
    `/board-permissions/board/${id}/user`,
  updateBoardPermission: (id: string) => `/board-permissions/${id}`,
  deleteBoardPermission: (id: string, boardId: string) =>
    `/board-permissions/${id}/board/${boardId}`
}
export default requests
