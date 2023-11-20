import SearchBox from '~/components/SearchBox'
import {
  FilterSection,
  LineTitle,
  LineTitleItem,
  MemberPart,
  Members,
  MembersSummary,
  ProjectBoard,
  ProjectContainer,
  ProjectSection,
  ProjectSummary,
  Summary,
  Title,
  Total,
  WorkSpaceDetailContainer
} from './style'
import { RiArrowUpSLine, RiMoreFill } from 'react-icons/ri'
import IconButton from '@mui/material/IconButton'
import {
  Avatar,
  AvatarGroup,
  Button,
  Tooltip,
  TooltipProps,
  styled
} from '@mui/material'
import BlockItem from './components/BlockProjectItem'
import LineItem from './components/LineProjectItem'
import { setPopupAddPJ, setPopupInvitePeople } from '~/redux/popupSlice'
import { useDispatch } from 'react-redux'
import { StoreDispatchType } from '~/redux'
import ToggleViewButton from '../components/ToggleViewButton'
import { useState } from 'react'
import ColumnMenu from './components/ColumnMenu'

const AdminTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: #ffcc02;
  }

  & .MuiTooltip-arrow {
    /* top: -10px !important; */
    &::before {
      background: #ffcc02;
    }
  }
`

const WorkSpaceDetails = () => {
  const dispatch = useDispatch<StoreDispatchType>()

  const [viewType, setViewType] = useState<'list' | 'block'>('block')
  const [viewState, setViewState] = useState<{
    pageSize: number
    page: number
    sortBy: 'name' | 'createdAt' | 'dueDate' | undefined
    isAsc: boolean
  }>({
    pageSize: 5,
    page: 1,
    sortBy: undefined,
    isAsc: true
  })

  const handleShowAddPJPopup = () => {
    dispatch(setPopupAddPJ(true))
  }

  const handleShowPopupInvite = () => {
    dispatch(setPopupInvitePeople(true))
  }

  const handleChangeViewType = (viewType: 'list' | 'block') => {
    setViewType(viewType)
  }

  const handleChangeSort = (toSortBy: 'name' | 'createdAt' | 'dueDate') => {
    const fromSortBy = viewState.sortBy
    const fromSortType = viewState.isAsc
    setViewState((prev) => {
      const newState = { ...prev }
      newState.sortBy = toSortBy
      if (fromSortBy !== toSortBy) {
        newState.isAsc = true
      } else {
        if (!fromSortType) {
          newState.isAsc = false
        }
        newState.isAsc = !fromSortType
      }
      return newState
    })
  }

  return (
    <WorkSpaceDetailContainer>
      <div className="header">
        <h2 className="name">workspace name</h2>
        <div className="search-box">
          <SearchBox label="" />
        </div>
        <div className="more-icon">
          <IconButton aria-label="">
            <RiMoreFill />
          </IconButton>
        </div>
      </div>

      <Summary>
        <ProjectSummary>
          <div className="header">
            <p className="title">Projects</p>
            <Button
              variant="contained"
              color="primary"
              sx={{ p: '2px 8px' }}
              onClick={() => handleShowAddPJPopup()}
            >
              Create new
            </Button>
          </div>
          <Total>
            <div className="count">6</div>
            <div className="label">Total</div>
          </Total>
        </ProjectSummary>
        <MembersSummary>
          <div className="header">
            <p className="title">Members</p>
            <Button variant="text" color="primary" sx={{ p: '2px 8px' }}>
              See all
            </Button>
          </div>
          <div className="content">
            <Total>
              <div className="count">9</div>
              <div className="label">Total</div>
            </Total>
            <div className="image-group">
              <Members>
                <MemberPart>
                  <div className="label">Admins</div>
                  <AvatarGroup
                    max={4}
                    sx={{
                      ml: '8px',
                      // flexDirection: 'row',
                      '& .MuiAvatar-root': {
                        width: '35px',
                        height: '35px',
                        ml: '-8px'
                      },
                      '& .MuiAvatar-root:last-child': {
                        ml: '-8px'
                      }
                    }}
                  >
                    <AdminTooltip title="Super admin: Liliana" arrow>
                      <Avatar
                        alt="Admin"
                        src={'/img/Annie.jpg'}
                        sx={{
                          '&.MuiAvatar-root': {
                            // order: 2,
                            border: (theme) =>
                              `3px solid ${theme.palette.yellow.main} !important`
                          }
                        }}
                      />
                    </AdminTooltip>
                    <Avatar alt="Leader" src={'/img/Beckam.png'} />
                    <Avatar alt="Quan que" src={'/img/Flo.jpg'} />
                  </AvatarGroup>
                </MemberPart>
                <MemberPart>
                  <div className="label">Members</div>
                  <AvatarGroup
                    max={5}
                    sx={{
                      ml: '8px',
                      flexDirection: 'row',
                      '& .MuiAvatar-root': {
                        width: '35px',
                        height: '35px',
                        ml: '-8px'
                      },

                      '& .MuiAvatar-root:first-child': {
                        order: 3,
                        fontSize: '14px'
                        // bgcolor: (theme) => theme.palette.gray5.main,
                        // color: (theme) => theme.palette.gray.main
                      },
                      '& .MuiAvatar-root:last-child': {
                        ml: '-8px'
                      }
                    }}
                  >
                    <Avatar alt="Admin" src={'/img/Kente.jpg'} />
                    <Avatar alt="Leader" src={'/img/Beckam.png'} />
                    <Avatar alt="Quan que" src={'/img/Annie.jpg'} />
                    <Avatar alt="Quan que" src={'/img/avatar.jpg'} />
                    <Avatar alt="Quan que" src={'/img/Flo.jpg'} />
                    <Avatar alt="Quan que" src={'/img/Flo.jpg'} />
                  </AvatarGroup>
                </MemberPart>
              </Members>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<img className="icon" src="/img/plane_2.png" alt="" />}
                onClick={handleShowPopupInvite}
                sx={{
                  '&.MuiButton-root': {
                    backgroundImage:
                      'linear-gradient(45deg, #0B84FF -15.23%, #0040DD 102.22%);'
                  }
                }}
              >
                Invite new people
              </Button>
            </div>
          </div>
        </MembersSummary>
      </Summary>

      <ProjectSection>
        <Title>
          <p>Projects</p>
          <FilterSection>
            <SearchBox
              label=""
              sx={{ height: '35px', width: 'auto' }}
              placeHolder="Search"
            />
            <ColumnMenu />
            <ToggleViewButton onChange={handleChangeViewType} />
          </FilterSection>
        </Title>
        {/* <WorkSpaceSummary data={{ id: '123', title: 'title', projects: [] }} /> */}
        <ProjectBoard $display={viewType}>
          {viewType === 'list' ? (
            <LineTitle>
              <LineTitleItem></LineTitleItem>
              <LineTitleItem
                active={viewState.sortBy === 'name'}
                isAsc={viewState.sortBy === 'name' ? viewState.isAsc : true}
                onClick={() => handleChangeSort('name')}
              >
                <p>Name</p>
                <div className="icon">
                  <IconButton aria-label="sort">
                    <RiArrowUpSLine />
                  </IconButton>
                </div>
              </LineTitleItem>
              <LineTitleItem>Members</LineTitleItem>
              <LineTitleItem className="center">Estimation</LineTitleItem>
              <LineTitleItem
                className="center"
                active={viewState.sortBy === 'createdAt'}
                isAsc={
                  viewState.sortBy === 'createdAt' ? viewState.isAsc : true
                }
                onClick={() => handleChangeSort('createdAt')}
              >
                <p>Created at</p>
                <div className="icon">
                  <IconButton aria-label="sort">
                    <RiArrowUpSLine />
                  </IconButton>
                </div>
              </LineTitleItem>
              <LineTitleItem
                className="center"
                active={viewState.sortBy === 'dueDate'}
                isAsc={viewState.sortBy === 'dueDate' ? viewState.isAsc : true}
                onClick={() => handleChangeSort('dueDate')}
              >
                <p>Due date</p>
                <div className="icon">
                  <IconButton aria-label="sort">
                    <RiArrowUpSLine />
                  </IconButton>
                </div>
              </LineTitleItem>
              <LineTitleItem></LineTitleItem>
            </LineTitle>
          ) : (
            <></>
          )}
          <ProjectContainer $display={viewType === 'list' ? 'flex' : 'grid'}>
            {viewType === 'list' ? (
              <>
                <LineItem
                  data={{
                    name: 'project title is really long luon a choi oi choi, dai gi ma dai du vay',
                    cover: '/img/item-cover-1.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: '16/11/2023',
                    createdAt: '10/11/2023',
                    members: [{ img: '/img/avatar.jpg' }]
                  }}
                />

                <LineItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-24.png',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <LineItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-3.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <LineItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-4.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <LineItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-5.jpg',
                    totalTask: 1,
                    completeTask: 0,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <LineItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-6.png',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
              </>
            ) : (
              <>
                <BlockItem
                  data={{
                    name: 'project title is really long luon a choi oi choi, dai gi ma dai du vay',
                    cover: '/img/item-cover-1.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: '16/11/2023',
                    createdAt: '10/11/2023',
                    members: [{ img: '/img/avatar.jpg' }]
                  }}
                />

                <BlockItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-24.png',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <BlockItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-3.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <BlockItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-4.jpg',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <BlockItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-5.jpg',
                    totalTask: 1,
                    completeTask: 0,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
                <BlockItem
                  data={{
                    name: 'project',
                    cover: '/img/item-cover-6.png',
                    totalTask: 1,
                    completeTask: 1,
                    target: null,
                    members: [{ img: '/' }]
                  }}
                />
              </>
            )}
          </ProjectContainer>
        </ProjectBoard>
      </ProjectSection>
    </WorkSpaceDetailContainer>
  )
}

export default WorkSpaceDetails
