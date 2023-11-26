import styled from '@emotion/styled'
import { AvatarGroup } from '@mui/material'
import { ReactNode } from 'react'

export const BoardDetailContainer = styled.div`
  flex: 1;
  background-color: var(--mui-palette-gray6-main);
  display: flex;
  flex-direction: column;
  /* min-width: calc(100vw - 300px); */
  /* max-width: calc(100vw - 70px); */
  height: 100vh;
  /* padding-bottom: 50px; */
  overflow-y: auto;
  // margin-right: 10px;
  // padding-right: 10px;
  &::-webkit-scrollbar {
    background-color: var(--mui-palette-gray5-main);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mui-palette-gray3-main);
  }
`
export const Header = styled.div<{ $img: string }>`
  width: calc(100% - 0px);
  margin: 0;
  height: 100px;
  border-radius: 0 0 20px 20px;
  background-image: url(${(props) => props.$img}), url('/img/item-cover.jpg'),
    linear-gradient(191deg, #ff6482 23.33%, #d20f44 107.81%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--mui-palette-white-main);
  position: relative;
`

export const TitleHeader = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  padding: 10px 20px;
  /* padding-top: 10px; */
  & > .left-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      color: var(--mui-palette-blue-main);
      font-weight: 700;
      font-size: 24px;
    }
    .description {
      color: var(--mui-palette-gray-main);
    }
  }

  & > .right-block {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

export const TypeHeader = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--mui-palette-divider);
  padding: 10px 20px;
`
export const TypeMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
export const TypeItem = styled.div`
  color: var(--mui-palette-gray3-main);
  cursor: pointer;
  transition: color 0.15s;
  position: relative;
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
`

export const Members = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const MemberAvatarGroup = ({ children }: { children: ReactNode }) => (
  <AvatarGroup
    max={5}
    sx={{
      height: '100%',
      ml: '8px',
      flexDirection: 'row',
      justifyContent: 'center',
      '& .MuiAvatar-root': {
        width: '30px',
        height: '30px',
        ml: '-8px',
        boxShadow: '0 0 2px 1px rgba(0,0,0, 0.2)'
      },

      '& .MuiAvatar-root:first-child': {
        order: 3,
        fontSize: '14px'
      },
      '& .MuiAvatar-root:last-child': {
        ml: '-8px'
      }
    }}
  >
    {children}
  </AvatarGroup>
)

export const Body = styled.div`
  flex: 1;
  /* min-width: calc(100vw - 300px); */
  min-width: calc(100vw - 300px);
  max-width: calc(100vw - 70px);
  /* width: fit-content; */
  background-color: var(--mui-palette-gray-main);
  display: flex;
  align-items: start;
  gap: 20px;
  overflow-x: scroll;
  /* overflow-y: unset; */
`
