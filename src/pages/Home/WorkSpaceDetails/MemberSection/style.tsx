import styled from '@emotion/styled'

export const Board = styled.div`
  padding: 10px;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
`
export const Container = styled.div`
  margin: 0 20px;
`

export const Header = styled.div`
  border-bottom: 1px solid var(--mui-palette-divider);
  margin-bottom: 20px;

  & > .describe {
    font-size: 14px;
    color: var(--mui-palette-gray-main);
    margin-bottom: 20px;
    margin-left: 28px;
  }
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  p.text {
    font-weight: 700;
  }

  .title {
    display: flex;
    align-items: center;
  }
`

export const BoardHeader = styled.div`
  background-color: var(--mui-palette-white-main);
  padding: 4px 8px;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 2.5fr 1fr 1.5fr;
  /* align-items: center; */
  justify-items: flex-start;
  overflow: hidden;
  gap: 20px;
  border-radius: 8px 8px 0 0;
`

export const BoardHeaderItem = styled.div<{
  active?: boolean
  isAsc?: boolean
}>`
  /* font-weight: 700; */
  color: var(--mui-palette-gray2-main);
  font-size: 14px;
  display: flex;
  gap: 5px;
  align-items: center;

  &:hover {
    .icon {
      visibility: visible;
    }
  }

  & > p {
    color: var(
      ${(props) =>
        props.active ? '--mui-palette-black-main' : '--mui-palette-gray-main'}
    );
    font-weight: ${(props) => (props.active ? '700' : 'normal')};
  }

  & > .icon {
    transition: visibility 0.2s;
    visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
    .MuiButtonBase-root {
      padding: 4px;
      transform: rotateZ(${(props) => (props.isAsc ? '0deg' : '180deg')});
    }
  }

  &.center {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding: 0 5px;
  min-height: 100px;

  & .placeholder {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: var(--mui-palette-gray-main);
    /* padding: 50px; */
  }
`

export const TabHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 40px;
  color: var(--mui-palette-gray3-main);
  border-bottom: 1px solid var(--mui-palette-divider);

  & > .item {
    cursor: pointer;
    font-weight: 400;
    position: relative;
    transition: color 0.15s;

    &:hover {
      color: var(--mui-palette-gray-main);
    }

    &::after {
      transform-origin: left;
      transition: color 0.15s, transform 0.15s;
      display: block;
      border-bottom: 2px solid var(--mui-palette-black-main);
      content: '';
      left: 0;
      right: 0;
      bottom: -1px;
      transform: scaleX(0);
    }
  }
  & > .item.index {
    display: block;
    color: var(--mui-palette-black-main);
    font-weight: 700;
    &::after {
      border-bottom: 2px solid var(--mui-palette-black-main);
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      transform: scaleX(1);
    }
  }
`
