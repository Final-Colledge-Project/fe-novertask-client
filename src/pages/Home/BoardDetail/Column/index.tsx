// component libraries
import { RiAddFill, RiDraggable, RiMore2Fill } from 'react-icons/ri'
import { IconButton } from '@mui/material'

// components
import Card from './Card'
import { CardsContainer, ColumnContainer, Footer, Header } from './styles'

// services
import { IColumn } from '~/services/types'

const Column = ({ column }: { column: IColumn }) => {
  const handleChangeMouseGrabing = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.currentTarget.style.cursor = 'grabbing'
  }
  const handleChangeMouseGrab = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.currentTarget.style.cursor = 'grab'
  }

  return (
    <ColumnContainer>
      <Header>
        <p
          className="icon"
          onMouseDown={handleChangeMouseGrabing}
          onMouseUp={handleChangeMouseGrab}
        >
          <RiDraggable />
        </p>
        <div className="title">
          <p className="name">{column.title}</p>
          <p className="cards-count">{column.cardOrderIds.length}</p>
          <div className="add-task-button">
            <RiAddFill />
          </div>
        </div>
        <IconButton>
          <RiMore2Fill />
        </IconButton>
      </Header>
      {column.cards && column.cards.length > 0 && (
        <CardsContainer>
          {column.cards.map((card) => (
            <Card card={card} key={card._id} />
          ))}
        </CardsContainer>
      )}
      <Footer>Add card</Footer>
    </ColumnContainer>
  )
}
export default Column
