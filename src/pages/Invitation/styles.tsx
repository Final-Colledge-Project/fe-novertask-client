import styled from '@emotion/styled'

export const Background = styled.div<{ $img?: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$img});
  background-size: cover;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-position: center;
`

export const Container = styled.div`
  background-image: linear-gradient(209deg, #70d7ff -15.23%, #0271a4 102.22%);
  width: 100vw;
  height: 100vh;
`

export const BlurLayer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
`
export const Modal = styled.div`
  margin-top: 50px;
  border-radius: 20px;
  border: 1px solid var(--mui-palette-white-main);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  width: 45%;
  padding: 20px 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1080px) {
    width: 60%;
  }
  @media screen and (max-width: 900px) {
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
  @media screen and (max-width: 414px) {
    width: calc(100% - 20px);
    padding: 10px 20px;
    gap: 10px;
  }

  & > .title {
    font-size: 20px;
    font-weight: 700;
    /* color: var(--mui-palette-blue-main); */
  }
`

export const Letter = styled.div`
  width: 100%;
  border-radius: 8px;
  background: var(--mui-palette-white-main);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  padding: 50px 50px;

  @media screen and (max-width: 414px) {
    padding: 20px 10px;
  }

  & > .workspace-name {
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: 700;
    color: var(--mui-palette-blue-main);
  }
  & > .invitation-text {
    /* margin: 30px 0; */
    text-align: center;
  }
`

export const Image = styled.div`
  position: relative;
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 3px solid var(--mui-palette-blue-main);
  padding: 5px;
  /* background: linear-gradient(209deg, #70d7ff -15.23%, #0271a4 102.22%); */

  img {
    /* position: absolute; */
    z-index: 1;
    display: block;
    border-radius: 5px;
    /* margin: 5px; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    text-indent: -100000px;
  }
`

export const GroupMembers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > .text {
    color: var(--mui-palette-gray-main);
  }

  @media screen and (max-width: 414px) {
    flex-direction: column;
  }
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 414px) {
    margin-top: 10px;
    gap: 0px;
    flex-direction: column-reverse;
  }
`

export const ImageGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;

  & > svg {
    width: 30px;
    height: 30px;
    color: var(--mui-palette-gray3-main);
  }
`
