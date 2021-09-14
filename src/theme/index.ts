import {
  mono,
  red,
  green,
  blue,
  primary,
  secondary,
  text,
  link,
  darkGrey,
} from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 576,
    tablet: 767,
  },
  color: {
    mono,
    red,
    green,
    blue,
    primary,
    secondary,
    text,
    link,
    darkGrey,
  },
  fontWeight: {
    thin: 100,
    regular: 300,
    medium: 500,
    strong: 700,
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
  boxShadow: {
    default:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  },
  borderGradient: {
    blueGreen:
      'linear-gradient(#1b1b29, #1b1b29) padding-box, linear-gradient(135deg, #42439d, #53c7e4) border-box',
  },
  backgroundGradient: {
    darkToLight:
    'linear-gradient(225deg, #242436, #1b1b29) padding-box, linear-gradient(157.5deg, #5455c9, #53c7e4) border-box',
  },
  topBarSize: 72,
}

export default theme
