import { SelectChangeEvent } from '@mui/material'
import { ChangeEventHandler } from 'react'

export default interface IProps {
  value?: string
  handleChange?: (e: SelectChangeEvent) => void
  workspaces: {
    name: string
  }[]
  field?: object
  error?: boolean
  onChange?: ChangeEventHandler
}
