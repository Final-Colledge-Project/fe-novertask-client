import styled from '@emotion/styled'
import { Button, ButtonProps } from '@mui/material'
import { styled as muiStyled } from '@mui/material'

export const Container = styled.div`
  position: relative;
`

export const ActionGroup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  transform: translateY(25%);
  display: flex;
  align-items: flex-start;
  gap: 5px;
  height: fit-content;
  margin-top: 2px;
`

export const Error = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--mui-palette-red-main);
  text-align: right;
  padding-right: 10px;
`

export const SquareButton = muiStyled((props: ButtonProps) => (
  <Button
    variant="contained"
    color="error"
    sx={{
      height: '30px',
      minWidth: '30px',
      width: '30px',
      color: (theme) => theme.palette.white.main,
      padding: 0
    }}
    {...props}
  />
))()

export const Form = styled.form`
  position: relative;
  z-index: 1;
`
