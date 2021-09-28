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
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const HeroHeader = styled.h6`
  font-family: 'Rubik', sans-serif;
  font-size: 7rem;
  letter-spacing: -0.1rem;
  font-weight: ${(props) => props.theme.fontWeight.strong} !important;
  color: ${(props) => props.theme.color.text[100]};
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    font-size: 5rem !important;
    line-height: 4.7rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 3.5rem !important;
    line-height: 3.2rem;
    text-align: left;
  }
`

export const HeroHeaderGradient = styled(HeroHeader)`
  display: inline-block;
  background: ${(props) => props.theme.heroGradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bounce 10s ease-in-out infinite alternate;

  @keyframes bounce {
    to {
      background-position: 200%;
    }
  }
`

export const HeroSubHeader = styled.h6`
  font-family: 'Rubik', sans-serif;
  font-size: 4rem !important;
  letter-spacing: -0.2rem;
  font-weight: ${(props) => props.theme.fontWeight.medium} !important;
  color: $props{(props) => props.theme.color.text[100]};
  background: ${(props) => props.theme.heroGradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bounce 10s ease-in-out infinite alternate;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 2rem !important;
  }

  @keyframes bounce {
    to {
      background-position: 200%;
    }
  }
`

export const HeroText = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.color.text[200]};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin: auto;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    text-align: left;
    font-size: 1.15rem;
  }
`

export const BubbleWrap = styled.div`
  height: 600px;
  margin-left: calc(-100vw / 2 + 500px / 2);
  margin-right: calc(-100vw / 2 + 500px / 2);
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.uhd}px) {
    display: none;
  }
`

export const BubbleContainer = styled.div`
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }

  .bubble {
    opacity: 0.75;
    position: absolute;
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100px 100px;
    background-position: center center;
    z-index: -999;
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

export const BubbleOverlayText = styled.div`
  z-index: 9999;
  text-align: left;
`

export const StyledSectionContainer = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
  }
`

export const StyledSectionTitle = styled.h2`
  font-size: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export const StyledCardWrapper = styled.div`
  display: flex;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
  }
`

export const StyledCardContainer = styled.div`
  flex: 1;
`

export const StyledCardContent = styled.div`
  color: ${(props) => props.theme.color.text[100]};
  padding: ${(props) => props.theme.spacing[4]}px;
  background: ${(props) => props.theme.color.transparent[100]};
  border-radius: ${(props) => props.theme.borderRadius}px;
  height: 550px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: ${(props) => props.theme.spacing[2]}px;
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
  font-weight: ${(props) => props.theme.fontWeight.strong};
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
    margin-bottom: ${(props) => props.theme.spacing[1]}px;
  }
`

export const StyledCardIcon = styled.img`
  margin: ${(props) => props.theme.spacing[4]}px auto;
  display: block;
  height: 80px;
  width: 80px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: block;
    margin: ${(props) => props.theme.spacing[3]}px auto;
    height: 50px;
    width: 50px;
  }
`

export const StyledCardText = styled.p`
  font-size: 1.25rem;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1rem;
  }
`

export const InfoWrapper = styled(Row)`
  width: 80%;
  margin: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    flex-direction: column;
    width: 100%;
  }
`

export const InfoImageCol = styled(Col)`
  margin-bottom: 5em;
  width: 30%;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    width: 90%;
    margin: auto;
    margin-bottom: ${(props) => props.theme.spacing[5]}px;
  }
`

export const InfoImageContainer = styled.div`
  display: flex;
  margin: auto;
  height: 100%;
`

export const InfoCol = styled(InfoImageCol)`
  display: table;
  width: 70%;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    width: 100%;
  }
`

export const InfoContainer = styled.div`
  margin: auto;
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
`

export const InfoHeader = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 5rem;
  letter-spacing: -0.1rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    font-size: 4rem !important;
    letter-spacing: -0.1rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 3rem !important;
    letter-spacing: -0.1rem;
  }
`

export const InfoSubHeader = styled(InfoHeader)`
  display: inline-block;
  background: ${(props) => props.theme.heroGradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bounce 10s ease-in-out infinite alternate;

  @keyframes bounce {
    to {
      background-position: 200%;
    }
  }
`

export const InfoText = styled.p`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1.25rem;
`

export const InfoImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-inline: auto;
  margin: 0 ${(props) => props.theme.spacing[3]}px;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    margin-inline: 0;
    max-width: 70%;
    margin: auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-inline: 0;
    max-width: 80%;
    margin: auto;
  }
`

export const GraphContainer = styled(Col)`
  width: 100%;
  height: 350px;
  margin: 0 auto ${(props) => props.theme.spacing[6]}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  overflow: hidden;
  background: ${(props) => props.theme.color.transparent[100]};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 250px;
  }
`

export const PriceGraphContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const StyledGraphContainer = styled(GraphContainer)`
  width: 100%;
  margin: ${(props) => props.theme.spacing[5]}px auto 0;
`

export const AnalyticsContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.theme.color.transparent[100]};
  backdrop-filter: blur(5px);
  margin-top: 200px; // bubble container is 600px high with 100 px margin top/bottom
  position: absolute;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  height: 125px;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    flex-direction: column;
    margin: ${(props) => props.theme.spacing[6]}px auto;
    position: relative;
    width: auto;
    min-height: 133px;
    height: auto;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.uhd}px) {
    position: relative;
    margin: ${(props) => props.theme.spacing[5]}px auto;
    left: 0;
    transform: none;
  }
`

export const Analytic = styled(Col)`
  margin: auto;
  text-align: center;
  height: 75%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex: 1 1;
  padding: ${(props) => props.theme.spacing[5]}px;
  border-right: 1px solid ${(props) => props.theme.color.transparent[200]};

  &:first-child {
  }

  &:last-child {
    border-right: none;
  }

  span > h2 {
    font-family: 'Rubik', sans-serif;
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.color.transparent[200]};
    flex: auto !important;
    padding-bottom: ${(props) => props.theme.spacing[3]}px;
    padding-top: ${(props) => props.theme.spacing[3]}px;

    &:first-child {
    }

    &:last-child {
      border-bottom: none;
    }
  }
`

export const NestBoxHeader = styled.div`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.text[100]};
  margin: auto;
  font-size: 2rem;

  p {
    margin: 0;
  }

  span.badge {
    font-size: 1.25rem;
    margin-bottom: ${(props) => props.theme.spacing[3]}px;
  }

  span.smalltext {
    float: right;
    font-size: 0.5rem;
    margin-top: ${(props) => props.theme.spacing[3]}px;
    margin-left: ${(props) => props.theme.spacing[2]}px;
  }

  img {
    text-align: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`

export const PrefButtons = styled.div`
  margin: auto;

  > button {
    float: left;
    margin-left: ${(props) => props.theme.spacing[2]}px;
    margin-top: ${(props) => props.theme.spacing[4]}px;
    color: ${(props) => props.theme.color.text[100]};
    border-radius: ${(props) => props.theme.borderRadius}px;
    width: 48px;
    background: ${(props) => props.theme.color.transparent[100]};

    &:hover,
    &.active,
    &:active,
    &:focus {
      border: 2px solid transparent;
      color: ${(props) => props.theme.color.text[100]};
      background: ${(props) => props.theme.buttonGradient.a};
      box-shadow: none !important;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`
