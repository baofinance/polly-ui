import { black, blue, darkGrey, gold, green, grey, red, white } from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 411,
  },
  color: {
    black,
    grey,
    darkGrey,
    primary: {
      light: red[200],
      main: red[200],
    },
    secondary: {
      main: green[100],
    },
    white,
    red,
    blue,
    green,
    gold,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
}

export default theme
