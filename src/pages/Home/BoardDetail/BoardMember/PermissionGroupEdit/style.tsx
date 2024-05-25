import styled from '@emotion/styled'

export const Overlay = styled.div`
  // over lay
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  background-color: white;
`

export const Title = styled.div`
  font-weight: 600;
  margin-bottom: 16px;
  /* display overflow text as eclipse, max 1 row */
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  word-break: break-all;
  font-size: 16px;
`

export const Mode = styled.span`
  font-size: 16px;
  color: var(--mui-palette-gray-main);
  font-style: italic;
`

export const CloseButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -10px;
  right: -10px;
  color: var(--mui-palette-gray-main);
  background-color: var(--mui-palette-white-main);
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 6px 1px rgba(var(--mui-palette-black-mainChannel) / 0.5);
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

export const Content = styled.div`
  display: flex;
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 500px;
  margin-bottom: 12px;

  &.row {
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
  }

  &.c-gap-5 {
    gap: 20px;
  }

  &.level-2 {
    gap: 4px;
  }

  &.mb-0 {
    margin-bottom: 0;
  }

  &.gap-0 {
    gap: 0;
  }

  &.mt-3 {
    margin-top: 12px;
  }
`

export const SubTitle = styled.div`
  /* level 1 */
  font-size: 16px;
  font-weight: 600;

  /* level 2 */
  &.level-2 {
    font-size: 13px;
    font-weight: 400;
  }

  &.fixed-width {
    width: 120px;
  }

  &.mb-3 {
    margin-bottom: 12px;
  }

  &.text-bold {
    font-weight: 600;
  }
`

export const UserList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  max-height: 300px;
  overflow-y: auto;
  padding-top: 15px;
  padding-right: 4px;
`

export const User = styled.div`
  padding: 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--mui-palette-gray6-main);
`

export const Divider = styled.div`
  width: 1px;
  background-color: var(--mui-palette-divider);
  flex-shrink: 0;
  min-width: 1px;
`

export const Panel = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  flex: 1 0 500px;

  &.right {
    margin-left: 20px;
  }

  &.left {
    margin-right: 20px;
  }
`

export const AddUserButton = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.1);
  color: var(--mui-palette-blue-main);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.2);
  }
`

export const SubTitle2 = styled.span`
  font-size: 14px;
  color: var(--mui-palette-gray-main);
  font-style: italic;
`

export const CheckBoxList = styled.div`
  display: flex;
  gap: 10px;
`

export const TransitionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  color: var(--mui-palette-blue-main);
  background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.2);
  border-radius: 8px;
`

export const TransitionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
