import { RiCloseLine } from 'react-icons/ri'
import { FilterItem, FilterItemsContainer } from './style'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { IFilterOptions, setFilter } from '~/redux/cardSlice'

export default function CurrentFilters() {
  const filter = useSelector((state: StoreType) => state.card.filter)
  const dispatch = useDispatch()

  const handleTurnOffFilter = (filterOption: IFilterOptions) => {
    dispatch(setFilter(filterOption))
  }

  return (
    <FilterItemsContainer>
      {filter.assignToMe && (
        <FilterItem>
          <p className="title__name">Assign to me</p>
          <IconButton
            size="small"
            color="warning"
            onClick={() => handleTurnOffFilter({ assignToMe: false })}
          >
            <RiCloseLine />
          </IconButton>
        </FilterItem>
      )}
    </FilterItemsContainer>
  )
}
