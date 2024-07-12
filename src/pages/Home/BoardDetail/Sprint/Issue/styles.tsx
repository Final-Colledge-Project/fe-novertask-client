import styled from '@emotion/styled'
import { isDarkColor } from '~/utils/helper'

export const IssueContainer = styled.div`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--mui-palette-white-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    box-shadow: 0px 0px 6px 1px var(--mui-palette-gray4-main);
  }
`

export const IssueKey = styled.div`
  font-size: 12px;
  color: var(--mui-palette-blue-main);
`

export const IssueTitle = styled.div<{ $isResolved: boolean }>`
  font-size: 14px;
  // limit 1 line and show overflow text as eclipse
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  width: 500px;
  font-weight: ${({ $isResolved }) => ($isResolved ? 'normal' : 'bold')};
  text-decoration: ${({ $isResolved }) =>
    $isResolved ? 'line-through' : 'none'};
`

export const IssueTypeIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
`

export const StatusContainer = styled.div`
  width: 100px;
`

export const Status = styled.div<{ $color: string }>`
  width: fit-content;
  font-size: 12px;
  /* color: ${({ $color }) =>
    isDarkColor($color + '1A')
      ? 'var(--mui-palette-white-main)'
      : 'var(--mui-palette-black-main)'}; */
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => $color + '1A'};
  padding: 4px 8px;
  border-radius: 8px;
`

export const StoryPoint = styled.div`
  font-size: 12px;
  color: var(--mui-palette-black-main);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--mui-palette-gray4-main);
  flex-shrink: 0;
`

export const Assignee = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`
