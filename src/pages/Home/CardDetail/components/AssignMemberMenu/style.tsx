import styled from '@emotion/styled'

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

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: var(--mui-palette-white-main);
`

export const UserItem = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const Info = styled.div`
  flex: 1;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > .name {
    font-size: 16px;
    font-weight: 700;
  }
  & > .email {
    color: var(--mui-palette-gray-main);
    font-size: 14px;
  }
`
export const IconCheck = styled.div`
  width: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px;
  border-bottom: 1px solid var(--mui-palette-divider);
`
