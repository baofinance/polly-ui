import styled from 'styled-components'

// Token Asset Images
import SUSHI from '../../../assets/img/assets/SUSHI.png'
import WETH from '../../../assets/img/assets/WETH.png'
import LINK from '../../../assets/img/assets/LINK.png'
import GRT from '../../../assets/img/assets/GRT.png'
import USDT from '../../../assets/img/assets/USDT.png'
import DAI from '../../../assets/img/assets/DAI.png'

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
    background-repeat: no-repeat;
    background-size: 152px 152px;
    background-position: center center;
  }

  .logo1 { background-image: url(${SUSHI}) }
  .logo2 { background-image: url(${LINK}) }
  .logo3 { background-image: url(${GRT}) }
  .logo4 { background-image: url(${WETH}) }
  .logo5 { background-image: url(${DAI}) }
  .logo6 { background-image: url(${USDT}) }
  .logo7 { background-image: url(${SUSHI}) }
  .logo8 { background-image: url(${LINK}) }
  .logo9 { background-image: url(${GRT}) }
  .logo10 { background-image: url(${WETH}) }
  .logo11 { background-image: url(${DAI}) }
  .logo12 { background-image: url(${USDT}) }
  .logo13 { background-image: url(${SUSHI}) }
  .logo14 { background-image: url(${LINK}) }
  .logo15 { background-image: url(${GRT})  }
  .logo16 { background-image: url(${WETH}) }
  .logo17 { background-image: url(${DAI})  }
  .logo18 { background-image: url(${USDT}) }
  .logo19 { background-image: url(${SUSHI}) }
  .logo20 { background-image: url(${LINK}) }
  .logo21 { background-image: url(${GRT})  }
  .logo22 { background-image: url(${WETH}) }
  .logo23 { background-image: url(${DAI})  }
  .logo24 { background-image: url(${USDT}) }
  .logo25 { background-image: url(${SUSHI}) }
  .logo26 { background-image: url(${LINK}) }
  .logo27 { background-image: url(${GRT})  }
  .logo28 { background-image: url(${WETH}) }
  .logo29 { background-image: url(${DAI})  }
  .logo30 { background-image: url(${USDT}) }
  .logo31 { background-image: url(${SUSHI}) }
  .logo32 { background-image: url(${LINK}) }
  .logo33 { background-image: url(${GRT})  }
`