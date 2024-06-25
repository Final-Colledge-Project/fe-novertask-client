import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Stack,
  Switch,
  Tooltip,
  Typography
} from '@mui/material'
import {
  ColorBox,
  ColorPickerContainer,
  CurrentColorBox,
  Overlay,
  ProvidedColorContainer,
  Section
} from './style'
import { useEffect, useRef, useState } from 'react'
import getAppColor from '~/utils/getAppColor'
import IProps from './IProps'
import { RiAddLine, RiLoopRightLine } from 'react-icons/ri'
import {
  ColorPicker as ColorPickerComponent,
  useColor,
  ColorService,
  IColor
} from 'react-color-palette'
import { COLOR } from '~/utils/constant'

export default function ColorPicker({
  chosenColor,
  onChange,
  open: openProp
}: Readonly<IProps>) {
  const [isCustomizeColor, setIsCustomizeColor] = useState(false)
  const [color, setColor] = useColor(chosenColor || COLOR.BLUE.main)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(openProp || false)

  const originalColor = useRef(chosenColor)

  const changeInputColorMode: () => void = () => {
    setIsCustomizeColor((isCustomizeColor) => !isCustomizeColor)
  }

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    console.log(event.target)
    // if (
    //   anchorRef.current &&
    //   anchorRef.current.contains(event.target as HTMLElement)
    // ) {
    //   return
    // }

    setOpen(false)
  }

  const resetColor = () => {
    setColor(ColorService.convert('hex', originalColor.current) as IColor)
    toggleOpen()
  }

  const saveColor = () => {
    originalColor.current = color.hex
    onChange(color.hex)
    toggleOpen()
  }

  const changeColorInternal = (hexColor: string) => {
    setColor(ColorService.convert('hex', hexColor) as IColor)
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Stack spacing={2} direction="row" alignItems="center">
        <Tooltip title={color.hex} arrow>
          <ColorBox
            $color={originalColor.current}
            className="keep-hover"
            onClick={handleOpen}></ColorBox>
        </Tooltip>
        <Button
          tabIndex={-1}
          onClick={() => setOpen((prev) => !prev)}
          ref={anchorRef}
          aria-controls={open ? 'composition-menu-color-picker' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup={open ? 'true' : undefined}
          startIcon={<RiLoopRightLine />}>
          Change
        </Button>
      </Stack>

      {open && <Overlay onClick={handleClose} />}

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
        }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}>
            <Paper
              sx={{
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 1px var(--mui-palette-gray2-main)'
              }}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <Section>
                    <Typography className="section__title">Preview</Typography>
                    <CurrentColorBox $color={color.hex} />
                    <Typography className="section__title">
                      Custom
                      <Switch
                        size="small"
                        checked={isCustomizeColor}
                        onChange={() => changeInputColorMode()}
                      />
                    </Typography>
                    {!isCustomizeColor && (
                      <ProvidedColorContainer>
                        {getAppColor().map((item: string) => (
                          <ColorBox
                            key={item}
                            $color={item}
                            className={
                              color.hex === item && !isCustomizeColor
                                ? 'chosen'
                                : ''
                            }
                            onClick={() => changeColorInternal(item)}
                          />
                        ))}

                        <ColorBox
                          $color={'#eee'}
                          className={isCustomizeColor ? 'chosen' : ''}
                          onClick={() => setIsCustomizeColor(true)}>
                          <RiAddLine />
                        </ColorBox>
                      </ProvidedColorContainer>
                    )}
                  </Section>
                  {isCustomizeColor && (
                    <ColorPickerContainer>
                      <ColorPickerComponent
                        color={color}
                        onChange={setColor}
                        hideInput={['hsv']}
                        height={80}
                      />
                    </ColorPickerContainer>
                  )}
                  <Stack
                    spacing={2}
                    direction="row"
                    padding={'0 10px 10px'}
                    alignItems="center"
                    justifyContent="end">
                    <Button
                      onClick={resetColor}
                      variant="text"
                      size="small"
                      color="error">
                      Cancel
                    </Button>
                    <Button
                      onClick={saveColor}
                      variant="contained"
                      color="primary"
                      size="small">
                      Save
                    </Button>
                  </Stack>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
