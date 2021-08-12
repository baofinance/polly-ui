import styled, { keyframes } from 'styled-components'

// Token Asset Images
import SUSHI from '../../../assets/img/assets/SUSHI.png'
import WETH from '../../../assets/img/assets/WETH.png'
import LINK from '../../../assets/img/assets/LINK.png'
import GRT from '../../../assets/img/assets/GRT.png'
import USDT from '../../../assets/img/assets/USDT.png'
import DAI from '../../../assets/img/assets/DAI.png'
import AAVE from '../../../assets/img/assets/AAVE.png'
import ALCX from '../../../assets/img/assets/ALCX.png'
import ALPHA from '../../../assets/img/assets/ALPHA.png'
import ASX from '../../../assets/img/assets/ASX.png'
import BAL from '../../../assets/img/assets/BAL.png'
import BAND from '../../../assets/img/assets/BAND.png'
import BAO from '../../../assets/img/assets/BAO.png'
import COMP from '../../../assets/img/assets/COMP.png'
import CREAM from '../../../assets/img/assets/CREAM.png'
import CRV from '../../../assets/img/assets/CRV.png'
import CVX from '../../../assets/img/assets/CVX.png'
import EWT from '../../../assets/img/assets/EWT.png'
import FRAX from '../../../assets/img/assets/FRAX.png'
import HEGIC from '../../../assets/img/assets/HEGIC.png'
import MATIC from '../../../assets/img/assets/MATIC.png'
import MKR from '../../../assets/img/assets/MKR.png'
import MUSE from '../../../assets/img/assets/MUSE.png'
import NFTX from '../../../assets/img/assets/NFTX.png'
import OHM from '../../../assets/img/assets/OHM.png'
import RARI from '../../../assets/img/assets/RARI.png'
import REN from '../../../assets/img/assets/REN.png'
import SNX from '../../../assets/img/assets/SNX.png'
import SUSD from '../../../assets/img/assets/SUSD.png'
import UBT from '../../../assets/img/assets/UBT.png'
import UMA from '../../../assets/img/assets/UMA.png'
import UNI from '../../../assets/img/assets/UNI.png'
import USDC from '../../../assets/img/assets/USDC.png'
import UST from '../../../assets/img/assets/UST.png'
import YFI from '../../../assets/img/assets/YFI.png'

export const BubbleOverlayText = styled.div`
  z-index: 9999;
  text-align: left;
`

export const HeroHeader = styled.h6`
  font-family: 'Rubik', sans-serif;
  font-size: 7rem !important;
  line-height: 6.7rem;
  letter-spacing: -0.2rem;
  text-align: center;
  font-weight: 700 !important;
	background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: hue 10s infinite linear;

  @media (max-width: 414px) {
    font-size: 3.5rem !important;
    line-height: 3.35rem;
  }

    @keyframes hue {
      from {
        -webkit-filter: hue-rotate(0deg);
      }
      to {
        -webkit-filter: hue-rotate(-360deg);
      }
    }
        `

export const HeroSubHeader = styled.h6`
  font-family: 'Rubik', sans-serif;
  font-size: 4rem !important;
  letter-spacing: -0.2rem;
  text-align: center;
  font-weight: 700 !important;
  letter-spacing: 2px;
  color: #f35626;
	background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: hue 10s infinite linear;

  @media (max-width: 414px) {
    font-size: 2rem !important;
  }

  @keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }
`

export const HeroText = styled.p`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  font-weight: 400;

  @media (max-width: 414px) {
    font-size: 1rem !important;
  }
`

export const BubbleWrap = styled.div`
  margin-top: -30%;
  position: absolute;

  @media (max-width: 414px) {
    font-size: 1rem !important;
  }
`

export const BubbleContainer = styled.div`
  position: absolute;
  z-index: -9999;

  @media (max-width: 414px) {
    display: none;
  }


  .bubble {
    opacity: 0.75;
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 100px 100px;
    background-position: center center;
  }

  .logo1 {
    background-image: url(${AAVE});
  }
  .logo2 {
    background-image: url(${LINK});
  }
  .logo3 {
    background-image: url(${ALPHA});
  }
  .logo4 {
    background-image: url(${BAL});
  }
  .logo5 {
    background-image: url(${BAO});
  }
  .logo6 {
    background-image: url(${DAI});
  }
  .logo7 {
    background-image: url(${CREAM});
  }
  .logo8 {
    background-image: url(${CRV});
  }
  .logo9 {
    background-image: url(${CVX});
  }
  .logo10 {
    background-image: url(${DAI});
  }
  .logo11 {
    background-image: url(${FRAX});
  }
  .logo12 {
    background-image: url(${GRT});
  }
  .logo13 {
    background-image: url(${SUSHI});
  }
  .logo14 {
    background-image: url(${LINK});
  }
  .logo15 {
    background-image: url(${MATIC});
  }
  .logo16 {
    background-image: url(${MKR});
  }
  .logo17 {
    background-image: url(${SNX});
  }
  .logo18 {
    background-image: url(${SUSHI});
  }
  .logo19 {
    background-image: url(${WETH});
  }
  .logo20 {
    background-image: url(${UNI});
  }
  .logo21 {
    background-image: url(${USDC});
  }
  .logo22 {
    background-image: url(${USDT});
  }
  .logo23 {
    background-image: url(${WETH});
  }
  .logo24 {
    background-image: url(${YFI});
  }
  .logo25 {
    background-image: url(${USDC});
  }
  .logo26 {
    background-image: url(${MATIC});
  }
  .logo27 {
    background-image: url(${GRT});
  }
  .logo28 {
    background-image: url(${UMA});
  }
  .logo29 {
    background-image: url(${COMP});
  }
  .logo30 {
    background-image: url(${SUSHI});
  }
  .logo31 {
    background-image: url(${SNX});
  }
  .logo32 {
    background-image: url(${ALCX});
  }
  .logo33 {
    background-image: url(${AAVE});
  }
`

export const StyledSectionContainer = styled.div`
  display: flex;
  @media (max-width: 414px) {
    flex-direction: column;
  }
`

export const StyledSectionTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

export const StyledCardContainer = styled.div`
  flex: 1;
`

export const StyledCardContent = styled.div`
  padding: 30px;
`

export const StyledCardTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
`
export const StyledCardIcon = styled.img`
  margin-bottom: 20px;
  width: 50px;
`

export const StyledCardDescription = styled.p`
  font-size: 24px;
`
