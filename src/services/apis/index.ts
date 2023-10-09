import user from './user'
import auth from './auth'
const BASEURL = 'http://192.168.1.2:5000/api/v1'

export const authApi = auth(BASEURL)
export const userApi = user(BASEURL)
