const requests = {
  verifyGoogleToken: () => `schedule/google/verify-token`,
  loginGoogleCalendar: (id: string) => `/schedule/google/calendar/${id}`,
  getGoogleCalendar: () => `/schedule/google/calendar/events`
}

export default requests
