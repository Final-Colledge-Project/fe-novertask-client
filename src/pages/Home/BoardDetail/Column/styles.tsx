import styled from '@emotion/styled'

export const ColumnContainer = styled.div`
  width: 250px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 8px;
  gap: 10px;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px;
  border-radius: 8px;
  background-color: var(--mui-palette-white-main);
  font-size: 14px;
  margin-right: 5px;

  & > .icon {
    cursor: grab;
    height: 20px;
    svg {
      width: 20px;
      height: 100%;
    }
  }
  & > .title {
    font-weight: 700;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;

    & > .cards-count {
      font-weight: 400;
      color: var(--mui-palette-gray-main);
    }
    & > .add-task-button {
      cursor: pointer;
      background-color: var(--mui-palette-gray6-main);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      padding: 2px;

      &:hover {
        background-color: var(--mui-palette-gray4-main);
      }
    }
  }
`
export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  max-height: 100%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding-right: 5px;

  &::-webkit-scrollbar-track {
    background-color: var(--mui-palette-gray5-main);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mui-palette-gray2-main);
  }
`
export const Footer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--mui-palette-gray5-main);
  color: var(--mui-palette-gray-main);
  border-radius: 8px;
  font-size: 14px;
  margin-right: 5px;
  &:hover {
    background-color: var(--mui-palette-gray5-main);
    cursor: pointer;
  }
`
export const ActionGroup = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  display: flex;
  gap: 5px;
`

export const Modal = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
`

export const Form = styled.form`
  position: relative;
  z-index: 0;

  &.showing-modal {
    z-index: 10;
  }
`

export const Input = styled.input`
  cursor: pointer;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  white-space: pre-wrap;
  -webkit-box-orient: vertical;
  border: none;
  font-weight: 700;
  font-size: 14px;
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  border-radius: 5px;
  font-family: inherit;

  &:focus {
    outline: 2px solid var(--mui-palette-blue-main);
  }
`

export const Error = styled.div`
  font-size: 12px;
  color: var(--mui-palette-red-main);
  width: 100%;
  text-align: right;
  font-weight: 400;
`
