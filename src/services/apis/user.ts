const userApi = (BASEURL: string) => {
  return {
    signUp: {
      url: `${BASEURL}/users`,
      body: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        birthDate: string,
        address: string
      ) => ({ firstName, lastName, email, password, phone, birthDate, address })
    },
    sendOTP: {
      url: `${BASEURL}/authentication/otp`,
      body: (
        email: string,
        subject: string,
        message: string,
        duration: number = 1
      ) => ({ email, subject, message, duration })
    },
    verifyOTP: {
      url: `${BASEURL}/authentication/verify-otp`,
      body: (email: string, otp: string) => ({ email, otp })
    }
  }
}
export default userApi
