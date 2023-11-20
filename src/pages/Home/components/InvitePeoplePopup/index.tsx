import { IconButton, Tooltip, Button } from '@mui/material'
import { Container, Form, Header, Modal } from './styles'
import { RiCloseFill, RiInformationLine } from 'react-icons/ri'
import { SubmitHandler, useForm } from 'react-hook-form'
import IFormFields from './IFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './formSchema'
import WithController from '~/components/InputWithController'
import TextInput from '~/components/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { sendInvitation } from '~/services/inviteService'
import { enqueueSnackbar } from 'notistack'
import { setPopupInvitePeople } from '~/redux/popupSlice'
import clsx from 'clsx'
import { StoreType } from '~/redux'

const InvitePeoplePopup = ({ wsID }: { wsID: string }) => {
  const { control, handleSubmit, reset } = useForm<IFormFields>({
    defaultValues: { email: undefined },
    mode: 'onBlur',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      dispatch(showLoading())
      const res = await sendInvitation({ email: data.email, wsID })
      if (res) {
        enqueueSnackbar(`Sent invitation to ${data.email} successfully!`, {
          variant: 'success'
        })
      }
    } catch (err) {
      console.log(
        '✨ ~ file: index.tsx:21 ~ constonSubmit:SubmitHandler<IFormFields>= ~ err:',
        err
      )
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    reset()
    dispatch(setPopupInvitePeople(false))
  }

  const { PopupInvite } = useSelector((state: StoreType) => state.popup)

  return (
    <Container
      onClick={(e) => handleClose(e)}
      className={clsx(!PopupInvite && 'hidden')}
    >
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <div className="title">
            <p>Invite people to workspace</p>
            <Tooltip
              arrow
              title={'Accepted people will become workspace member'}
            >
              <div className="icon">
                <RiInformationLine />
              </div>
            </Tooltip>
          </div>
          <IconButton onClick={(e) => handleClose(e)}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <WithController control={control} name="email">
            <TextInput label="User email address" />
          </WithController>
          <div className="button-group">
            <Button
              variant="text"
              color="error"
              onClick={(e) => handleClose(e)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Send invitation
            </Button>
          </div>
        </Form>
      </Modal>
    </Container>
  )
}

export default InvitePeoplePopup
