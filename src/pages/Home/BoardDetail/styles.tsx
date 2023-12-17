import styled from '@emotion/styled'
import { AvatarGroup, Tooltip, TooltipProps } from '@mui/material'
import { ReactNode } from 'react'

export const BoardDetailContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: rgba(var(--mui-palette-white-mainChannel));
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  &::-webkit-scrollbar {
    background-color: var(--mui-palette-gray5-main);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mui-palette-gray3-main);
  }
`
export const Header = styled.div<{ $img: string }>`
  /* width: calc(100% - 0px); */
  height: 100px;
  background-image: url(${(props) => props.$img}), url('/img/item-cover.jpg'),
    linear-gradient(191deg, #ff6482 23.33%, #d20f44 107.81%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--mui-palette-white-main);
  position: relative;
  transform: scaleY(1);
  transition: transform 0.2s, height 0.2s;
  transform-origin: top;

  &.hidden {
    height: 0px;
    transform: scaleY(0);
  }

  & > .show-header {
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    right: 20px;
    background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 8px;
    transition: border 0.2s;
    border: 1px solid rgba(var(--mui-palette-black-mainChannel) / 0.2);
    &:hover {
      border: 1px solid var(--mui-palette-white-main);
    }
  }
`

export const TitleHeader = styled.div`
  background-color: var(--mui-palette-white-main);
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  padding: 10px 30px 0;
  /* padding-top: 10px; */
  & > .left-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      color: var(--mui-palette-blue-main);
      font-weight: 700;
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .description {
      font-size: 14px;
      color: var(--mui-palette-gray-main);
      height: 20px;
    }
  }

  & > .right-block {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

export const TypeHeader = styled.div`
  /* width: 100%; */
  background-color: var(--mui-palette-white-main);
  justify-content: space-between;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--mui-palette-divider);
  padding: 0px 30px 10px;
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
  /* max-width: calc(100vw - 70px); */
  display: flex;
  align-items: flex-start;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 30px;
  margin-bottom: 10px;
  background-color: var(--mui-palette-gray6-main);
  /* overflow-y: hidden; */

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--mui-palette-gray4-main);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mui-palette-gray2-main);
  }
`

export const YellowTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: #ffcc02;
  }

  & .MuiTooltip-arrow {
    /* top: -10px !important; */
    &::before {
      background: #ffcc02;
    }
  }
`

export const ProjectType = styled.div<{ $type: string }>`
  font-weight: 400;
  display: inline-block;
  color: white;
  font-size: 12px;
  padding: 0 8px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.$type === 'private'
      ? 'var(--mui-palette-orange-main)'
      : 'var(--mui-palette-green-main)'};
`
