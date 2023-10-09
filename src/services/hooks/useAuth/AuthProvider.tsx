import { ReactElement } from 'react'
import AuthContext from './AuthContext'
const TOKEN_LOCAL_STORAGE = 'nover-task-token'
const AuthProvider = ({ children }: { children: ReactElement }) => {
  const signIn = (token: string) => {
    console.log(token)
    // Handling sign in
    localStorage.setItem(TOKEN_LOCAL_STORAGE, token)
  }
  const signOut = () => {
    // Handling sign out
    localStorage.removeItem(TOKEN_LOCAL_STORAGE)
  }
  const getToken: () => string | null = () => {
    // Return token
    return localStorage.getItem(TOKEN_LOCAL_STORAGE)
  }
  const isSigning = () => {
    // Check if user is signing in
    return !!localStorage.getItem(TOKEN_LOCAL_STORAGE)
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, getToken, isSigning }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
