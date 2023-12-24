import styled from '@emotion/styled'

export const Layer = styled.div`
  &.open {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: transparent;
  }
`
