export type IInitStateType = {
  message: string | undefined
  variants: 'success' | 'error' | 'info' | 'warning'
  open?: boolean
  showDuration?: number
}

const initialState: IInitStateType = {
  message: undefined,
  variants: 'success',
  open: false,
  showDuration: 5000
}

export default initialState
