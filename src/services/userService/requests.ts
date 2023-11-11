const requests = {
  sendOTP: `/email-verification`,
  verifyOTP: `/email-verification/verify`,
  signUp: `/users`,
  getCurrentUser: '/auth',
  signOut: '/auth/logout'
}
export default requests
