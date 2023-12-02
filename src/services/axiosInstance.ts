import axios, { AxiosError, AxiosResponse } from 'axios'
import guestRequest from './guestRequest'
import store from '~/redux'
import { authService } from '.'
import { setIsRefreshingToken, setReSign, setToken } from '~/redux/authSlice'
import { IErrorResponse } from './types'

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
    console.log('✨ ~ file: axiosInstance.ts:46 ~ err:', err)
    const baseConfig = err.config
    const { dispatch } = store

    const errorMessage = (err.response as AxiosResponse<IErrorResponse>).data
      .message

    // unauthorized -> token is expired -> need refresh token
    if (
      (errorMessage === 'Token is expired' ||
        errorMessage === 'Token is not valid') &&
      err.response?.status === 401
    ) {
      /**
       * If there are many requests with 401 status code
       * Just 1st request have to refresh the token
       * Others have to wait until it is resolved
       */
      if (!store.getState().auth.isRefreshingToken) {
        dispatch(setIsRefreshingToken(true))
        try {
          // dispatch refreshToken action
          const res = await authService.refreshToken()

          // refresh token successfully -> resend request with new token
          if (res && res.data) {
            baseConfig!.headers['Authorization'] = `Bearer ${res.data}`

            // set new token to local storage
            dispatch(setToken(res.data))
            // refresh token successfully -> do not need to resign
            dispatch(setReSign(false))
            // inform to other requests that refresh token successfully
            dispatch(setIsRefreshingToken(false))
          }
        } catch (err) {
          dispatch(setToken(undefined))
          return Promise.reject(err)
        }
      } else {
        return new Promise((resolve) => {
          // in a 100ms time interval checks the store state
          const intervalId = setInterval(() => {
            // if the state indicates that there is no refresh token request anymore
            // it clears the time interval and retries the failed API call with updated token data
            if (!store.getState().auth.isRefreshingToken) {
              clearInterval(intervalId)
              resolve(axiosInstance(baseConfig!))
            }
          }, 100)
        })
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
