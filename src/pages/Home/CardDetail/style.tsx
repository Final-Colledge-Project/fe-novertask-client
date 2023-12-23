import styled from '@emotion/styled'
import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
  IconButton,
  IconButtonProps
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { RiAddLine } from 'react-icons/ri'

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Modal = styled.div`
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
  padding: 20px;
  max-width: 1080px;
  min-height: 90%;
  min-width: 1080px;
  position: relative;
  overflow-y: auto;

  & .breadcrumb__item {
    text-decoration: none;
    color: var(--mui-palette-gray-main);
    font-size: 14px;

    &:hover {
      color: var(--mui-palette-blue-main);
    }
  }

  & .breadcrumb__current-item {
    color: var(--mui-palette-black-main);
    padding: 0px 8px;
    border-radius: 5px;
    background-color: var(--mui-palette-gray5-main);
    display: flex;
    align-items: center;
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

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const CardInfo = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
`
export const CardInfoPartDivider = styled.div`
  flex: 0 0 1px;
  width: 1px;
  background-color: var(--mui-palette-divider);
`

export const CardInfoPart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;

  & .title {
    font-weight: 700;
    font-size: 20px;
    margin-top: -20px;
  }

  &.part--main {
    flex: 2;
  }

  &.part--sub {
    flex: 1;
  }

  & > .part__divider {
    width: 100%;
    height: 1px;
    background-color: var(--mui-palette-gray5-main);
  }

  & .section {
    &__label {
      font-size: 14px;
      font-weight: 700;
      width: 100%;
      text-align: left;
    }
  }
`

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  & > .section__header {
    font-size: 14px;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;

    & > .section__title {
      font-weight: 700;
    }
  }

  & .section__label {
    font-size: 14px;
    font-weight: 700;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .due-date {
    & input {
      color: var(--mui-palette-black-main);
      border: none;
      border: 1px solid var(--mui-palette-gray3-main);
      border-radius: 8px;
    }

    & .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .due-date--tomorrow {
    background-color: rgba(var(--mui-palette-orange-mainChannel) / 0.1);
    border: 1px solid var(--mui-palette-orange-main);
    & input {
      color: var(--mui-palette-orange-main);
    }
  }
`

export const AddItemButton = muiStyled((props: IconButtonProps) => (
  <IconButton
    size="small"
    color="primary"
    sx={{
      backgroundColor: `rgba(var(--mui-palette-blue-mainChannel)/ 0.2)`,
      padding: '2px',
      ...props
    }}
  >
    <RiAddLine />
  </IconButton>
))()

export const Cover = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &.no-image {
    display: none;
  }

  & .cover__edit-group {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  & .cover__edit-button {
    padding: 0 12px;
    height: 30px;
    display: flex;
    align-items: center;
    color: var(--mui-palette-white-main);
    font-size: 12px;
    border-radius: 5px;
    background-color: rgba(var(--mui-palette-black-mainChannel) / 0.5);
    cursor: pointer;
    border: 1px solid transparent;
    transition: border 0.2s;

    &:hover {
      border: 1px solid var(--mui-palette-white-main);
    }
  }
`

export const Input = styled.input<{ $isShow?: boolean }>`
  width: 100%;
  min-width: 280px;
  padding: 5px 10px;
  padding-left: 0;
  border-radius: 8px;
  color: var(--mui-palette-blue-main);
  font-size: 24px;
  border: 1px solid transparent;
  font-weight: 700;
  margin: 5px 0;

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
`

export const ActionGroup = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  display: flex;
  gap: 5px;

  &.mr-10 {
    margin-right: 10px;
  }
`

export const Error = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--mui-palette-red-main);
  text-align: right;
  padding-right: 10px;

  &.error--alert {
    color: var(--mui-palette-gray-main);
  }
`

export const Form = styled.form`
  position: relative;
  z-index: 1;
`

export const SquareButton = muiStyled((props: ButtonProps) => (
  <Button
    variant="contained"
    color="error"
    sx={{
      height: '30px',
      minWidth: '30px',
      width: '30px',
      color: (theme) => theme.palette.white.main,
      padding: 0
    }}
    {...props}
  />
))()

export const SubTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > .section__header {
    font-size: 14px;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;

    & > .section__title {
      font-weight: 700;
    }
  }
`

export const SubTaskItem = styled.div`
  padding: 5px 10px;
  /* box-shadow: 0px 0px 7px 1px var(--mui-palette-gray5-main); */
  border-radius: 8px;
  border: 1px solid var(--mui-palette-divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SubTaskItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > .item__id {
    width: fit-content;
    color: var(--mui-palette-black-main);
    padding: 0px 4px;
    border-radius: 5px;
    background-color: var(--mui-palette-gray5-main);
    display: flex;
    align-items: center;
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

  & > .item__title {
    max-width: 55%;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: pre-line;
    -webkit-box-orient: vertical;
  }
`

export const SubTaskItemBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  & > .section {
    flex: 1 0 70px;
  }
`

export const Owner = styled.div`
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

export const AvatarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`

export const Label = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$color + '20'};
  padding: 2px 10px;
  border-radius: 50px;
  font-size: 14px;
`

export const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

export const PriorityItem = styled.div`
  padding: 4px 40px;
  text-align: center;
  font-size: 14px;
  background-color: var(--mui-palette-gray-main);
  color: var(--mui-palette-white-main);
  /* width: fit-content; */
  border-radius: 5px;
  width: 100%;

  &.high {
    background-color: var(--mui-palette-pink-main);
  }
  &.medium {
    background-color: var(--mui-palette-orange-main);
  }
  &.low {
    background-color: var(--mui-palette-blue-main);
  }
`

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

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

export const DateTimeContainer = styled.div`
  position: relative;
  width: 100%;
`
