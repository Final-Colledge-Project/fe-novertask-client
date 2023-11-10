import axios, { AxiosError, AxiosResponse } from 'axios'
import guestRequest from './guestRequest'
import store from '~/redux'
import { authService } from '.'
import { setReSign, setToken } from '~/redux/authSlice'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // timeout in 3s
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (req) => {
    // request to url requiring auth
    if (
      !guestRequest.includes(req.url as string) ||
      (req.url === '/auth' && req.method === 'GET')
    ) {
      // get token from local storage
      const accessToken = localStorage.getItem(
        import.meta.env.VITE_USER_TOKEN_KEY
      )

      if (accessToken) {
        req.headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    // if (req.url === '/auth/refresh-token' && req.method === 'GET') {
    // }

    return req
  },
  (error) => {
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err: AxiosError) => {
    interface IErrorResponse {
      message: string
    }
    const baseConfig = err.config
    const { dispatch } = store

    console.log('✨ ~ file: axiosInstance.ts:53 ~ err:', err)

    const errorMessage = (err.response as AxiosResponse<IErrorResponse>).data
      .message

    // unauthorized -> token is expired -> need refresh token
    if (
      errorMessage === 'Token is expired' ||
      errorMessage === 'Token is not valid'
    ) {
      // dispatch refreshToken action
      try {
        const res = await authService.refreshToken()

        // refresh token successfully -> resend request with new token
        if (res && res.data) {
          baseConfig!.headers['Authorization'] = `Bearer ${res.data}`

          // set new token to local storage
          dispatch(setToken(res.data))
          // refresh token successfully -> do not need to resign
          dispatch(setReSign(false))
        }
      } catch (err) {
        dispatch(setToken(undefined))
        return Promise.reject(err)
      }

      return await axiosInstance(baseConfig!)
    }

    // unauthorized -> token is expired -> refresh token failed -> sign in again
    if (
      errorMessage === 'Invalid refresh token' ||
      errorMessage === 'Unauthorized'
    ) {
      // refresh token failed -> sign in again
      dispatch(setReSign(true))
    }

    // other errors
    return Promise.reject(err)
  }
)

export default axiosInstance
