import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin: 0;
  padding: 0;
  text-align: left;
  width: 80%;
  max-width: 980px;
`

export const StyledDocsWarning = styled.span`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1rem;
  margin: ${(props) => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[2]}px;
  text-align: start;
  border-left: 3px solid ${(props) => props.theme.color.red};
  width: 90%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 0.75rem;
    padding: 0px;
    width: 100%;
    margin: 0;
  }
`

export const Warning = styled.h3`
  color: ${(props) => props.theme.color.red};
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeight.strong};
  margin: 0;
  padding: 0;
  text-align: center;
  max-width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1rem;
  }
`

export const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

export const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

export const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 100%;
  }
`

export const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

export const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 80%;
  }
`

export const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.text[100]};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.text[300]};
  }
  &.active {
    color: ${(props) => props.theme.color.text[300]};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`
