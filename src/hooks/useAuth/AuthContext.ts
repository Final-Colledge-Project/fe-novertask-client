import { createContext } from 'react'
import IAuthContextType from './IAuthContextType'

const AuthContext = createContext<IAuthContextType | null>(null)
export default AuthContext
