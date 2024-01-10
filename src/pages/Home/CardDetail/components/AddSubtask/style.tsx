import styled from '@emotion/styled'
import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'

export const ActionGroup = styled.div`
  top: 45px;
  right: 0;
  display: flex;
  gap: 5px;
`

export const Error = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--mui-palette-red-main);
  text-align: right;
  padding-right: 10px;
`

export const Form = styled.form`
  width: 400px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px 25px 10px;
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

export const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 15px;
  border-bottom: 1px solid var(--mui-palette-divider);
`

export const MenuBody = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  gap: 10px;
  margin: 0 10px;
`

export const MenuGeneralContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

export const Layer = styled.div`
  &.open {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: transparent;
  }
`

export const Loading = muiStyled((props: CircularProgressProps) => (
  <CircularProgress
    size="15px"
    sx={{
      color: (theme) => theme.palette.blue.main,
      display: 'inline-block',
      ml: '10px'
    }}
    {...props}
  />
))()
