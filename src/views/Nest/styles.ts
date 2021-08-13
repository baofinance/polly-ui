import styled from 'styled-components'
import { lighten } from 'polished'
import Collapse from 'react-bootstrap/Collapse'
import { Badge, Col, Row, Table } from 'react-bootstrap'

export const NestBox = styled.div`
  width: 80%;
  background: transparent;
  padding: 15px;
  text-align: center;
  margin-top: 1em;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`

export const NestBoxHeader = styled.h1`
  font-family: 'Rubik', sans-serif;
  color: ${(props) => props.theme.color.grey[100]};
  margin-bottom: 25px;
  margin-top: 25px;
  margin-right: 25px;
  font-size: 32px;

  p {
    margin: 0;
  }

  span.badge {
    font-size: 18px;
    margin-bottom: 1rem;
  }

  span.smalltext {
    float: right;
    font-size: 0.5em;
    margin-top: 1em;
    margin-left: 0.5em;
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
  margin-bottom: 50px;
`

export const NestAnalyticsContainer = styled.div.attrs((props) => ({
  id: 'analytics-collapse',
}))``

export const GraphContainer = styled(Col)`
  width: 80%;
  height: 350px;
  margin: 0 auto 50px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
`

export const PieGraphRow = styled(Row)`
  height: 400px;
  width: 80%;
  margin: 0 auto;
`

export const StyledTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  color: white;
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
`

export const PrefButtons = styled.div`
  width: 80%;
  margin: auto;

  > button {
    float: left;
    margin-left: 10px;
    margin-top: 25px;
    border: 1px solid rgba(256, 256, 256, 0.4);
    color: white;

    &:hover,
    &.active,
    &:active,
    &:focus {
      border: transparent;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: none !important;
    }
  }
`

export const StatsRow = styled(Row)`
  width: 80%;
  margin: 50px auto;
`

export const StatCard = styled.div`
background: rgba(0, 0, 0, 0.4);
width: 90%;
  margin: 0 auto;
  padding: 15px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.color.grey[100]};
`

export const StyledBadge = styled(Badge)`
  font-size: 1em;
  background: rgba(256, 256, 256, 0.1);
  color: ${(props) => props.theme.color.grey[100]};
`

export const Icon = styled.img`
  margin-left: 70px;
  display: inline;
  height: 80px;
  margin-bottom: 10px;
`

export const NestButtons = styled.div`
  align-items: center;
  flex-grow: 1;
  margin-right: 0;
  justify-content: center;
  vertical-align: middle;
  display: flex;
  margin-top: 15px;
  margin-bottom: 0;
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
`

export const NestList = styled.ul`
  margin-left: 25px;
`
