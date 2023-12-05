import styled from '@emotion/styled'

export const Button = styled.div<{ $isShow: boolean }>`
  cursor: pointer;
  width: 280px;
  min-width: 280px;
  height: 44px;
  /* text-align: center; */
  padding: 0 10px;
  line-height: 44px;
  color: var(--mui-palette-blue-main);
  border-radius: 8px;
  background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.2);
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.4);
  }
  position: absolute;
  z-index: 2;
  opacity: 1;

  ${(props) =>
    !props.$isShow &&
    `
      z-index: 0;
      opacity: 0;
    `}
`

export const AddZone = styled.div`
  position: relative;
`

export const Input = styled.input`
  margin-right: 5px;
  width: 280px;
  min-width: 280px;
  height: 44px;
  padding: 0 10px;
  line-height: 44px;
  border-radius: 8px;
  color: var(--mui-palette-black-main);
  font-size: 14px;
  /* position: absolute; */
  z-index: 0;
  opacity: 1;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: rgba(var(--mui-palette-gray-mainChannel) / 0.1);

  &.is-focused {
    border: unset;
    border: 1px solid var(--mui-palette-blue-main);
    background-color: var(--mui-palette-white-main);
  }

  &:focus-visible {
    outline: unset;
  }

  &:invalid {
    background-color: var(--mui-palette-pink-main);
  }

  &::placeholder {
    color: var(--mui-palette-gray-main);
  }
`

export const ActionGroup = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  display: flex;
  transform: translateY(-50%);
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2); */
  z-index: 9;
`

export const Error = styled.div`
  font-size: 10px;
  color: var(--mui-palette-red-main);
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: 0px;
  left: 10px;
  display: flex;
  /* background-color: royalblue; */
`

export const Form = styled.form`
  position: relative;

  &.is-focused {
    z-index: 10;
  }
`
