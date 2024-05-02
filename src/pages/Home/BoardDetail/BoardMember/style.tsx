import styled from '@emotion/styled'

export const BoardMenuContainer = styled.div`
  padding-left: 30px;
`

export const StyledHeader = styled.div`
  background-color: var(--mui-palette-white-main);
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--mui-palette-divider);
  padding: 0 30px 8px 0;
`

export const ViewTypeMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`
export const ViewTypeItem = styled.div`
  color: var(--mui-palette-gray3-main);
  cursor: pointer;
  transition: color 0.15s;
  position: relative;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::after {
    transform-origin: left;
    transition: color 0.15s, transform 0.15s;
    display: block;
    border-bottom: 2px solid var(--mui-palette-black-main);
    content: '';
    left: 0;
    right: 0;
    bottom: -1px;
    transform: scaleX(0);
    position: absolute;
  }

  &:hover {
    color: var(--mui-palette-gray-main);
  }

  &.index {
    font-weight: 700;
    color: var(--mui-palette-black-main);
    border-bottom: 2px solid var(--mui-palette-black-main);
    &::after {
      border-bottom: 2px solid var(--mui-palette-black-main);
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      transform: scaleX(1);
    }
  }

  & > .current-item-count {
    display: inline-block;
    padding: 2px 4px;
    color: var(--mui-palette-gray-main);
  }
`

export const RightMenu = styled.div`
  display: flex;
  gap: 8px;
`

export const MemberListTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const Body = styled.div`
  padding-right: 30px;
`

export const Placeholder = styled.div`
  width: 100%;
  color: var(--mui-palette-gray-main);
  padding: 50px 0;
  text-align: center;
`
