import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

export const MenuIcon: React.FC<IconProps> = ({ size = 24 }) => {
	return (
		<svg height={size} viewBox="0 0 24 24" width={size}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white" />
		</svg>
	)
}

export interface IconProps {
	color?: string
	children?: React.ReactNode
	size?: number
}

export const Icon = styled.img`
	height: 200px;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		margin-left: 0px;
	}
`

export const IconFlex = styled.div`
  display: flex;
  width: 1.5rem;

  img {
    display: block;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const IconImage = styled.img`
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

export const StyledIcon = styled(IconImage)`
  height: 40px;
  vertical-align: super;
  transition: 200ms;
  user-select: none;
  -webkit-user-drag: none;
  margin-left: -${(props) => props.theme.spacing[3]}px;

  &:first-child {
    margin-left: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
    height: 30px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    height: 25px;
  }
`

export const IconContainer = styled.div`
  height: 100%;
  align-items: center;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => props.theme.color.text[100]};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    display: none;
  }
`

export const QuestionIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.color.text[200]};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.text[100]};
    animation: 200ms;
    cursor: pointer;
  }
`