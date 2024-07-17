import styled from '@emotion/styled'

export const LogItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;

  &.log--creating {
    align-items: center;
  }
`

export const LogData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
`

export const DataComparison = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  align-items: center;

  & > .icon {
    flex-shrink: 0;
  }

  & > .data {
    width: fit-content;
    max-width: calc(50% - 10px);

    &.data--none {
      color: var(--mui-palette-gray2-main);
    }
  }
`

export const Avatar = styled.div<{ $size?: string }>`
  width: ${(props) => props.$size || '35px'};
  height: ${(props) => props.$size || '35px'};
  border-radius: 100px;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`
