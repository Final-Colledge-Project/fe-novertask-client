import { IconButton } from '@mui/material'
import { RiMoreFill } from 'react-icons/ri'
import SearchBox from '~/components/SearchBox'
import { StyledHeader } from './style'

const Header = ({ title }: { title: string }) => {
  return (
    <StyledHeader className="header">
      <h2 className="name">{title}</h2>
      <div className="search-box">
        <SearchBox label="" />
      </div>
      <div className="more-icon">
        <IconButton aria-label="">
          <RiMoreFill />
        </IconButton>
      </div>
    </StyledHeader>
  )
}

export default Header
