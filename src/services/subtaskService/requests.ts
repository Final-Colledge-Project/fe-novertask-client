const requests = {
  getAllSubtask: (cardId: string) => `/subcards/card/${cardId}`,
  updateSubtask: (subtaskId: string) => `/subcards/${subtaskId}`,
  createSubtask: `/subcards`
}
export default requests
