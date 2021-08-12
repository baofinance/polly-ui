import styled from 'styled-components'
import { lighten } from 'polished'
import Collapse from 'react-bootstrap/Collapse'
import { Badge, Col, Row, Table } from 'react-bootstrap'

export const NestBox = styled.div`
  width: 60%;
  background: ${(props) => props.theme.color.darkGrey[200]}95;
  border: 1px solid ${(props) => props.theme.color.grey[600]};
  border-radius: 12px;
  box-shadow: inset 1px 1px 0 ${(props) => props.theme.color.grey[500]};
  padding: 15px;
  text-align: center;
`

export const NestBoxHeader = styled.h1`
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

export const AssetImageContainer = styled.div`
  display: inline-block;
  background-color: ${(props) => props.theme.color.darkGrey[100]}90;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin: 10px 15px;

  img {
    height: 32px;
    vertical-align: middle;
  }
`

interface NestBreakProps {
  margin: number
}

export const NestBoxBreak = styled.hr.attrs((props: NestBreakProps) => ({
  margin: props.margin ? `${props.margin}px auto` : '30px auto',
}))`
  border: none;
  margin: ${(props) => props.margin};
  border-bottom: 2px solid
    ${(props) => lighten(0.2, props.theme.color.darkGrey[100])};
  width: 40%;
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

export const PriceGraphContainer = styled(Col)`
  width: 80%;
  height: 400px;
  margin: 0 auto 50px;
  overflow: hidden;
`

export const PieGraphRow = styled(Row)`
  height: 500px;
  width: 80%;
  margin: 0 auto;
`

export const StyledTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
  border-width: 2px;
  border-radius: 15px;
  border-color: ${(props) => lighten(0.1, props.theme.color.darkGrey[100])};
  color: ${(props) => props.theme.color.grey[100]};

  tbody > tr {
    vertical-align: middle;

    &:hover {
      color: ${(props) => props.theme.color.grey[100]} !important;
    }
  }
`

export const PrefButtons = styled.div`
  width: 80%;
  margin: 0 auto 50px;

  > button {
    float: left;
    margin: 0 10px;
    border: 1px solid
      ${(props) => lighten(0.2, props.theme.color.darkGrey[100])};
    color: ${(props) => lighten(0.2, props.theme.color.darkGrey[100])};

    &:hover,
    &.active,
    &:active,
    &:focus {
      border: 1px solid
        ${(props) => lighten(0.4, props.theme.color.darkGrey[100])};
      color: ${(props) => props.theme.color.darkGrey[100]};
      background-color: ${(props) =>
        lighten(0.4, props.theme.color.darkGrey[100])};
      box-shadow: none !important;
    }
  }
`

export const StatsRow = styled(Row)`
  width: 80%;
  margin: 50px auto;
`

export const StatCard = styled.div`
  background-color: ${props => props.theme.color.darkGrey[100]}95;
  width: 90%;
  margin: 0 auto;
  padding: 25px;
  border-radius: 12px;
  font-weight: bold;
  color: ${props => props.theme.color.grey[100]};
`

export const StyledBadge = styled(Badge)`
  font-size: 1.1em;
  background-color: ${(props) => props.theme.color.blue[400]};
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
  color: ${(props) => props.theme.color.grey[100]};
  text-align: left;
  margin: 50px;
`

export const NestList = styled.ul`
  margin-left: 25px;
`
