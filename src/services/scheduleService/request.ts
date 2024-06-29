const requests = {
  getSchedulesByUserId: '/schedules',
  addSchedule: '/schedules',
  updateSchedule: (id: string) => `/schedules/${id}`
}

export default requests
