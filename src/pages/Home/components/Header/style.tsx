import styled from '@emotion/styled'

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  gap: 16px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  /* background-color: rgba($color: #f2f2f7, $alpha: 0.8); */
  background-color: var(--mui-palette-white-main);
  backdrop-filter: blur(15px);
  & .workspace-name {
    color: var(--mui-palette-blue-main);
    flex: 1;
    cursor: pointer;
  }
  & > .search-box {
    width: 300px;
    label {
      color: var(--mui-palette-black-main);
    }
    & > .MuiFormControl-root {
      height: 40px;
    }
  }
  & > .more-icon {
    font-size: 24px;
  }
  & > .add-btn {
    button {
      @include effects.glassEffect;
    }
  }
`
