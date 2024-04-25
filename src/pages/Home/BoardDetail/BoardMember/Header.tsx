import clsx from 'clsx'
import { RightMenu, StyledHeader, ViewTypeItem, ViewTypeMenu } from './style'
import { ChangeEvent, useState } from 'react'
import { BOARD_MEMBER_ROLE_TITLES } from '~/utils/constant/board'
import SearchBox from '~/components/SearchBox'
import { Button } from '@mui/material'
import { RiUserAddLine } from 'react-icons/ri'
import { IHeaderProps } from './IProps'
import { useDebounceCallback } from 'usehooks-ts'

export default function Header({
  onRoleChange,
  count,
  searchTerm,
  setSearchTerm,
  onStartSearch,
  onOpenAddMemberPopup,
  shouldShowAddMemberButton
}: IHeaderProps) {
  const [viewType, setViewType] = useState<number>(0)

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)

    // start search process
    onStartSearch(true)
  }

  const debounced = useDebounceCallback(handleChangeSearch, 500)

  const handleChangeRole = (roleIndex: number) => {
    setViewType(roleIndex)
    onRoleChange(roleIndex)
  }

  return (
    <StyledHeader>
      {/* Role filter */}
      <ViewTypeMenu>
        {BOARD_MEMBER_ROLE_TITLES.map((type, index) => (
          <ViewTypeItem
            className={clsx(viewType === index && 'index')}
            onClick={() => handleChangeRole(index)}
            key={type}>
            {/* role label*/}
            <span>{BOARD_MEMBER_ROLE_TITLES[index]}</span>

            {/* role count */}
            {viewType === index && (
              <span className="current-item-count">{count}</span>
            )}
          </ViewTypeItem>
        ))}
      </ViewTypeMenu>

      <RightMenu>
        {/* Add member button */}
        <div style={{ flexShrink: 0 }}>
          {shouldShowAddMemberButton && (
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={onOpenAddMemberPopup}
              startIcon={<RiUserAddLine />}>
              Add or edit member
            </Button>
          )}
        </div>
        {/* Search member */}
        <SearchBox
          label=""
          sx={{ height: '30px' }}
          onChange={debounced}
          value={searchTerm}
        />
      </RightMenu>
    </StyledHeader>
  )
}
