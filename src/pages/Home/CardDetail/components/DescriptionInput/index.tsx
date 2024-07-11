import {
  ActionGroup,
  DescriptionReview,
  InputContainer,
  SquareButton
} from './style'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { Container } from './style'
import { ICard, IDescription } from '~/services/types'
import RichText from '~/components/RichText'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import {
  CARD_DESC_MODE,
  CARD_DESCRIPTION_MAX_LENGTH
} from '~/utils/constant/card'
import { Button } from '@mui/material'

interface IProps {
  card: ICard
  onUpdateDescription: (description: string) => void
  disabled?: boolean
}

export default function DescriptionInput({
  card,
  onUpdateDescription
}: IProps) {
  const [description, setDescription] = useState<IDescription>()
  const [viewMode, setViewMode] = useState<number>(CARD_DESC_MODE.VIEW)

  const onSubmit = async () => {
    if (isOverLength() || (description && description?.content.length < 2))
      return
    await onUpdateDescription(JSON.stringify(description))
    changeMode(CARD_DESC_MODE.VIEW)
  }

  const onReset = () => {
    setDescription(toObject(card.description))
    changeMode(CARD_DESC_MODE.VIEW)
  }

  const handleChangeDesc = (newData: IDescription) => {
    setDescription(newData)
  }

  const toObject = (descriptionStr: string): IDescription => {
    let descriptionObject: IDescription
    try {
      descriptionObject = JSON.parse(descriptionStr)
    } catch (e) {
      descriptionObject = {
        content: descriptionStr,
        formatter: `<p>${descriptionStr}</p>`
      }
    }
    return cloneDeep(descriptionObject)
  }

  const changeMode = (mode: number) => {
    setViewMode(mode)
  }

  const isDirty = () => {
    // if card is have just create => should be added <p> tag
    if (!description || !card) return false
    const descObject = toObject(card.description)

    return (
      descObject.content !== description.content ||
      descObject.formatter !== description.formatter
    )
  }

  const isOverLength = () => {
    return (
      description && description.content.length >= CARD_DESCRIPTION_MAX_LENGTH
    )
  }

  const isViewMode = () => viewMode === CARD_DESC_MODE.VIEW
  const isEditMode = () => viewMode === CARD_DESC_MODE.EDIT

  useEffect(() => {
    const rawDescription = card.description
    if (!rawDescription) setDescription(undefined)
    const descriptionObject = toObject(card.description)
    setDescription(descriptionObject)
  }, [card])

  return (
    <Container>
      {isEditMode() && (
        <div>
          <RichText
            defaultValue={description as IDescription}
            onChange={handleChangeDesc}
            maxLength={7}
          />
          <InputContainer>
            <div className={clsx('limit', isOverLength() && 'over')}>
              {description?.content.length}/{CARD_DESCRIPTION_MAX_LENGTH}
            </div>
            <ActionGroup>
              {isEditMode() && (
                <Button size="small" onClick={onReset} color="error">
                  Cancel
                </Button>
              )}
              {isDirty() && (
                <Button
                  size="small"
                  type="submit"
                  onClick={onSubmit}
                  color="info"
                  variant="contained">
                  Save
                </Button>
              )}
            </ActionGroup>
          </InputContainer>
        </div>
      )}

      {isViewMode() && (
        <DescriptionReview
          className="ql-editor"
          onClick={() => changeMode(CARD_DESC_MODE.EDIT)}
          dangerouslySetInnerHTML={{ __html: description?.formatter as string }}
        />
      )}
    </Container>
  )
}
