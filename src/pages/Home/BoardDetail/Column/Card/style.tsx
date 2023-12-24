import styled from '@emotion/styled'
import { AvatarGroup } from '@mui/material'
import { ReactNode } from 'react'
import { PRIORITY_COLOR } from '~/utils/constant'


export const CardContainer = styled.div`
  cursor: pointer;
  flex: 0 0;
  width: 100%;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  border: 1px solid var(--mui-palette-white-main);
  transition: border 0.2s;

  &.drag-over-card {
    transform: rotateZ(8deg);
  }

  &:hover {
    border: 1px solid var(--mui-palette-blue-main);
  }

  &.fe-only {
    display: none;
    margin-bottom: -10px;
  }
`

export const Cover = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 5px 5px 0 0;
  background-image: url('/img/item-cover-5.jpg');
  background-position: center;
  background-size: cover;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
export const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

export const Label = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$color + '20'};
  padding: 0px 8px;
  border-radius: 50px;
  font-size: 12px;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  & > .badges {
    display: flex;
    align-items: center;
    justify-content: start;
    flex: 1;
    gap: 10px;
  }
  & .card-id {
    width: fit-content;
    color: var(--mui-palette-blue-main);
  }
`

export const Title = styled.div`
  font-weight: 700;
  flex: 1;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
  -webkit-box-orient: vertical;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  border-bottom: 1px solid var(--mui-palette-divider);
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & > .info-section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const DueDate = styled.div<{
  $isOverDue: boolean
  $isCloseToDue: boolean
}>`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--mui-palette-gray-main);
  color: ${(props) => props.$isCloseToDue && 'var(--mui-palette-orange-main)'};
  color: ${(props) => props.$isOverDue && 'var(--mui-palette-pink-main)'};
  background-color: rgba(var(--mui-palette-gray-mainChannel) / 0.1);
  background-color: rgba(
    ${(props) =>
      props.$isCloseToDue && 'var(--mui-palette-orange-mainChannel) / 0.1'}
  );
  background-color: rgba(
    ${(props) =>
      props.$isOverDue && 'var(--mui-palette-pink-mainChannel) / 0.1'}
  );

  padding: 0px 8px;
  border-radius: 5px;
`

export const Priority = styled.div<{ $priority: string }>`
  padding: 0px 8px;
  border-radius: 5px;
  background-color: var(--mui-palette-gray-main);
  color: var(--mui-palette-white-main);
  font-size: 12px;

  &.highest {
    background-color: ${PRIORITY_COLOR.highest};
  }
  &.high {
    background-color: ${PRIORITY_COLOR.hight};
  }
  &.medium {
    background-color: ${PRIORITY_COLOR.medium};
  }
  &.low {
    background-color: ${PRIORITY_COLOR.low};
  }
  &.lowest {
    background-color: ${PRIORITY_COLOR.lowest};
  }
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
        width: '25px',
        height: '25px',
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

export const Properties = styled.div``
