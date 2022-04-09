import React from 'react'
import styled from 'styled-components'

interface LabelProps {
	text?: string
}

const Label: React.FC<LabelProps> = ({ text }) => (
	<StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
	color: ${(props) => props.theme.color.text[100]};
`

export const MaxLabel = styled.span`
  color: ${(props) => props.theme.color.text[200]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem;
  }
`

export const AssetLabel = styled.span`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-inline-start: 0.25rem;
  margin-bottom: 0px;
  vertical-align: middle;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem;
  }
`

export const LabelFlex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`
export const LabelStack = styled.span`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`

export const LabelEnd = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem !important;
  }
`

export const LabelStart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    font-size: 0.75rem !important;
  }
`

export const FeeLabel = styled.p`
  color: ${(props) => props.theme.color.text[200]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    font-size: 0.75rem;
  }
`

export default Label
