export default interface IAuthContextType {
  signIn: (token: string) => void
  signOut: () => void
  isSigning: () => boolean
  getToken: () => string | null
}
