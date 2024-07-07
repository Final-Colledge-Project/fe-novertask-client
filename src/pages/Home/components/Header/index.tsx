import {
  Breadcrumbs,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@mui/material'
import { RiMore2Fill } from 'react-icons/ri'
/* import SearchBox from '~/components/SearchBox' */
import { StyledHeader } from './style'
import React, { useState } from 'react'
import WSViewMenu from '../WSViewMenu'
import {
  generatePath,
  matchPath,
  useNavigate,
  useParams
} from 'react-router-dom'
import allRoutes from '~/utils/routes'
import { TITLE } from '~/utils/constant/common'

const Header = ({
  title,
  items
}: {
  title: string
  items: { title: string; onChoose: () => void }[]
}) => {
  const [open, setOpen] = useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const isTaskView = () =>
    matchPath(allRoutes.home.workspace.workspaceDetail.path, location.pathname)
  const isMemberView = () =>
    matchPath(allRoutes.home.workspace.workspaceMember.path, location.pathname)
  const isOverviewView = () =>
    matchPath(
      allRoutes.home.workspace.workspaceOverview.path,
      location.pathname
    )
  const isSettingsView = () =>
    matchPath(
      allRoutes.home.workspace.workspaceSettings.path,
      location.pathname
    )

  /*
    Render title breadcrumb for each view
  */
  const renderBreadcrumbTitle = () => {
    if (isTaskView()) return TITLE.workspace.workspaceDetail
    else if (isMemberView()) return TITLE.workspace.workspaceMember
    else if (isOverviewView()) return TITLE.workspace.workspaceOverview
    else if (isSettingsView()) return TITLE.workspace.workspaceSettings
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const navigateToCurrentWS = () => {
    const nextPath = generatePath(
      allRoutes.home.workspace.workspaceDetail.segment,
      {
        workspaceId: id as string
      }
    )
    navigate(nextPath)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <StyledHeader className="header">
      <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%' }}>
        <h2 className="workspace-name" onClick={navigateToCurrentWS}>
          {title}
        </h2>
        {renderBreadcrumbTitle() && <div>{renderBreadcrumbTitle()}</div>}
      </Breadcrumbs>
      {/* <div className="search-box">
        <SearchBox label="" />
      </div> */}
      <WSViewMenu />
      <div className="more-icon">
        {/* <IconButton aria-label=""></IconButton> */}
        <div>
          <Button
            variant="text"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="glass-effect"
            sx={{
              height: '35px',
              width: '35px',
              padding: '0',
              minWidth: '0'
            }}>
            <RiMore2Fill />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            sx={{
              position: 'relative',
              zIndex: 100
            }}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-end' ? 'right top' : 'left bottom'
                }}>
                <Paper sx={{ borderRadius: '8px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      sx={{ borderRadius: '8px' }}>
                      {items?.map((item) => (
                        <MenuItem
                          key={item.title}
                          onClick={(e) => {
                            item.onChoose()
                            handleClose(e)
                          }}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </StyledHeader>
  )
}

export default Header
