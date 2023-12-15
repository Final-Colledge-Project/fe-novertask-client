import { ILoginSuccessBody, ISignInBody } from '~/services/authService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService, userService } from '~/services'
import {
  IUpdateUserBody,
  IUploadAvatarBody
} from '~/services/userService/reqTypes'

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: ISignInBody, thunkApi) => {
    try {
      // sign in
      const res = await authService.signIn(data)
      if (res && res.data) {
        // persist the token
        localStorage.setItem(
          import.meta.env.VITE_USER_TOKEN_KEY,
          res.data as string
        )

        const userRes = await userService.getCurrentUser()
        if (userRes && userRes.data)
          // return token for reducer
          return {
            userToken: res.data,
            userInfo: userRes.data
          }
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_data, thunkApi) => {
    try {
      // refresh the token
      const res = await authService.refreshToken()
      if (res && res.data) {
        // persist the token
        localStorage.setItem(
          import.meta.env.VITE_USER_TOKEN_KEY,
          res.data as string
        )

        // return token for reducer
        return res.data as string
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_data, thunkApi) => {
    try {
      // sign in
      const res = await userService.getCurrentUser()
      if (res && res.data) {
        // return token for reducer
        return res.data
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_data, thunkApi) => {
    try {
      // sign out
      await userService.signOut()
      return ''
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (data: IUploadAvatarBody, thunkApi) => {
    try {
      // update avatar
      const res = await userService.updateAvatar(data)
      if (res && res.data) {
        // return updated user for store
        return res.data
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: IUpdateUserBody, thunkApi) => {
    try {
      // update avatar
      const res = await userService.updateUser(data)
      if (res && res.data) {
        // return updated user for store
        return res.data
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const loginSuccess = createAsyncThunk(
  'auth/loginSuccess',
  async (data: ILoginSuccessBody, thunkApi) => {
    try {
      const res = await authService.loginSuccess(data)
      if (res && res.data) {
        // persist the token
        localStorage.setItem(
          import.meta.env.VITE_USER_TOKEN_KEY,
          res.data as string
        )

        const userRes = await userService.getCurrentUser()
        if (userRes && userRes.data)
          // return token for reducer
          return {
            userToken: res.data,
            userInfo: userRes.data
          }
      }
    }
    catch (err) { 
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
