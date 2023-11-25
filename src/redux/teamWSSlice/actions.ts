import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IAssignAdminBody,
  ICreateWSBody,
  IGetMemberBody,
  createWorkspace,
  getMembers,
  assignAdmin as assign
} from '~/services/workspaceService'

export const createWS = createAsyncThunk(
  'teamWorkspace/createWS',
  async (data: ICreateWSBody, thunkApi) => {
    try {
      // create workspace
      const res = await createWorkspace(data)

      // return workspace created
      if (res) return res.data
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const getAllMembers = createAsyncThunk(
  'teamWorkspace/getAllMembers',
  async (data: IGetMemberBody, thunkApi) => {
    try {
      // get all member by ws id
      const res = await getMembers(data)

      // return data
      if (res && res.data) {
        const { workspaceAdmins, workspaceMembers } = res.data
        // clean members list
        const cleanedMemberList = workspaceMembers?.filter(
          (member) =>
            workspaceAdmins.findIndex(
              (admin) => admin.user._id === member.user._id
            ) === -1
        )
        return {
          workspaceAdmins,
          workspaceMembers: cleanedMemberList || undefined
        }
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

export const assignAdmin = createAsyncThunk(
  'teamWorkspace/assignAdmin',
  async (data: IAssignAdminBody, thunkApi) => {
    try {
      // assign member by email + ws id
      const res = await assign(data)

      // successfully -> get all member again
      if (res) {
        const resGetAllMember = await getMembers({ id: data.wsID })
        if (resGetAllMember && resGetAllMember.data) {
          const { workspaceAdmins, workspaceMembers } = resGetAllMember.data
          // clean members list
          const cleanedMemberList = workspaceMembers?.filter(
            (member) =>
              workspaceAdmins.findIndex(
                (admin) => admin.user._id === member.user._id
              ) === -1
          )
          return {
            workspaceAdmins,
            workspaceMembers: cleanedMemberList || undefined
          }
        }
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)
