import styled from '@emotion/styled'

export const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 16px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba($color: #f2f2f7, $alpha: 0.8);
  backdrop-filter: blur(15px);
  & > .name {
    color: var(--mui-palette-blue-main);
    flex: 1;
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
