const requests = {
  createWS: '/team-workspace',
  getMembers: (id: string) => `/team-workspace/${id}/members`,
  assignAdmin: (id: string) => `/team-workspace/${id}/assign-admin`,
  deleteWorkspace: (id: string) => `/team-workspace/${id}`,
  getPermissionCanCreateBoard: () => `/team-workspace/user?createBoard=true`
}
export default requests
