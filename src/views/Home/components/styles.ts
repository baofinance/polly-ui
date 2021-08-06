import styled from 'styled-components'

export const BubbleOverlayText = styled.h6`
  position: absolute;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 9999;
`

export const BubbleWrap = styled.div`
  overflow: hidden;
  height: 600px;  
`

export const BubbleContainer = styled.div`
  position: relative;
  background: salmon;

  .bubble {
    opacity: 0.75;
    position: absolute;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 3px 10px rgba(0, 0, 0, 0.1);
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/9332/stripe-logo-bubbles-spritesheet.png);
    background-size: 1076px 1076px;
  }

  .logo1 { background-position:   0      0; }
  .logo2 { background-position:  -154px  0; }
  .logo3 { background-position:  -308px  0; }
  .logo4 { background-position:  -462px  0; }
  .logo5 { background-position:  -616px  0; }
  .logo6 { background-position:  -770px  0; }
  .logo7 { background-position:  -924px  0; }
  .logo8 { background-position:   0     -154px; }
  .logo9 { background-position:  -154px -154px; }
  .logo10 { background-position: -308px -154px; }
  .logo11 { background-position: -462px -154px; }
  .logo12 { background-position: -616px -154px; }
  .logo13 { background-position: -770px -154px; }
  .logo14 { background-position: -924px -154px; }
  .logo15 { background-position:  0     -308px; }
  .logo16 { background-position: -154px -308px; }
  .logo17 { background-position: -308px -308px; }
  .logo18 { background-position: -462px -308px; }
  .logo19 { background-position: -616px -308px; }
  .logo20 { background-position: -770px -308px; }
  .logo21 { background-position: -924px -308px; }
  .logo22 { background-position:  0     -462px; }
  .logo23 { background-position: -154px -462px; }
  .logo24 { background-position: -308px -462px; }
  .logo25 { background-position: -462px -462px; }
  .logo26 { background-position: -616px -462px; }
  .logo27 { background-position: -770px -462px; }
  .logo28 { background-position: -924px -462px; }
  .logo29 { background-position:  0     -616px; }
  .logo30 { background-position: -154px -616px; }
  .logo31 { background-position: -308px -616px; }
  .logo32 { background-position: -462px -616px; }
  .logo33 { background-position: -616px -616px; }
`