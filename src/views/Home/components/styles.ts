import AAVE from 'assets/img/assets/AAVE.png'
import ALCX from 'assets/img/assets/ALCX.png'
import ALPHA from 'assets/img/assets/ALPHA.png'
import BAL from 'assets/img/assets/BAL.png'
import BAO from 'assets/img/assets/BAO.png'
import COMP from 'assets/img/assets/COMP.png'
import CREAM from 'assets/img/assets/CREAM.png'
import CRV from 'assets/img/assets/CRV.png'
import CVX from 'assets/img/assets/CVX.png'
import DAI from 'assets/img/assets/DAI.png'
import FRAX from 'assets/img/assets/FRAX.png'
import GRT from 'assets/img/assets/GRT.png'
import LINK from 'assets/img/assets/LINK.png'
import MATIC from 'assets/img/assets/MATIC.png'
import MKR from 'assets/img/assets/MKR.png'
import SNX from 'assets/img/assets/SNX.png'
import SUSHI from 'assets/img/assets/SUSHI.png'
import UMA from 'assets/img/assets/UMA.png'
import UNI from 'assets/img/assets/UNI.png'
import USDC from 'assets/img/assets/USDC.png'
import USDT from 'assets/img/assets/USDT.png'
import WETH from 'assets/img/assets/WETH.png'
import YFI from 'assets/img/assets/YFI.png'
import styled from 'styled-components'

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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue 10s infinite linear;
  margin-top: 0.5em;

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
  opacity: 0.75;

  @media (max-width: 414px) {
    font-size: 1rem !important;
  }
`

export const BubbleWrap = styled.div`
  height: 600px;
  margin-left: calc(-100vw / 2 + 500px / 2);
  margin-right: calc(-100vw / 2 + 500px / 2);
  overflow: hidden;

  @media (max-width: 414px) {
    font-size: 1rem !important;
  }

  @media (min-width: 2160px) {
    display: none;
  }
`

export const BubbleContainer = styled.div`
  position: relative;

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

export const StyledCardWrapper = styled.div`
  display: flex;

  @media (max-width: 414px) {
    flex-direction: column;
  }
`

export const StyledCardContainer = styled.div`
  flex: 1;
`

export const StyledCardContent = styled.div`
  color: white;
  padding: 30px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  height: 550px;
  width: 100%;

  @media (max-width: 414px) {
    padding: 10px;
    height: 250px;
  }
`

export const StyledCardParralax = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateZ(60px);
`

export const StyledCardTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 414px) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
`

export const StyledCardIcon = styled.img`
  margin: 30px auto;
  display: block;
  height: 80px;
  width: 80px;

  @media (max-width: 414px) {
    display: block;
    margin: 15px auto;
    height: 50px;
    width: 50px;
  }
`

export const StyledCardText = styled.p`
  font-size: 1.25rem;
  text-align: center;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`
