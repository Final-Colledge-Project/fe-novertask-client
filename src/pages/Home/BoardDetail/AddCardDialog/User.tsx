import styled from '@emotion/styled'
import { Avatar } from '@mui/material'

const UserContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const UserName = styled.div`
  font-size: 14px;
  //limit 1 line
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
`

interface IProps {
  fullName: string
  avt: string
}

const User = (props: IProps) => {
  const { avt, fullName } = props
  return (
    <UserContainer>
      <Avatar
        src={avt}
        sx={{
          width: '30px',
          height: '30px'
        }}
      />
      <UserName>{fullName}</UserName>
    </UserContainer>
  )
}

export default User
