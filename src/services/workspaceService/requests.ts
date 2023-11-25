const requests = {
  createWS: '/team-workspace',
  getMembers: (id: string) => `/team-workspace/${id}/members`,
  assignAdmin: (id: string) => `/team-workspace/${id}/assign-admin`
}
export default requests
