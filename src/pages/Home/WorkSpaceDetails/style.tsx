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

  & > .header {
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
  }
`

export const Summary = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
  gap: 10px;
`

export const ProjectSummary = styled.div`
  padding: 12px;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
  flex: 1;

  & > .header {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    & > .title {
      font-weight: 700;
    }
  }
`
export const MembersSummary = styled.div`
  padding: 12px;
  height: 100%;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .header {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    & > .title {
      font-weight: 700;
    }
  }

  & > .content {
    display: flex;
    height: 100%;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    /* align-items: center; */

    & > .image-group {
      padding-left: 15px;
      border-left: 1px solid var(--mui-palette-gray4-main);
      height: 100%;
      /* gap: 16px; */
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      & .icon {
        width: 30px;
        transform: rotateY(180deg);
        object-fit: cover;
      }
    }
  }
`

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  gap: 12px;
  /* margin-top: 12px; */
  & > .count {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: var(--mui-palette-LinearProgress-infoBg); */
    background-color: var(--mui-palette-gray6-main);

    color: var(--mui-palette-blue-main);
    font-size: 36px;
    font-weight: 700;
    border-radius: 8px;
  }

  & > .label {
    font-size: 14px;
    color: var(--mui-palette-gray-main);
  }
`

export const MemberPart = styled.div`
  & > .label {
    font-size: 14px;
    color: var(--mui-palette-gray-main);
  }
`
export const Members = styled.div`
  display: flex;
  gap: 20px;
  /* flex-direction: column;
  justify-content: space-between; */
`
export const ProjectSection = styled.div`
  padding: 0 20px;
  margin-top: 30px;
`

export const Title = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  & > p {
    font-weight: 700;
  }
`

export const LineTitle = styled.div`
  background-color: var(--mui-palette-white-main);
  padding: 4px 8px;
  display: grid;
  grid-template-columns: 0.8fr 4fr 2fr 2fr 2fr 2fr 0.5fr;
  /* align-items: center; */
  justify-items: flex-start;
  overflow: hidden;
  gap: 20px;
  border-radius: 8px 8px 0 0;
`

export const LineTitleItem = styled.div<{
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

export const ProjectContainer = styled.div<{ $display: string }>`
  display: ${(props) => props.$display};
  flex-direction: column;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 10px;
`

export const ProjectItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 150px;
  max-height: 150px;
  background-image: linear-gradient(205deg, #67d4cf -22.17%, #0d817c 103.6%);
  /* background-color: var(--mui-palette-blue-main); */
  border-radius: 8px;
  transition: top 0.2s;
  top: 0;

  &:hover {
    position: relative;
    top: -3px;
  }
`

export const ProjectBoard = styled.div<{ $display: 'list' | 'block' }>`
  background-color: ${(props) =>
    props.$display === 'list' ? 'var(--mui-palette-white-main)' : ''};
  border-radius: 8px;
  padding: ${(props) => (props.$display === 'list' ? '10px 15px 20px' : '')};
  margin-top: ${(props) => (props.$display === 'list' ? '10px' : '')};
`

export const FilterSection = styled.div`
  /* margin-bottom: 10px; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`
