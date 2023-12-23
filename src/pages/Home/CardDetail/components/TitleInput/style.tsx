import styled from '@emotion/styled'
import { Button, ButtonProps } from '@mui/material'
import { styled as muiStyled } from '@mui/material'

export const Input = styled.input<{ $isShow?: boolean }>`
  width: 100%;
  min-width: 280px;
  padding: 5px 10px;
  padding-left: 0;
  border-radius: 8px;
  color: var(--mui-palette-blue-main);
  font-size: 24px;
  border: 1px solid transparent;
  font-weight: 700;
  margin: 5px 0;

  ${(props) =>
    props.$isShow &&
    `
      z-index: auto;
      opacity: 1;
    `}
  &:focus {
    border: 1px solid var(--mui-palette-blue-main);
  }
  &:focus-visible {
    outline: unset;
  }

  &:invalid {
    background-color: var(--mui-palette-pink-main);
  }

  &.error {
    border: 1px solid var(--mui-palette-pink-main);
  }

  &.dirty {
    background-color: var(--mui-palette-gray6-main);
  }
`

export const ActionGroup = styled.div`
  position: absolute;
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
  position: relative;
  z-index: 1;
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
