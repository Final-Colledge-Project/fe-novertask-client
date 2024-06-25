const requests = {
  createBoardPermission: (id: string) => `/board-permissions/board/${id}`,
  getBoardPermission: (id: string) => `/board-permissions/board/${id}`,
  getBoardPermissionByUserId: (userId: string) =>
    `/board-permissions/user/${userId}`,
  updateBoardPermission: (id: string) => `/board-permissions/${id}`
}
export default requests
