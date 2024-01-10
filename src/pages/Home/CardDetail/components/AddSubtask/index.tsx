import { SubmitHandler, useForm } from 'react-hook-form'
import TextInput from '~/components/TextInput'
import IFormFields from './IFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import {
  ActionGroup,
  Form,
  Layer,
  Loading,
  MenuBody,
  MenuGeneralContainer,
  MenuHeader,
  SquareButton
} from './style'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import WithController from '~/components/InputWithController'
// component libraries
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { IconButton, Typography } from '@mui/material'
import { RiAddLine } from 'react-icons/ri'
import { useRef, useState } from 'react'
import { createSubtask } from '~/services/subtaskService'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export default function AddSubtask({
  cardId,
  onRefresh
}: {
  cardId: string
  onRefresh: () => void
}) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
    handleReset()
  }

  const { handleSubmit, reset, control } = useForm<IFormFields>({
    defaultValues: { title: '' },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    setIsSubmitting(true)
    try {
      const res = await createSubtask({ name: data.title, cardId })
      console.log(res)
      if (res && res.data) {
        console.log(true)
        setOpen(false)
        handleReset()
        onRefresh()
      }
    } catch (error) {
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })
    }
    setIsSubmitting(false)
  }

  const handleReset = () => {
    reset({ title: '' })
  }
  return (
    <div>
      <Layer className={open ? 'open' : ''} onClick={handleClose} />
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="glass-effect"
        sx={{
          height: '22px',
          width: '22px',
          padding: '2px',
          minWidth: '0',
          fontSize: '18px',
          bgcolor: `rgba(var(--mui-palette-blue-mainChannel)/ 0.2)`,
          color: (theme) => theme.palette.blue.main
        }}
      >
        <RiAddLine />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="top-end"
        transition
        disablePortal
        sx={{
          position: 'relative',
          zIndex: 100
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 1px var(--mui-palette-gray2-main)'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuGeneralContainer>
                  <MenuHeader>
                    <Typography>
                      Add subtask
                      {isSubmitting && <Loading />}
                    </Typography>
                    <IconButton size="small" onClick={handleClose}>
                      <RiCloseLine />
                    </IconButton>
                  </MenuHeader>
                  <MenuBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <WithController control={control} name="title">
                        <TextInput label="" sx={{ height: '30px' }} autoFocus />
                      </WithController>
                      <ActionGroup>
                        <SquareButton onClick={handleReset}>
                          <RiCloseLine />
                        </SquareButton>
                        <SquareButton color="success" type="submit">
                          <RiCheckLine />
                        </SquareButton>
                      </ActionGroup>
                    </Form>
                  </MenuBody>
                </MenuGeneralContainer>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
