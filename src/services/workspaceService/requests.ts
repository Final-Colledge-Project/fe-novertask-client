const requests = {
  createWS: '/team-workspace',
  getMembers: (id: string) => `/team-workspace/${id}/members`
}
export default requests
