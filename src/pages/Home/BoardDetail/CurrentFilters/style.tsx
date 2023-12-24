import styled from '@emotion/styled'

export const FilterItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 500px;
  background-color: rgba(var(--mui-palette-orange-mainChannel) / 0.1);
  border: 1px solid var(--mui-palette-orange-main);
  color: var(--mui-palette-orange-main);
  padding: 2px 12px;

  & .title__name {
    font-size: 12px;
  }
`
