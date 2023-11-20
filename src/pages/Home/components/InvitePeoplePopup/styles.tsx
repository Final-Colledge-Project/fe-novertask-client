import styled from '@emotion/styled'

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  scale: 1;
  transform-origin: center center;
  opacity: 1;
  transition: opacity 0.3s;

  &.hidden {
    scale: 0;
    opacity: 0;
  }
`

export const Modal = styled.div`
  min-width: 500px;
  max-width: 500px;
  padding: 20px;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & > .title {
    font-weight: 700;
    display: flex;
    align-items: baseline;
    gap: 5px;
    font-size: 20px;

    & > .icon {
      position: relative;
      top: 4px;
    }
  }
`

export const Form = styled.form`
  padding: 20px 0;
  & > .button-group {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
`
