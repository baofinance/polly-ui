import { Badge } from 'react-bootstrap'
import styled from 'styled-components'

export const StyledBadge = styled(Badge)`
	font-size: 1em;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	background-color: ${(props) => props.theme.color.transparent[100]} !important;
	padding: 0.5rem;
`

export const PriceBadge = styled(Badge)`
	font-size: 1em;
	background: ${(props) => props.theme.color.transparent[100]};
	color: ${(props) => props.theme.color.text[100]};
`

export const FeeBadge = styled(Badge)`
	font-size: 0.875em !important;
	line-height: 1rem !important;
	background-color: ${(props) => props.theme.color.green} !important;
	color: ${(props) => props.theme.color.text[100]} !important;
`

export const CompositionBadge = styled(Badge)`
	font-size: 1em;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	background-color: ${(props) => props.theme.color.transparent[200]} !important;
`

export const StatBadge = styled(Badge)`
	font-size: 1em;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	background-color: ${(props) => props.theme.color.transparent[200]} !important;
`

export const AssetBadge = styled(Badge)`
	&.bg-primary {
		background-color: ${(props: any) => props.color} !important;
		color: #fff8ee !important;
	}

	margin: 8px 0;
`
