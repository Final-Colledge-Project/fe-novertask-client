import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiFolderAddLine, RiMore2Fill } from 'react-icons/ri'
import IWSItemProps from './IWSItemProps'
import {
  Badge,
  CreatedDate,
  Item,
  ItemCover,
  MoreButton,
  TargetDate,
  Title
} from './styles'
import { BsPerson } from 'react-icons/bs'
import convertDate from '~/utils/convertDate'

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  // clean up members list -> avoid dupicates
  const count = [...data.memberIds, ...data.ownerIds].filter(
    (member, index, all) => index === all.findIndex((obj) => obj === member)
  ).length

  return (
    <Item $img={data.cover as string}>
      <ItemCover className="section">
        <img src={data.cover} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </ItemCover>
      <Title className="section">
        <p>{data.title}</p>
      </Title>
      <div className="section">
        <Badge className={data.type}>{data.type}</Badge>
      </div>
      <div className="section">
        <div className="member-count">
          <BsPerson />
          <p>{count}</p>
        </div>
      </div>
      {data.createdAt ? (
        <CreatedDate className="section">
          <RiFolderAddLine />
          <p>{convertDate(data.createdAt)}</p>
        </CreatedDate>
      ) : (
        <div></div>
      )}
      {data.dueDate ? (
        <TargetDate className="section">
          <RiFlagLine />
          <p>{convertDate(data.dueDate)}</p>
        </TargetDate>
      ) : (
        <div></div>
      )}

      <MoreButton className="section">
        <IconButton>
          <RiMore2Fill />
        </IconButton>
      </MoreButton>
    </Item>
  )
}
export default WorkSpaceItem
