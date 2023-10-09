const authApi = (BASEURL: string) => {
  return {
    // signIn: () => `${BASEURL}/login`,
    signIn: {
      url: `${BASEURL}/login`,
      body: (email: string, password: string) => {
        return {
          email,
          password
        }
      }
    }
  }
}
export default authApi
