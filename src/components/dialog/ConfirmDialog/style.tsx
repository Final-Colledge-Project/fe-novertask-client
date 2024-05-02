import styled from '@emotion/styled'
import { Dialog, DialogProps } from '@mui/material'

export const ConfirmDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 40px;
`

export const CustomDialog = styled(({ className, ...props }: DialogProps) => (
  <Dialog {...props} classes={{ paper: className }} />
))`
  &.MuiPaper-root {
    border-radius: 12px;
  }

`
