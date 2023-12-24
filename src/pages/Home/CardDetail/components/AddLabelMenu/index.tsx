import * as React from 'react'
import { cloneDeep, uniqBy, forOwn } from 'lodash'
import { useDispatch } from 'react-redux'
import { ColorPicker, useColor, ColorService } from 'react-color-palette'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'

// component libraries
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { Button, IconButton, Radio, Switch, Typography } from '@mui/material'
import {
  RiAddLine,
  RiArrowLeftSLine,
  RiCloseLine,
  RiEditLine
} from 'react-icons/ri'

// component props
import 'react-color-palette/css'
import {
  Actions,
  ColorBox,
  ColorPickerContainer,
  Divider,
  ItemContainer,
  Label,
  LabelCreatorBody,
  LabelCreatorContainer,
  LabelReviewContainer,
  LabelSelectContainer,
  Layer,
  Loading,
  MenuBody,
  MenuFooter,
  MenuGeneralContainer,
  MenuHeader,
  ProvidedColorContainer,
  Section
} from './style'
import TextInput from '~/components/TextInput'

// services
import { IProps } from './IProps'
import {
  getAllByBoard,
  createLabel as createOneLabel,
  updateLabel as updateOnLabel
} from '~/services/labelService'
import { ILabel } from '~/services/types'
import { COLOR } from '~/utils/constant'
import { setShouldRefreshBoardDetail } from '~/redux/boardSlice'

export default function AddLabelMenu({
  onChoose,
  boardId,
  card,
  refreshCard,
  isAdmin
}: IProps) {

  const MODES = {
    select: 'select',
    edit: 'edit',
    create: 'create'
  }

  const dispatch = useDispatch()
  const [mode, setMode] = React.useState<string>(MODES.select)

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false)
  const [labels, setLabels] = React.useState<ILabel[]>()
  const [createdLabel, setCreatedLabel] =
    React.useState<string>('Title of label')
  const [chosenColor, setChosenColor] = React.useState<string>(COLOR.GRAY.main)

  const [color, setColor] = useColor(COLOR.BLUE.main)

  const [isCustomizeColor, setIsCustomizeColor] = React.useState<boolean>(false)
  const [editedLabel, setEditedLabel] = React.useState<ILabel>()

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
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const getAllLabel = async () => {
    try {
      const res = await getAllByBoard({ boardId })
      if (res && res.data) {
        setLabels(res.data)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, {
        variant: 'error'
      })
    }
  }

  const handleUpdateLabelOfCard = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsUpdating(true)
    const isChecked = e.target.checked
    if (isChecked) {
      await onChoose(e.target.value, 'add')
    } else {
      await onChoose(e.target.value, 'remove')
    }
    setIsUpdating(false)
  }

  React.useEffect(() => {
    getAllLabel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeLabelText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === MODES.create) {
      setCreatedLabel(e.target.value)
    } else {
      setEditedLabel((prev) => {
        const newLabel = cloneDeep(prev)
        newLabel.name = e.target.value
        return newLabel
      })
    }
  }

  const providedColors = React.useMemo(() => {
    let colors: { color: string }[] = []
    forOwn(COLOR, (value: { main: string }, _key: string) => {
      colors.push({ color: value.main })
    })
    if (labels && labels.length > 0) {
      labels.forEach((item) => {
        colors.push({ color: item.color })
      })
      colors = uniqBy(colors, 'color')
    }
    return colors
  }, [labels])

  const handleChooseProvidedColor = (color: string) => {
    setChosenColor(color)
  }

  const createLabel = async () => {
    if (createdLabel.length < 2 || createdLabel.length > 20) {
      enqueueSnackbar('Label name should be in 2~20 characters', {
        variant: 'error'
      })
      return
    }
    try {
      const res = await createOneLabel({
        boardId,
        name: createdLabel,
        color: isCustomizeColor ? color.hex : chosenColor
      })
      if (res && res.data) {
        setLabels((prev) => {
          const newLabels: ILabel[] = cloneDeep(prev)
          newLabels.push(res.data)
          return newLabels
        })
        dispatch(setShouldRefreshBoardDetail(true))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const updateLabel = async () => {
    if (
      (editedLabel?.name?.length ?? 0) < 2 ||
      (editedLabel?.name?.length ?? 0) > 20
    ) {
      enqueueSnackbar('Label name should be in 2~20 characters', {
        variant: 'error'
      })
      return
    }
    try {
      const res = await updateOnLabel({
        labelId: editedLabel?._id as string,
        changes: {
          name: editedLabel?.name as string,
          color: isCustomizeColor ? color.hex : chosenColor
        }
      })
      if (res && res.data) {
        setLabels((prev) => {
          const newLabels: ILabel[] = cloneDeep(prev)
          newLabels.map((label) => {
            return label._id === res.data._id ? { ...res.data } : { ...label }
          })
          if (res.data._id === card.label._id) {
            refreshCard()
          }

          return newLabels
        })
        dispatch(setShouldRefreshBoardDetail(true))
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const handleCreateOrEditLabel = async () => {
    setIsUpdating(true)
    if (mode === MODES.create) {
      await createLabel()
    } else {
      await updateLabel()
      await getAllLabel()
    }
    setIsUpdating(false)
    setMode(MODES.select)
  }

  const convertColor = (newColor: string) => {
    return ColorService.convert('hex', newColor)
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
        <RiEditLine />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
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
                    <Typography fontWeight={700}>
                      {(mode === MODES.create || mode == MODES.edit) && (
                        <IconButton
                          size="small"
                          onClick={() => setMode(MODES.select)}
                        >
                          <RiArrowLeftSLine />
                        </IconButton>
                      )}
                      {mode === MODES.select ? 'Labels' : 'Add or edit label'}{' '}
                      {isUpdating && <Loading />}
                    </Typography>
                    <IconButton size="small" onClick={(e) => handleClose(e)}>
                      <RiCloseLine />
                    </IconButton>
                  </MenuHeader>
                  <MenuBody>
                    {mode === MODES.select && (
                      <LabelSelectContainer>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          sx={{
                            borderRadius: '8px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            minWidth: '200px',
                            paddingY: '0',
                            width: '100%'
                          }}
                        >
                          {labels?.map((label) => (
                            <MenuItem
                              key={label._id}
                              sx={{
                                '&:hover': {
                                  bgcolor: (theme) => theme.palette.white.main
                                },
                                p: '0',
                                borderRadius: '0px'
                              }}
                            >
                              <ItemContainer>
                                <Radio
                                  onChange={handleUpdateLabelOfCard}
                                  value={label._id}
                                  checked={label._id === card.label?._id}
                                />
                                <Label $color={label.color}>{label.name}</Label>
                                {isAdmin && (
                                  <IconButton
                                    size="small"
                                    className="edit-icon"
                                    onClick={() => {
                                      setEditedLabel(label)
                                      setMode(MODES.edit)
                                      setColor(() => {
                                        return convertColor(label.color)
                                      })
                                      setChosenColor(label.color)
                                    }}
                                  >
                                    <RiEditLine />
                                  </IconButton>
                                )}
                              </ItemContainer>
                            </MenuItem>
                          ))}
                        </MenuList>
                        {isAdmin && (
                          <MenuFooter>
                            <Button
                              startIcon={<RiAddLine />}
                              fullWidth
                              onClick={() => {
                                setMode(MODES.create)
                                setColor(convertColor(COLOR.BLUE.main))
                              }}
                            >
                              Add more label
                            </Button>
                          </MenuFooter>
                        )}
                      </LabelSelectContainer>
                    )}
                    <Divider />
                    {(mode === MODES.create || mode === MODES.edit) && (
                      <LabelCreatorContainer>
                        <LabelCreatorBody>
                          <LabelReviewContainer>
                            <Label
                              $color={
                                isCustomizeColor ? color.hex : chosenColor
                              }
                            >
                              {mode === MODES.edit
                                ? editedLabel?.name
                                : createdLabel || 'Title'}
                            </Label>
                          </LabelReviewContainer>
                          <Section>
                            <p className="section__title">Title of label</p>
                            <TextInput
                              label=""
                              value={
                                mode === MODES.create
                                  ? createdLabel
                                  : editedLabel?.name
                              }
                              onChange={handleChangeLabelText}
                              placeHolder="Title of label"
                              sx={{ height: '40px' }}
                            ></TextInput>
                          </Section>
                          <Section>
                            <Typography className="section__title">
                              Custom
                              <Switch
                                size="small"
                                checked={isCustomizeColor}
                                onChange={(e) => {
                                  setIsCustomizeColor(e.target.checked)
                                  if (mode === MODES.edit) {
                                    setColor(() => {
                                      return convertColor(chosenColor)
                                    })
                                  }
                                }}
                              />
                            </Typography>
                            {!isCustomizeColor && (
                              <ProvidedColorContainer>
                                {providedColors.map((item) => (
                                  <ColorBox
                                    $color={item.color}
                                    className={
                                      chosenColor === item.color &&
                                      !isCustomizeColor
                                        ? 'chosen'
                                        : ''
                                    }
                                    onClick={() =>
                                      handleChooseProvidedColor(item.color)
                                    }
                                  />
                                ))}

                                <ColorBox
                                  $color={'#eee'}
                                  className={isCustomizeColor ? 'chosen' : ''}
                                  onClick={() => setIsCustomizeColor(true)}
                                >
                                  <RiAddLine />
                                </ColorBox>
                              </ProvidedColorContainer>
                            )}
                          </Section>
                          {isCustomizeColor && (
                            <ColorPickerContainer>
                              <ColorPicker
                                color={color}
                                onChange={setColor}
                                hideInput={['hsv']}
                                height={80}
                              />
                            </ColorPickerContainer>
                          )}
                          <Actions>
                            <Button
                              fullWidth
                              color="error"
                              variant="outlined"
                              disabled={isUpdating}
                              onClick={() => setMode(MODES.select)}
                            >
                              Cancel
                            </Button>
                            <Button
                              disabled={isUpdating}
                              fullWidth
                              color="primary"
                              variant="contained"
                              onClick={handleCreateOrEditLabel}
                            >
                              Save
                            </Button>
                          </Actions>
                        </LabelCreatorBody>
                      </LabelCreatorContainer>
                    )}
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
