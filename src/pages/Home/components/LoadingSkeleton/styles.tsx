import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Menu = styled.div`
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > .title {
    width: 100%;
    height: 30px;
  }

  & > .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
`

export const Item = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 244px;

  & > .image {
    width: 100%;
    height: 150px;
  }

  & > .bottom {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    & > .date {
      flex: 1;
      height: 100%;
    }
  }
`
