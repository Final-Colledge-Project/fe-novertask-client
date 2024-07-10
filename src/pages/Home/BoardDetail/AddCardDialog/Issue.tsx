import styled from '@emotion/styled'

interface IProps {
  name: string
  icon: string
  color?: string
}

const IssueContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const IssueIcon = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--mui-palette-gray-main);
  // handle if the icon is not found
  object-fit: cover;
  object-position: center;
  // using bugGrey as fallback img
  content: url(${(props) => props.src || '/public/icon/bugGrey.png'});
`

const IssueName = styled.div`
  font-size: 13px;
  color: var(--mui-palette-black-main);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
`

const IssueType = (props: IProps) => {
  const { name, icon } = props
  return (
    <IssueContainer>
      <IssueIcon src={icon} />
      <IssueName>{name}</IssueName>
    </IssueContainer>
  )
}

export default IssueType
