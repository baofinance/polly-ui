import styled from 'styled-components'
import { lighten } from 'polished'
import Collapse from 'react-bootstrap/Collapse'
import { Badge, Card, Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'

export const NestBox = styled.div`
	width: 60%;
	background: ${props => props.theme.color.grey[500]};
	border: 1px solid ${props => props.theme.color.grey[600]};
	border-radius: 12px;
	box-shadow: inset 1px 1px 0 ${props => props.theme.color.grey[500]};
	padding: 15px;
	text-align: center;
`

export const NestBoxHeader = styled.h1`
	font-family: 'Reem Kufi', sans-serif;
	color: ${props => props.theme.color.grey[100]};
	margin-bottom: 10px;
	margin-top: 0;
	font-size: 32px;

	small {
		display: block;
		font-family: 'Reem Kufi', sans-serif;
		font-size: 40%;
		margin-top: 5px;
	}
`

export const AssetImageContainer = styled.div`
	display: inline-block;
	background-color: ${props => lighten(0.2, props.theme.color.grey[500])};
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
  margin: props.margin ? `${props.margin}px auto` : '30px auto'
}))`
	border: none;
	margin: ${props => props.margin};
	border-bottom: 2px solid ${props => lighten(0.3, props.theme.color.grey[500])};
	width: 40%;
`

export const NestCornerButton = styled.a`
	float: right;
	margin-top: 10px;
	margin-right: 15px;
	font-size: 24px;
	vertical-align: middle;
	color: ${props => props.theme.color.grey[100]};

	&:hover {
		cursor: pointer;
	}
`

export const NestAnalytics = styled(Collapse)`
	margin-bottom: 50px;
`

export const NestAnalyticsContainer = styled.div.attrs(props => ({
  id: 'analytics-collapse'
}))``

export const GraphLabel = styled.h2`
	font-family: 'Kaushan Script', sans-serif;
	color: ${props => props.theme.color.grey[100]};
	background-color: ${props => lighten(0.2, props.theme.color.grey[500])};
	width: 80%;
	margin: 0 auto;
	padding: 10px;
	border: 1px solid ${props => props.theme.color.grey[600]};
	border-bottom: none;
	border-top-right-radius: 12px;
	border-top-left-radius: 12px;
`

export const GraphContainer = styled(Col)`
	background-color: ${props => lighten(0.1, props.theme.color.grey[500])};
	width: 80%;
	height: 80%;
	margin: 0 auto;
	border: 1px solid ${props => props.theme.color.grey[600]};
	border-radius: 0 0 12px 12px;
	overflow: hidden;
`

export const StatsCard = styled(Card)`
	background-color: transparent;
	border: none;
	justify-content: center;
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
`

export const StatsCardHeader = styled(Card.Header)`
	font-weight: bold;
	background-color: ${props => lighten(0.1, props.theme.color.grey[500])};
	color: ${props => props.theme.color.grey[100]};
	width: 70%;
	margin: 0 auto 0;
	border: 1px solid ${props => lighten(0.3, props.theme.color.grey[500])};
	border-bottom: none;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`

export const StatsCardBody = styled(Card.Body)`
	padding: 0;
`

export const NestStats = styled(ListGroup)`
	margin: 0 auto;
	width: 70%;
	justify-content: center;

	.list-group-item:last-child {
		border-top-right-radius: 0 !important;
	}

	.list-group-item:first-child {
		border-top-left-radius: 0;
	}
`

export const NestStat = styled(ListGroup.Item)`
	background-color: ${props => lighten(0.2, props.theme.color.grey[500])};
	border-color: ${props => lighten(0.3, props.theme.color.grey[500])};
	color: ${props => props.theme.color.grey[100]};
	width: 25%;

	span {
		font-weight: bold;
	}
`

export const StyledBadge = styled(Badge)`
	background-color: ${props => props.theme.color.grey[500]};
	color: ${props => props.theme.color.grey[100]};
`

export const Icon = styled.img`
	vertical-align: middle;
	width: 100%;
	display: inline;
	height: 80px;
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
