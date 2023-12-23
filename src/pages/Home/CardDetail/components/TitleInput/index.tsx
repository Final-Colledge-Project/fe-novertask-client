import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'

// component libraries
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

// services
import { ActionGroup, Error, Form, Input, SquareButton } from './style'
import { ICard } from '~/services/types'
import IFormFields from './IFormFields'
import schema from './formSchema'

interface IProps {
  card: ICard
  onUpdateTitle: (title: string) => Promise<void>
}

export default function TitleInput({ card, onUpdateTitle }: IProps) {
  const {
    handleSubmit,
    register,
    reset,
    getFieldState,
    formState: { isDirty: isFormDirty }
  } = useForm<IFormFields>({
    defaultValues: { title: card.title },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await onUpdateTitle(data.title)
    reset({ title: data.title })
  }

  const onReset = () => {
    reset({ title: card.title })
  }

  const { isDirty, error } = getFieldState('title')

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        {...register('title')}
        className={clsx(error && 'error', isDirty && 'dirty')}
      ></Input>
      {isFormDirty && (
        <ActionGroup>
          <Error>{getFieldState('title').error?.message}</Error>
          <SquareButton onClick={onReset}>
            <RiCloseLine />
          </SquareButton>
          <SquareButton color="success" type="submit">
            <RiCheckLine />
          </SquareButton>
        </ActionGroup>
      )}
    </Form>
  )
}
