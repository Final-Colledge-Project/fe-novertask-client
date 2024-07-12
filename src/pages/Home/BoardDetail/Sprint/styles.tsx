import styled from '@emotion/styled'

export const SprintSummary = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: baseline;

  & .sprint-key {
    font-weight: 600;
  }

  & .time {
    font-size: 12px;
    color: var(--mui-palette-gray-main);
    font-style: italic;
  }

  & .status-static {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`

export const IssueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--mui-palette-gray6-main);
  padding: 12px;
`

export const StatusItem = styled.div<{ $color: string }>`
  padding: 4px 8px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => $color + '1A'};
  font-size: 12px;
`
