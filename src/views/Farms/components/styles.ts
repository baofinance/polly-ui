import { Button } from 'components/Button'
import { Card } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'

export const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

export const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: ${(props) => props.theme.borderRadius}px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

export const StyledCards = styled.div`
  width: 900px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

export const StyledLoadingWrapper = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) => props.theme.color.text[200]};
`

export const StyledCardWrapper = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing[4]}px;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

export const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1.25rem;
  font-weight: ${(props) => props.theme.fontWeight.strong};
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  text-align: center;
`

export const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

export const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

export const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.text[100]};
`

export const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.borderRadius}px;
  background: ${(props) => props.theme.color.primary[300]};
  color: ${(props) => props.theme.color.text[100]};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  line-height: 32px;
  font-size: 0.75rem;
  text-align: center;
  padding: 0 ${(props) => props.theme.spacing[2]}px;
`

export const Footnote = styled.div`
  font-size: 0.875rem;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.text[200]};
  border-top: solid 1px ${(props) => props.theme.color.primary[300]};

  :first-child {
    border-top: none;
  }
`

export const FootnoteValue = styled.div`
  font-family: 'Poppins', sans-serif;
  float: right;
`

export const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: auto;
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

export const StyledBalances = styled.div`
  display: flex;
`

export const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin: 0;
  padding: 0;
  text-align: center;
`

export const AccordionCard = styled(Card)`
	background: none !important;
  min-height: 250px;
  border: none !important;
  box-shadow: none !important;

	.card-title {
		text-align: center;
	}

	.card-body {
	}
	
	.card-header {
		background: none !important;
		border: none !important;
	}
	
	.card-footer {
		background: none !important;
		bottom: 0;
    display: flex;
    justify-content: flex-end;
    border: none;
	}

  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
		font-size: 0.75rem;
	}

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    min-height: 200px;
	}
  `

  export const AssetImageContainer = styled.div`
  height: 100%;
  align-items: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: super;
  color: ${(props) => props.theme.color.text[100]};
  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    display: none;
  }
  }
`

export const FarmImage = styled.img`
  height: 50px;
  margin-right: ${(props) => props.theme.spacing[3]}px;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    height: 40px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    height: 35px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    height: 50px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }
`

export const AssetImage = styled(FarmImage)`
  height: 40px;
  margin: 0 0 -${(props) => props.theme.spacing[3]}px -${(props) =>
      props.theme.spacing[3]}px;
  vertical-align: super;
  transition: 200ms;
  user-select: none;
  -webkit-user-drag: none;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    height: 30px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    height: 25px;
  }
`