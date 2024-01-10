import TextInput from '~/components/TextInput'
import { ActionGroup, Form, InputContainer, SquareButton } from './style'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { Container } from './style'
import { SubmitHandler, useForm } from 'react-hook-form'
import IFormFields from './IFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './formSchema'
import { ICard } from '~/services/types'
import WithController from '~/components/InputWithController'

interface IProps {
  card: ICard
  onUpdateDescription: (description: string) => void
}

export default function DescriptionInput({
  card,
  onUpdateDescription
}: IProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
    watch
  } = useForm<IFormFields>({
    defaultValues: { description: card.description || '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await onUpdateDescription(data.description)
    reset({ description: data.description })
  }

  const onReset = () => {
    reset({ description: card.description })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <WithController control={control} name="description">
            <TextInput
              label=""
              placeHolder="Add description..."
              sx={{
                maxHeight: '300px',
                backgroundColor: (theme) => theme.palette.gray6.main
              }}
              multiple
              maxRows={4}
              row={3}
            />
          </WithController>
          {isDirty && (
            <div className="limit">{watch('description').length}/200</div>
          )}
        </InputContainer>

        {isDirty && (
          <ActionGroup>
            <SquareButton onClick={onReset}>
              <RiCloseLine />
            </SquareButton>
            <SquareButton color="success" type="submit">
              <RiCheckLine />
            </SquareButton>
          </ActionGroup>
        )}
      </Form>
    </Container>
  )
}
