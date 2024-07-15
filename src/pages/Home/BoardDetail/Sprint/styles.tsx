import styled from '@emotion/styled'

export const SprintSummary = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: baseline;

  & .status-badge-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 70px;
  }

  & .status-badge {
    font-size: 12px;
    border-radius: 6px;
    padding: 0 4px;
    color: white;
    background-color: var(--mui-palette-blue-main);
    flex-shrink: 0;
    border: 1px solid var(--mui-palette-blue-main);

    &.completed {
      color: var(--mui-palette-green-main);
      background-color: rgba(var(--mui-palette-green-mainChannel) / 0.15);
      border: 1px solid var(--mui-palette-green-main);
    }

    &.active {
      color: var(--mui-palette-blue-main);
      background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.15);
      border: 1px solid var(--mui-palette-blue-main);
    }

    &.pending {
      color: var(--mui-palette-black-main);
      background-color: rgba(var(--mui-palette-gray-mainChannel) / 0.15);
      border: 1px solid var(--mui-palette-black-main);
    }

    &.backlog {
      color: var(--mui-palette-purple-main);
      background-color: rgba(var(--mui-palette-purple-mainChannel) / 0.15);
      border: 1px solid var(--mui-palette-purple-main);
    }
  }

  & .sprint-key {
    font-weight: 600;
    flex-shrink: 0;

    &.completed {
      text-decoration: line-through;
    }
  }

  & .time {
    font-size: 12px;
    color: var(--mui-palette-gray-main);
    font-style: italic;
    flex-shrink: 0;
  }

  & .status-static {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    flex-shrink: 0;
  }

  & .actions {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
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
