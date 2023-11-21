const requests = {
  getAllByUserId: `/boards`,
  getAllByWSId: (
    wsID: string,
    option: string | undefined = '?sort=-createdAt'
  ) => `/boards/workspace/${wsID}${option}`
}
export default requests
