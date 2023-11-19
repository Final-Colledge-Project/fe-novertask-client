import styled from '@emotion/styled'

export const BaseContainer = styled.div`
  color: var(--mui-palette-gray-main);
`
export const MenuContainer = styled.div`
  padding: 0 10px;
`

export const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  border-bottom: 1px solid var(--mui-palette-gray6-main);
`

export const MenuFooter = styled.div`
  padding-top: 8px;
  border-top: 1px solid var(--mui-palette-gray6-main);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button.MuiButtonBase-root {
    padding: 2px 8px;
  }
`
