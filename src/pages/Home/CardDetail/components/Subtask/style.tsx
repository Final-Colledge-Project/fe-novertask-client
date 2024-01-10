import styled from '@emotion/styled'
import { CircularProgress, CircularProgressProps } from '@mui/material'
import { PRIORITY_COLOR } from '~/utils/constant'
import { styled as muiStyled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'

export const SubtaskStatus = styled.div`
  padding: 0px 8px;
  text-align: center;
  font-size: 12px;
  background-color: var(--mui-palette-gray-main);
  color: var(--mui-palette-white-main);
  /* width: fit-content; */
  border-radius: 5px;
  width: 100%;

  &.todo {
    background-color: ${PRIORITY_COLOR.low};
  }
  &.inprogress {
    background-color: ${PRIORITY_COLOR.hight};
  }
  &.completed {
    background-color: ${PRIORITY_COLOR.medium};
  }
  &.cancel {
    background-color: ${PRIORITY_COLOR.highest};
  }
`

export const SubTaskItem = styled.div`
  padding: 5px 10px;
  height: 100%;
  /* box-shadow: 0px 0px 7px 1px var(--mui-palette-gray5-main); */
  border-radius: 8px;
  border: 1px solid var(--mui-palette-gray-main);
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  transition: height 0.2s;
  /* height: 50px; */

  .subtask__top {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: 5px;
  }
`

export const SubTaskItemHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SubTaskItemBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  & > .section {
    flex: 0 0 110px;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 20px;

    .section-loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -5px;
      height: fit-content;
      display: inline-block;
      transform: translate(-100%, 25%);
    }

    &-member {
      flex-basis: 50px;
    }
    &-date {
      flex-basis: 200px;
    }
  }

  .MuiSelect-select {
    .member-item {
      gap: 0;
    }
    .name {
      display: none;
    }
  }
`

export const Owner = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`

export const Avatar = styled.div`
  /* flex-shrink: 0; */
  min-width: 35px;
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
  /* max-width: 300px; */

  & > .name {
    min-width: 100px;
    max-width: 200px;
    font-size: 16px;
    font-weight: 700;
  }
  & > .email {
    color: var(--mui-palette-gray-main);
    font-size: 14px;
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

export const Input = styled.input<{ $isShow?: boolean }>`
  color: var(--mui-palette-black-main);
  font-size: 14px;
  border: 1px solid transparent;
  padding: 5px 10px 5px 0;
  border-radius: 5px;
  font-weight: 700;

  ${(props) =>
    props.$isShow &&
    `
      z-index: auto;
      opacity: 1;
    `}
  &:focus {
    border: 1px solid var(--mui-palette-blue-main);
  }
  &:focus-visible {
    outline: unset;
  }

  &:invalid {
    background-color: var(--mui-palette-pink-main);
  }

  &.error {
    border: 1px solid var(--mui-palette-pink-main);
  }

  &.dirty {
    background-color: var(--mui-palette-gray6-main);
  }
`

export const ActionGroup = styled.div`
  /* position: absolute;
  bottom: -5px;
  right: 40px; */
  display: flex;
  /* transform: translate(0%, 100%); */
  gap: 5px;
`

export const Error = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--mui-palette-red-main);
  text-align: right;
  padding-right: 10px;
`

export const Form = styled.form`
  position: relative;
  margin: 0;
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SquareButton = muiStyled((props: ButtonProps) => (
  <Button
    variant="contained"
    color="error"
    sx={{
      height: '25px',
      minWidth: '25px',
      width: '25px',
      color: (theme) => theme.palette.white.main,
      padding: 0
    }}
    {...props}
  />
))()

export const SubtaskName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--mui-palette-divider);

  & .item__id {
    width: fit-content;
    color: var(--mui-palette-black-main);
    padding: 0px 4px;
    border-radius: 5px;
    background-color: var(--mui-palette-gray5-main);
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--mui-palette-gray3-main);
    }

    &:active {
      background-color: var(--mui-palette-gray2-main);
    }
  }
`

export const InputContainer = styled.div`
  position: relative;

  .input-length {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    font-size: 14px;
    color: var(--mui-palette-gray-main);
    display: flex;
    align-items: center;
  }
`
