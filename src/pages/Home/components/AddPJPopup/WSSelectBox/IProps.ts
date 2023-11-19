import { SelectChangeEvent } from '@mui/material'

export default interface IProps {
  value: string
  handleChange: (e: SelectChangeEvent) => void
  workspaces: {
    id: string
    name: string
  }[]
  field?: object
  error?: boolean
}
