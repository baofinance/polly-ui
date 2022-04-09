import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Alert, Badge, Col, Row, Table } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse'

export const NestWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`

export const NestAnalytics = styled(Collapse)`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  margin-top: ${(props) => props.theme.spacing[4]}px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    width: 100%;
  }
`

export const NestAnalyticsContainer = styled.div.attrs((props) => ({
  id: 'analytics-collapse',
}))``

export const NestButtons = styled.div`
  align-items: center;
  flex-grow: 1;
  margin-right: 0;
  justify-content: center;
  vertical-align: middle;
  display: flex;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`

export const NestHeader = styled.div`
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
    font-size: 1rem;
    margin-top: ${(props) => props.theme.spacing[3]}px;
    margin-left: ${(props) => props.theme.spacing[2]}px;
  }

  img {
    text-align: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    font-size: 1.5rem;
  }
`

export const NestSubHeader = styled.h1`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.text[100]};
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  margin-top: 0;
  font-size: 1.5rem;

  small {
    display: block;
    font-family: 'Rubik', sans-serif;
    font-size: 1.5rem;
    margin-top: ${(props) => props.theme.spacing[1]}px;
  }
`

export const NestExplanation = styled.div`
  background: ${(props) => props.theme.color.transparent[100]};
  color: ${(props) => props.theme.color.text[100]};
  text-align: left;
  width: 100%;
  margin: auto;
  padding: ${(props) => props.theme.spacing[6]}px;
  border-radius: ${(props) => props.theme.borderRadius}px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    width: 100%;
    padding: ${(props) => props.theme.spacing[4]}px;
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`

export const NestList = styled.ul`
  margin-left: ${(props) => props.theme.spacing[4]}px;
`