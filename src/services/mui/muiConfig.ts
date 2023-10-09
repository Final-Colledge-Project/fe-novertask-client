// Using this API can help avoiding dark-mode flickering (if needed)
// https://mui.com/material-ui/experimental-api/css-theme-variables/overview/#advantages
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { COLOR } from '~/utils/constant'

type colorType = { main: string }
interface colorConcept {
  blue: colorType
  red: colorType
  orange: colorType
  yellow: colorType
  green: colorType
  mint: colorType
  teal: colorType
  cyan: colorType
  indigo: colorType
  purple: colorType
  pink: colorType
  brown: colorType
  gray: colorType
  black: colorType
  white: colorType
  gray2: colorType
  gray3: colorType
  gray4: colorType
  gray5: colorType
  gray6: colorType
}
declare module '@mui/material/styles' {
  interface PaletteOptions extends colorConcept {}
  interface Palette extends colorConcept {}
}
// A custom theme for this app
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        blue: COLOR.BLUE,
        pink: COLOR.PINK,
        red: COLOR.RED,
        orange: COLOR.ORANGE,
        yellow: COLOR.YELLOW,
        green: COLOR.GREEN,
        mint: COLOR.MINT,
        teal: COLOR.TEAL,
        cyan: COLOR.CYAN,
        indigo: COLOR.INDIGO,
        purple: COLOR.PURPLE,
        brown: COLOR.BROWN,
        gray: COLOR.GRAY,
        gray2: COLOR.GRAY2,
        gray3: COLOR.GRAY3,
        gray4: COLOR.GRAY4,
        gray5: COLOR.GRAY5,
        gray6: COLOR.GRAY6,
        black: COLOR.BLACK,
        white: COLOR.WHITE,
        primary: {
          main: COLOR.BLUE.main
        },
        secondary: {
          main: COLOR.CYAN.main
        },
        success: {
          main: COLOR.GREEN.main
        },
        warning: {
          main: COLOR.ORANGE.main
        },
        error: {
          main: COLOR.PINK.main
        },
        info: {
          main: COLOR.BLUE.main
        }
      }
    },
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            transition: 'background-color linear 0.2s'
          },
          '*::-webkit-scrollbar-thumb:hover': {}
        },
        '*': {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0'
        },
        button: {
          border: 'none',
          '&:focus, &:focus-visible': {
            outline: 'none'
          },
          '&:hover': {
            border: 'none'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none',
          fontWeight: 'normal',
          boxShadow: 'none',
          borderRadius: '8px',
          borderWidth: '1px',
          '&:focus, :focus-visible': {
            outline: 'none'
          },
          '&:hover': {}
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderWidth: '1px',
          // borderColor: theme.palette.primary.main,
          fontSize: '0.875rem',
          borderRadius: '8px'
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.light,
          //     borderWidth: '2px'
          //   }
          // }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.gray.main
        })
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            borderRadius: '8px',
            backgroundColor: theme.palette.white.main
          }
        }
      }
    }
  }
})

export default theme
