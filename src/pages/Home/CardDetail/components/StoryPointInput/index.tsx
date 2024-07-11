// component libraries
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

// services
import { ActionGroup, SquareButton } from './style'
import { ICard } from '~/services/types'
import { TextField } from '@mui/material'
import { useState } from 'react'

interface IProps {
  card: ICard
  onUpdate: (storyPoint: number) => Promise<void>
  disabled?: boolean
}

export default function StoryPointInput({ card, onUpdate, disabled }: IProps) {
  const [value, setValue] = useState<number>(card.storyPoint)

  const onSubmit = async () => {
    await onUpdate(value)
    setValue(value)
  }

  const onReset = () => {
    setValue(card.storyPoint || 0)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith('0')) {
      setValue(Number(e.target.value.replace(/^0/, '')))
    } else {
      setValue(e.target.valueAsNumber)
    }
  }

  const isDirty = () => {
    if (card.storyPoint) {
      return card.storyPoint !== value
    } else {
      return !!value
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <TextField
        fullWidth
        inputProps={{ type: 'number', min: 0 }}
        value={value ?? null}
        onChange={onChange}
        size="small"
        disabled={disabled}
      />
      {isDirty() && (
        <ActionGroup>
          <SquareButton onClick={onReset}>
            <RiCloseLine />
          </SquareButton>
          <SquareButton color="success" type="submit" onClick={onSubmit}>
            <RiCheckLine />
          </SquareButton>
        </ActionGroup>
      )}
    </div>
  )
}
