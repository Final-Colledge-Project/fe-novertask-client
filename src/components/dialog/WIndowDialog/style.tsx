import styled from '@emotion/styled'

export const CloseButton = styled.div<{ $isFullScreen: boolean }>`
  position: absolute;
  top: ${(props) => (props.$isFullScreen ? '10px' : '-10px')};
  right: ${(props) => (props.$isFullScreen ? '10px' : '-10px')};
  color: var(--mui-palette-gray-main);
  background-color: var(--mui-palette-white-main);
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 6px 1px rgba(var(--mui-palette-black-mainChannel) / 0.5);
`
