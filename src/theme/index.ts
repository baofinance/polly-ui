import {
  accent, blue, darkGrey, green, monochrome, primary, red, secondary,
  text,
  transparent
} from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 576,
    tablet: 767,
    fhd: 992,
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
    hover:
      'rgba(0, 0, 0, 0.4) 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px -0px 0px inset',
  },
  buttonGradient: {
    a: 'linear-gradient(225deg, #1c1c27, #1f1c27) padding-box, linear-gradient(135deg, #373865, #53c7e4) border-box',
    hover:
      'linear-gradient(225deg, #242436, #1b1b29) padding-box, linear-gradient(157.5deg, #5455c9, #53c7e4) border-box',
  },
  heroGradient:
    'linear-gradient(to left, #6b9aef 0%, #65c48c 33%, #1fa6e0 66%, #6b9aef 100%)',
  topBarSize: 72,
}

export default theme
