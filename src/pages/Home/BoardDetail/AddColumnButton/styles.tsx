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

export const Input = styled.input<{ $isShow: boolean }>`
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
  opacity: 0;
  border: 1px solid transparent;

  ${(props) =>
    props.$isShow &&
    `
      z-index: auto;
      opacity: 1;
    `}

  &:focus {
    border: unset;
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
  top: 50px;
  left: 0;
  display: flex;
  gap: 5px;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
`

export const Error = styled.div`
  font-size: 12px;
  color: var(--mui-palette-red-main);
  width: 100%;
  text-align: right;
`

export const Form = styled.form`
  position: relative;
  z-index: 1;
`
