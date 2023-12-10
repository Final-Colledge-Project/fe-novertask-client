import {
  SideBar,
  Body,
  Container,
  Header,
  VerticalDivider,
  Menu,
  MenuItem,
  UserGeneralInfo,
  GeneralAvatar,
  UserDetailInfo,
  GeneralInfo
} from './style'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import GeneralInformation from './GeneralInformation'

export default function Profile() {
  const currentUserInfo = useSelector((state: StoreType) => state.auth.userInfo)

  return (
    <Container>
      <Header>
        <h1 className="header-text">Your profile</h1>
      </Header>
      <Body>
        <UserGeneralInfo>
          <GeneralAvatar>
            <img src={currentUserInfo?.avatar} alt="" />
          </GeneralAvatar>
          <GeneralInfo>
            <p className="name">{`${currentUserInfo?.firstName} ${currentUserInfo?.lastName}`}</p>
            <p className="email">{`${currentUserInfo?.email}`}</p>
          </GeneralInfo>
        </UserGeneralInfo>
        <UserDetailInfo>
          <SideBar>
            <Menu>
              <MenuItem>General</MenuItem>
              <MenuItem>Account</MenuItem>
            </Menu>
          </SideBar>
          <VerticalDivider />
          <GeneralInformation />
        </UserDetailInfo>
      </Body>
    </Container>
  )
}
