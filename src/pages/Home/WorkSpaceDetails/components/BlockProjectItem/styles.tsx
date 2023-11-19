import styled from '@emotion/styled'

export const Item = styled.div`
  // max-width: 285px;
  // width: 285px;
  // height: 314px;
  // flex: 1;
  min-width: 244px;
  background-color: var(--mui-palette-white-main);
  box-shadow: 0px 0px 7px 1px var(--mui-palette-gray5-main);
  border-radius: 8px;
  border: 1px solid var(--mui-palette-gray5-main);
  // padding: 10px;
  cursor: pointer;
  top: 0;
  transition: box-shadow 0.2s, top 0.2s;

  &:hover {
    box-shadow: 0px 0px 10px 4px var(--mui-palette-gray4-main);
    position: relative;
    top: -2px;
  }

  .item-bottom {
    padding: 0 10px;
    &__task-progress {
      margin: 10px 0;

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
    }

    &__info-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .item__estimate {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background-color: var(--mui-palette-gray6-main);
        font-size: 12px;
        width: fit-content;
        border-radius: 40px;
        svg {
          width: 18px;
        }
      }

      .item__avatar-group {
        // flex: 1;
      }
    }
  }
`

export const ItemCover = styled.div`
  width: 100%;
  // min-width: 248px;
  height: 120px;
  border-radius: 8px 8px 0 0;
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

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 0;
    bottom: 0;
    padding: 5px 5px 10px 10px;
    color: var(--mui-palette-white-main);
    /* backdrop-filter: blur(2px); */
    /* background-image: linear-gradient(
      180deg,
      #000 -100.7%,
      rgba(0, 0, 0, 0) 100%
    ); */

    background-color: rgba(0, 0, 0, 0.25);

    // margin-bottom: 15px;

    &__title {
      padding-top: 2px;
      font-weight: 700;
      font-size: 16px;
      text-wrap: wrap;
      // display: -webkit-box;
      // text-overflow: ellipsis;
      // -webkit-line-clamp: 1;
      // overflow: hidden;
      // // white-space: nowrap;
      // -webkit-box-orient: vertical;
    }
  }
`
