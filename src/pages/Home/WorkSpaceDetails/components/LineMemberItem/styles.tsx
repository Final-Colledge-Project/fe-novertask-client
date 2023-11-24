import styled from '@emotion/styled'

export const Item = styled.div<{ $img: string }>`
  width: 100%;
  min-width: 244px;
  background-color: var(--mui-palette-white-main);
  box-shadow: 0px 0px 7px 1px var(--mui-palette-gray5-main);
  border-radius: 8px;
  border: 1px solid var(--mui-palette-white-main);
  padding: 8px;
  /* cursor: pointer; */
  top: 0;
  transition: box-shadow 0.2s, transform 0.2s;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 2.5fr 1fr 1.5fr;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  position: relative;
  transform: scale(1);

  &::before {
    display: block;
    content: '';
    background-image: url(${(props) => props.$img}),
      linear-gradient(191deg, #ff6482 23.33%, #d20f44 107.81%);
    position: absolute;
    width: 60px;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(20px);
    opacity: 0.7;
  }

  &:hover {
    box-shadow: 0px 0px 8px 3px var(--mui-palette-gray4-main);
    position: relative;
    /* top: -2px; */
    transform: scale(1.01);
  }

  & > .section > .member-count {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  & > .section.clamp-1 {
    word-wrap: break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    /* white-space: nowrap; */
    -webkit-box-orient: vertical;
  }
`

export const ItemCover = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(191deg, #ff6482 23.33%, #d20f44 107.81%);

  &:hover {
    img {
      /* transform: scale(1.05); */
    }
  }

  img {
    position: absolute;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s;
    text-indent: -10000px;
  }
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
  /* flex: 1; */
  /* max-width: 200px; */
  /* width: 100%; */
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
  /* word-break: break-all; */
`

export const ProgressSection = styled.div`
  /* margin: 10px 0; */
  /* min-width: 200px; */
  .progress-text {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    &__number {
      color: var(--mui-palette-gray-main);
    }
  }
`

export const TargetDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--mui-palette-gray6-main);
  font-size: 12px;
  width: fit-content;
  border-radius: 40px;
  margin: 0 auto;
  svg {
    width: 18px;
  }
`

export const CreatedDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--mui-palette-gray6-main);
  font-size: 12px;
  width: fit-content;
  border-radius: 40px;
  margin: 0 auto;
  svg {
    width: 18px;
  }
`

export const ActionGroup = styled.div`
  display: flex;
  gap: 5px;
`
export const MoreButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Badge = styled.div`
  /* margin: 0 auto; */
  width: fit-content;
  border-radius: 50px;
  padding: 0 12px;
  font-size: 14px;
  text-align: center;
  background-color: var(--mui-palette-green-main);
  color: var(--mui-palette-white-main);
  &.admin {
    background-color: var(--mui-palette-yellow-main);
  }
  &.superAdmin {
    background-color: var(--mui-palette-orange-main);
  }
`
