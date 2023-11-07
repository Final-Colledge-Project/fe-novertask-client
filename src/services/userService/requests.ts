const requests = {
  sendOTP: {
    url: `/email-verification`
  },
  verifyOTP: {
    url: `/email-verification/verify`
  },
  signUp: {
    url: `/users`
  }
}
export default requests
