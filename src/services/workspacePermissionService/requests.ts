const requests = {
  createWSPermission: (id: string) => `/ws-permissions/workspace/${id}`,
  getWSPermission: (id: string) => `/ws-permissions/workspace/${id}`,
  getWSPermissionByUserId: (id: string) =>
    `/ws-permissions/workspace/${id}/user`,
  updateWSPermission: (id: string) => `/ws-permissions/${id}`,
  deleteWSPermission: (permissionId: string, wsId: string) =>
    `/ws-permissions/${permissionId}/workspace/${wsId}`
}
export default requests
