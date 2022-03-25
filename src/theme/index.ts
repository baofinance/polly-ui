import {
  accent,
  blue,
  darkGrey,
  green,
  monochrome,
  primary,
  red,
  secondary,
  text,
  transparent,
} from './colors'

const theme = () => ({
  borderRadius: 12,
  breakpoints: {
    sm: 575.98,
    md: 767.98,
    lg: 991.98,
    xl: 1199.98,
    xxl: 1399.98,
    mobile: 575.98,
    tablet: 767.98,
    fhd: 991.98,
    uhd: 2160,
  },
  color: {
    monochrome,
    red,
    green,
    blue,
    primary,
    secondary,
    text,
    transparent,
    accent,
    darkGrey,
  },
  fontSize: {
    xs: '.75rem',
    sm: '.875rem',
    default: '1rem',
    md: '1.15rem',
    large: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
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
      'inset 0 1px 0 rgb(255 255 255 / 20%), 0 1px 1px rgb(0 0 0 / 19%)',
    hover:
      'inset 0 0px 0 rgb(255 255 255 / 20%), 0 0px 0px rgb(0 0 0 / 19%)',
  },
  buttonGradient: {
    a: 'linear-gradient(225deg, #1c1c27, #1f1c27) padding-box, linear-gradient(135deg, #373865, #53c7e4) border-box',
    hover:
      'linear-gradient(225deg, #242436, #1b1b29) padding-box, linear-gradient(157.5deg, #5455c9, #53c7e4) border-box',
  },
  heroGradient:
    'linear-gradient(to left, #6b9aef 0%, #65c48c 33%, #1fa6e0 66%, #6b9aef 100%)',
  topBarSize: 72,
})

export default theme
