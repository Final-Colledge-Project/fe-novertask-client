import styled from '@emotion/styled'
import { Button, ButtonProps } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'

export const PermissionContainer = styled.div`
  flex: 1;
  min-width: 290px;
  /* max-width: calc(calc(100% - 40px) / 3); */
  max-width: 290px;
  background-color: white;
  box-shadow: 0px 0px 6px 1px var(--mui-palette-gray4-main);
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ColorHeader = styled.div<{ $color: string }>`
  height: 36px;
  width: 100%;
  background-color: ${({ $color }) => $color};
`

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  /* display overflow text as eclipse, max 1 row */
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  word-break: break-all;
  text-transform: uppercase;
  font-size: 16px;
`

export const UserCount = styled.div`
  font-size: 12px;
  margin-top: 8px;
  color: var(--mui-palette-gray-main);
  margin-bottom: 8px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px 12px;
`

export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 122px;
  height: 122px;
  align-content: flex-start;
  overflow-y: auto;
  background-color: var(--mui-palette-gray6-main);
  padding: 8px;
  border-radius: 8px;
`

export const UserListEmptyText = styled.div`
  font-size: 12px;
  color: var(--mui-palette-gray-main);
  text-align: center;
  height: 122px;
  background-color: var(--mui-palette-gray6-main);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Description = styled.div`
  font-size: 12px;
  color: var(--mui-palette-gray-main);
  /* display overflow text as eclipse, max 2 row */
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  height: 36px;
  /* word-break: break-all; */
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  /* background-color: var(--mui-palette-gray6-main); */
`

export const SquareButton = muiStyled((props: ButtonProps) => (
  <Button
    variant="outlined"
    color="error"
    sx={{
      height: '35px',
      minWidth: '35px',
      width: '30px',
      color: (theme) => theme.palette.white.main,
      padding: 0
    }}
    {...props}
  />
))()
