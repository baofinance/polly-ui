import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { darken } from 'polished'
import { Alert, Badge, Col, Row, Table } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse'
import styled from 'styled-components'

export const StyledAlert = styled(Alert)`
  border: none;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: left;
  color: ${(props) => props.theme.color.grey[100]};
  margin: 20px auto;
  width: 80%;

  > * {
    vertical-align: middle;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 90%;
  }
`

export const StyledExternalLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  font-weight: 700;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.blue[400]};
  }
  &.active {
    color: ${(props) => props.theme.color.blue[400]};
  }
`

export const NestBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 56px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const NestBoxHeader = styled.div`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.grey[100]};
  margin: auto;
  font-size: 2rem;

  p {
    margin: 0;
  }

  span.badge {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  span.smalltext {
    float: right;
    font-size: 0.5em;
    margin-top: 1em;
    margin-left: 0.5em;
  }

  img {
    text-align: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
  }
`

export const CornerButtons = styled.a`
  float: right;
  top: 15px;
  right: 25px;
  font-size: 24px;
  position: absolute;
  color: ${(props) => props.theme.color.grey[100]};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}px) {
    right: 10%;
  }

`

interface NestBreakProps {
  margin: number
}

export const NestBoxBreak = styled.hr.attrs((props: NestBreakProps) => ({
  margin: props.margin ? `${props.margin}px auto` : '30px auto',
}))`
  margin: ${(props) => props.margin};
  width: 40%;
  background: transparent;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export const NestCornerButton = styled.a`
  float: right;
  margin-top: 10px;
  margin-right: 15px;
  font-size: 24px;
  vertical-align: middle;
  color: ${(props) => props.theme.color.grey[100]};

  &:hover {
    cursor: pointer;
  }
`

export const NestAnalytics = styled(Collapse)`
  margin-bottom: 25px;
  margin-top: 25px;
  width: 80%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 90%;
  }
`

export const NestAnalyticsContainer = styled.div.attrs((props) => ({
  id: 'analytics-collapse',
}))``

export const GraphContainer = styled(Col)`
  width: 100%;
  height: 350px;
  margin: 0 auto 50px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 250px;
  }
`

export const PieGraphRow = styled(Row)`
  height: 400px;
  width: 80%;
  margin: 0 auto;
`

export const StyledTable = styled(Table)`
  width: 100%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  color: ${(props) => props.theme.color.grey[100]};
  border-color: transparent;

  th {
    padding-top: 25px;
    padding-bottom: 25px;
  }

  tbody > tr {
    vertical-align: middle;

    &:hover {
      color: ${(props) => props.theme.color.grey[100]} !important;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;

    th.strategy {
      display: none;
    }

    td.strategy {
      display: none;
    }
  }
`

export const PrefButtons = styled.div`
  width: 80%;
  margin: auto;

  > button {
    float: left;
    margin-left: 10px;
    margin-top: 25px;
    border: 1px solid rgba(256, 256, 256, 0.4);
    color: ${(props) => props.theme.color.grey[100]};

    &:hover,
    &.active,
    &:active,
    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.4);
      color: ${(props) => props.theme.color.grey[100]};
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: none !important;
    }
  }

  @media (max-width: 576px) {
    display: none;
  }
`

export const StatsRow = styled(Row)`
  width: 80%;
  margin: 50px auto;
  display: flex;
  flex-direction: row;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 90%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    margin: 25px auto;
  }
`

export const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 90%;
  margin: 0 auto;
  padding: 15px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.color.grey[100]};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 10px;
    background: transparent;
  }
`

export const StyledBadge = styled(Badge)`
  font-size: 1em;
  background: rgba(256, 256, 256, 0.1);
  color: ${(props) => props.theme.color.grey[100]};
`

export const Icon = styled.img`
  height: 200px;
  margin-bottom: 25px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-left: 0px;
  }
`

export const NestButtons = styled.div`
  align-items: center;
  flex-grow: 1;
  margin-right: 0;
  justify-content: center;
  vertical-align: middle;
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 80%;
`

export const NestHeader = styled.h1`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.grey[100]};
  margin-bottom: 10px;
  margin-top: 0;
  font-size: 32px;

  small {
    display: block;
    font-family: 'Rubik', sans-serif;
    font-size: 40%;
    margin-top: 5px;
  }
`

export const NestSubHeader = styled.h1`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.grey[100]};
  margin-bottom: 10px;
  margin-top: 0;
  font-size: 24px;

  small {
    display: block;
    font-family: 'Rubik', sans-serif;
    font-size: 40%;
    margin-top: 5px;
  }
`

export const NestText = styled.div`
  background: rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.color.grey[100]};
  text-align: left;
  width: 80%;
  margin: auto;
  padding: 50px;
  border-radius: 12px;

  @media (max-width: 576px) {
    width: 90%;
    padding: 25px;
    margin-top: 25px;
  }
`

export const NestList = styled.ul`
  margin-left: 25px;
`

export const QuestionIcon = styled(FontAwesomeIcon)`
  color: ${(props) => darken(0.2, props.theme.color.grey[100])};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.grey[100]};
    animation: 200ms;
    cursor: pointer;
  }
`
