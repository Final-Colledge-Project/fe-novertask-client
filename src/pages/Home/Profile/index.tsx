import {
  SideBar,
  Body,
  Container,
  Header,
  VerticalDivider,
  Menu,
  User,
  GeneralAvatar,
  UserDetailInfo,
  GeneralInfo
} from './style'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import GeneralInformation from './GeneralInformation'
import {
  NavLink,
  Outlet,
  Route,
  Routes
} from 'react-router-dom'
import ChangePassword from './ChangePassword'
import clsx from 'clsx'

export default function Profile() {
  const ProfileLayout = (
    <>
      <Outlet />
    </>
  )

  const navItems = [
    {
      label: 'General',
      path: '/u/profile'
    },
    {
      label: 'Change password',
      path: '/u/profile/change-password'
    }
  ]

  const currentUserInfo = useSelector((state: StoreType) => state.auth.userInfo)

  return (
    <Container>
      <Header>
        <h1 className="header-text">Your profile</h1>
      </Header>
      <Body>
        <UserDetailInfo>
          <SideBar>
            <User>
              <GeneralAvatar>
                <img src={currentUserInfo?.avatar} alt="" />
              </GeneralAvatar>
              <GeneralInfo>
                <p className="name">{`${currentUserInfo?.firstName} ${currentUserInfo?.lastName}`}</p>
                <p className="email">{`${currentUserInfo?.email}`}</p>
              </GeneralInfo>
            </User>
            <Menu>
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    clsx('item', isActive && 'item--active')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </Menu>
          </SideBar>
          <VerticalDivider />
          <Routes>
            <Route element={ProfileLayout}>
              <Route index element={<GeneralInformation />} />
              <Route path="general" element={<GeneralInformation />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </UserDetailInfo>
      </Body>
    </Container>
  )
}
