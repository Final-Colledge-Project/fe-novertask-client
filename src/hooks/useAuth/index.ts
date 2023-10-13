import { useContext } from 'react'
import AuthContext from './AuthContext'
import AuthProvider from './AuthProvider'

export { AuthProvider }

export const useAuth = () => {
  return useContext(AuthContext)
}
