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
    console.log('nhon nhy', {
      ...filter,
      ...filterOption
    })
    dispatch(
      setFilter({
        ...filter,
        ...filterOption
      })
    )
  }

  const getFilterName = (key: string) => {
    switch (key) {
      case 'assignToMe':
        return 'Assign to me'
      case 'currentSprint':
        return 'Current sprint'
      default:
        return ''
    }
  }

  return (
    <FilterItemsContainer>
      {Object.keys(filter).map(
        (key) =>
          filter[key] && (
            <FilterItem>
              <p className="title__name">{getFilterName(key)}</p>
              <IconButton
                size="small"
                color="warning"
                onClick={() => handleTurnOffFilter({ [key]: false })}>
                <RiCloseLine />
              </IconButton>
            </FilterItem>
          )
      )}
      {/* {filter.assignToMe && (
        <FilterItem>
          <p className="title__name">Assign to me</p>
          <IconButton
            size="small"
            color="warning"
            onClick={() => handleTurnOffFilter({ assignToMe: false })}>
            <RiCloseLine />
          </IconButton>
        </FilterItem>
      )}
      {filter.currentSprint && (
        <FilterItem>
          <p className="title__name">Current sprint</p>
          <IconButton
            size="small"
            color="warning"
            onClick={() => handleTurnOffFilter({ currentSprint: false })}>
            <RiCloseLine />
          </IconButton>
        </FilterItem>
      )} */}
    </FilterItemsContainer>
  )
}
