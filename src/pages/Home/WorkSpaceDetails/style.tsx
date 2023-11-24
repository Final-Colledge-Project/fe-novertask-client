import styled from '@emotion/styled'
export const WorkSpaceDetailContainer = styled.div`
  flex: 1;
  background-color: var(--mui-palette-gray6-main);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 50px;
  overflow-y: auto;
  // margin-right: 10px;
  // padding-right: 10px;
  &::-webkit-scrollbar {
    background-color: var(--mui-palette-gray5-main);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mui-palette-gray3-main);
  }
`
