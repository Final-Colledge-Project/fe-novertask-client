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

export const TitleHeader = styled.div<{ $img: string | undefined }>`
  background-color: var(--mui-palette-white-main);
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 30px 0;

  /* padding-top: 10px; */
  & > .left-block {
    display: flex;
    align-items: center;
    gap: 8px;

    .breadcrumb__item {
      color: var(--mui-palette-black-main);
      text-decoration: none;
      &:hover {
        color: var(--mui-palette-blue-main);
      }
    }

    .board-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .board-avatar {
      width: 25px;
      height: 25px;
      border-radius: 4px;
      background-color: var(--mui-palette-gray-main);
      background-image: url(${(props) => props.$img}),
        url('/img/item-cover.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .title-container {
      display: flex;
      align-items: center;
    }

    .title {
      color: var(--mui-palette-blue-main);
      font-weight: 700;
      font-size: 18px;
      display: flex;
      align-items: center;
      margin-right: 8px;
    }

    .description {
      font-size: 12px;
      color: var(--mui-palette-gray-main);
      margin-top: -4px;
    }
  }

  & > .right-block {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px 30px;
  flex-shrink: 0;
  background-color: var(--mui-palette-divider);
`

export const TypeHeader = styled.div`
  /* width: 100%; */
  background-color: var(--mui-palette-white-main);
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--mui-palette-divider);
  padding: 0px 30px 8px;
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
  font-size: 14px;

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
  gap: 20px;
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
    }}>
    {children}
  </AvatarGroup>
)

export const MemberCountLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

export const Body = styled.div`
  flex: 1;
  /* max-width: calc(100vw - 70px); */
  display: flex;
  align-items: flex-start;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 30px;
  /* margin-bottom: 10px; */
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
export const OrangeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: #ff9500;
  }

  & .MuiTooltip-arrow {
    /* top: -10px !important; */
    &::before {
      background: #ff9500;
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
    props.$type === 'scrum'
      ? 'var(--mui-palette-orange-main)'
      : 'var(--mui-palette-green-main)'};
`
