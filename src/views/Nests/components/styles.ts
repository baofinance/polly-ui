import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ListLabelCol = styled.span`
  font-family: 'Rubik', sans-serif;
  display: inline-block;
  text-align: ${(props: ColProps) => props.align};
  color: ${(props) => props.theme.color.text[100]};
  vertical-align: middle;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  padding: 0;
  width: ${(props: ColProps) => props.width};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export const ListLabelContainer = styled.div`
  padding: ${(props) => props.theme.spacing[3]}px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export const ListItemContainer = styled.div`
  background: ${(props) => props.theme.color.transparent[100]};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.spacing[4]}px;
  display: block;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export const MobileListItemWrapper = styled.div`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    background: ${(props) => props.theme.color.transparent[100]};
    border-radius: ${(props) => props.theme.borderRadius}px;
    width: 100%;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListItemContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
    padding: ${(props) => props.theme.spacing[3]}px;
    align-items: center;
    display: flex;
  }
`

export const MobileNestLink = styled(NavLink)`
  text-decoration: inherit;
  color: inherit;
`

export const MobileListText = styled.span`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 55%;
    justify-content: space-around;
    flex-direction: column;
    display: flex;
  }
`

export const MobileListTitle = styled.span`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    line-height: 1.25rem;
    font-size: 1.25rem;
    font-weight: ${(props) => props.theme.fontWeight.strong};
  }
`

export const MobileListDesc = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 0.9rem;
    font-weight: 4000;
  }
`

export const MobileListPrice = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    text-align: right;
    margin-left: auto;
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
`

export const MobileListChange = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    color: ${(props) => props.theme.color.accent[500]};
    width: fit-content;
    justify-content: space-around;
    display: flex;
    align-items: center;
  }
`

export const NestImage = styled.img`
  height: 50px;
  margin-right: ${(props) => props.theme.spacing[3]}px;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    height: 40px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 35px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 50px;
    margin-right: ${(props) => props.theme.spacing[3]}px;
  }
`

export const AssetImageContainer = styled.div`
  height: 100%;
  align-items: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => props.theme.color.text[100]};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
  }
`

export const AssetImage = styled(NestImage)`
  height: 40px;
  margin: 0 0 -${(props) => props.theme.spacing[3]}px -${(props) => props.theme.spacing[3]}px;
  vertical-align: super;
  transition: 200ms;
  user-select: none;
  -webkit-user-drag: none;

  @media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
    height: 30px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 25px;
  }
`

export const ColumnText = styled.span`
  color: ${(props) => props.theme.color.text[100]} !important;
  vertical-align: middle;
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: 1rem;
`

// List Item

export const NestListContainer = styled.div`
  width: 80%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 90%;
  }
`

export const ListCol = styled.div`
  display: inline-block;
  width: ${(props: ColProps) => props.width};
  text-align: ${(props: ColProps) => props.align};
`

export const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

export const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

// Props and stuff

interface ColProps {
  width: string
  align: string
}
