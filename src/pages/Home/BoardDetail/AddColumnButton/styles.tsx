import styled from '@emotion/styled'

export const Button = styled.div`
  cursor: pointer;
  width: 280px;
  min-width: 280px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  color: var(--mui-palette-blue-main);
  border-radius: 8px;
  background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.2);
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.4);
  }
`
