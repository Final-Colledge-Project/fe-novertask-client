import styled from '@emotion/styled'
import { CircularProgress, CircularProgressProps } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { PRIORITY_COLOR } from '~/utils/constant'

export const CalendarContainer = styled.div`
  flex: 0 0 300px;
  max-width: 300px;
  height: 100%;
  background-color: var(--mui-palette-white-main);
`

export const TasksContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  flex-direction: column;
  border-top: 1px solid var(--mui-palette-divider);
  max-height: 350px;
  overflow-y: auto;

  .title__date {
    font-size: 14px;
    font-weight: 400;
    color: var(--mui-palette-gray-main);
    padding-left: 10px;
  }
  .body {
  }
`

export const TaskContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TaskItem = styled.div`
  min-height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  padding: 10px;
  background-color: var(--mui-palette-gray6-main);
  border: 1px solid transparent;
  width: 100%;
  cursor: pointer;

  &.highest {
    background-color: var(${PRIORITY_COLOR.highest}+ '20');
    border-color: ${PRIORITY_COLOR.highest};
  }
  &.high {
    background-color: ${PRIORITY_COLOR.hight + '20'};
    border-color: ${PRIORITY_COLOR.hight};
  }
  &.medium {
    background-color: ${PRIORITY_COLOR.medium + '20'};
    border-color: ${PRIORITY_COLOR.medium};
  }
  &.low {
    background-color: ${PRIORITY_COLOR.low + '20'};
    border-color: ${PRIORITY_COLOR.low};
  }
  &.lowest {
    background-color: ${PRIORITY_COLOR.lowest + '20'};
    border-color: ${PRIORITY_COLOR.lowest};
  }

  & .item__title {
    font-weight: 700;
    margin: 5px 0;
  }
  & .item__board-name {
    font-size: 14px;
    color: var(--mui-palette-black-main);
  }

  & .item__due-date {
    font-size: 14px;
    color: var(--mui-palette-black-main);
  }
`

export const Loading = muiStyled((props: CircularProgressProps) => (
  <CircularProgress
    size="15px"
    sx={{
      color: (theme) => theme.palette.blue.main,
      display: 'inline-block',
      ml: '10px'
    }}
    {...props}
  />
))()

export const Priority = styled.div`
  width: fit-content;
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
