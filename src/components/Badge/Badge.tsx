import { Badge } from 'react-bootstrap'
import styled from 'styled-components'

export const StyledBadge = styled(Badge)`
	font-size: 1em;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	background-color: ${(props) => props.theme.color.transparent[200]};
`

export const PriceBadge = styled(Badge)`
	font-size: 1em;
	background: ${(props) => props.theme.color.transparent[100]};
	color: ${(props) => props.theme.color.text[100]};
`
