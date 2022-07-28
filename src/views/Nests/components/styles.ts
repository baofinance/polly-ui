import { Collapse } from 'react-bootstrap'
import styled from 'styled-components'

export const MarketContainer = styled.div`
  display: flex;
  flex-basis: 50%;
  max-width: 50%;
`

export const MarketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${(props) => props.theme.spacing[4]}px;
  padding-bottom: 0px;
  color: ${(props) => props.theme.color.text[100]};
`

export const MarketHeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 3.5rem;
  width: 100%;
  padding: 24px;
`

export const MarketTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.text[200]};
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  font-weight: ${(props) => props.theme.fontWeight.strong};
`

export const ItemContainer = styled.div`
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: ${(props) => props.theme.fontSize.default};
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  cursor: pointer;
  border-radius: 0px;

  &:hover {
    background-color: ${(props) => props.theme.color.primary[300]};
  }

  &:nth-child(even) {
    background-color: ${(props) => props.theme.color.primary[200]};

    &:hover {
      background-color: ${(props) => props.theme.color.primary[300]};
    }
  }

  &:last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 6rem;

  img {
    vertical-align: middle;
    height: 24px;
    width: 24px;
    margin-right: 0.5rem;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.color.text[100]};
  }
`

export const ProtocolStatsWrapper = styled.div`
  padding: 16px;
  border-radius: 8px;
  position: relative;
  flex: 1 1 0%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.primary[100]};
  border: 1px solid ${(props) => props.theme.color.secondary[900]};
`

export const ProductDescription = styled.div`
  margin: 0px;
  overflow-wrap: break-word;

  p {
    font-size: 1rem;
    margin: 0px;
  }

  h1 {
    font-size: 1rem;
    color: ${(props) => props.theme.color.text[200]};
    margin: 0px;
  }
`

export const MarketSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: 0px;
  color: ${(props) => props.theme.color.text[200]};
  font-family: 'Poppins', sans-serif;
  margin-top: 2rem;
`

export const MarketSummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.default};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.text[200]};
`

export const MarketHeaderWrapper = styled.div`
  display: flex;
  min-width: 6rem;
`

export const MarketItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: 0.875rem;
`

export const MarketItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 6rem;
  color: ${(props) => props.theme.color.text[200]};
`

export const OverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
`

export const OverviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  padding: 24px;
  background-color: ${(props) => props.theme.color.primary[100]};
  border-radius: 8px;
`

export const BorrowText = styled.p`
  margin-top: 0px;
  margin-inline-end: 0.5rem;
  margin-bottom: 0px;
  margin-inline-start: 0.5rem;
  color: ${(props) => props.theme.color.text[200]};
`

export const BorrowMeterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 0.25rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.primary[100]};
`

export const BorrowMeter = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.secondary[900]};
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 6rem;
  font-size: ${(props) => props.theme.fontSize.xl};
  font-family: 'Rubik', sans-serif;
  font-weight: ${(props) => props.theme.fontWeight.strong};

  img {
    vertical-align: middle;
    height: 2rem;
    width: 2rem;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin: 0px;
    margin-top: 0px;
    margin-inline: 0.5rem 0.5rem;
    margin-bottom: 0px;
    color: ${(props) => props.theme.color.text[100]};
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }
`

export const ModalStack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`

export const InputStack = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  margin-inline: 0px;
  margin-bottom: 0px;
`

export const LabelFlex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`

export const LabelStack = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`

export const MaxLabel = styled.p`
  color: ${(props) => props.theme.color.text[200]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem;
  }
`

export const AssetLabel = styled.p`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-inline-start: 0.25rem;
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem;
  }
`

export const AssetStack = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 0.5rem;
  padding-right: 1rem;

  p {
    margin-top: 0px;
    margin-inline: 0.5rem 0px;
    margin-bottom: 0px;
    color: ${(props) => props.theme.color.text[100]};
    text-align: center;
    font-size: 1rem;
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }
`

export const IconFlex = styled.div`
  display: flex;
  width: 1.5rem;
  justify-content: center;

  img {
    display: block;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const SectionHeader = styled.div`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1.25rem;
  font-weight: ${(props) => props.theme.fontWeight.strong};
  margin: 0;
  text-align: center;
  align-content: center;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`

export const CloseButton = styled.a`
  float: right;
  top: ${(props) => props.theme.spacing[3]}px;
  right: ${(props) => props.theme.spacing[4]}px;
  font-size: 1.5rem;
  position: absolute;
  color: ${(props) => props.theme.color.background[200]};

  &:hover {
    cursor: pointer;
  }
`

export const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 1rem;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin: 0;
  padding: 12px;
`

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
