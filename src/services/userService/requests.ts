const requests = {
  sendOTP: `/email-verification`,
  verifyOTP: `/email-verification/verify`,
  signUp: `/users`,
  getCurrentUser: '/auth',
  signOut: '/auth/logout',
  uploadImage: '/users/upload-avatar',
  updateUser: '/users'
}
export default requests
