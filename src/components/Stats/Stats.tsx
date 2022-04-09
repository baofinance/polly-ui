import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

type Stat = {
	label: string
	value: any
}

type StatBlockProps = {
	label: string
	stats: Stat[]
}

export const StatBlock = ({ label, stats }: StatBlockProps) => (
	<>
		<StatHeader>
			<p>{label}</p>
		</StatHeader>
		<StatWrapper>
			{stats.map(({ label, value }) => (
				<StatText key={label}>
					<p>{label}</p>
					<p style={{ textAlign: 'end' }}>{value}</p>
				</StatText>
			))}
		</StatWrapper>
	</>
)

export const StatHeader = styled.div`
	color: ${(props) => props.theme.color.text[100]};
	font-size: ${(props) => props.theme.fontSize.sm};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	text-align: center;
	margin-top: 0.5rem;

	p {
		margin-top: 0.25rem;
		margin-inline: 0px;
		margin-bottom: 0px;
	}
`

export const StatText = styled.div`
	transition-property: all;
	transition-duration: 200ms;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	font-size: ${(props) => props.theme.fontSize.default};
	padding-top: ${(props) => props.theme.spacing[1]}px;
	padding-bottom: ${(props) => props.theme.spacing[1]}px;
	padding-left: ${(props) => props.theme.spacing[2]}px;
	padding-right: ${(props) => props.theme.spacing[2]}px;
	border-radius: 8px;

	p {
		color: ${(props) => props.theme.color.text[100]};
		font-size: ${(props) => props.theme.fontSize.default};
		font-weight: ${(props) => props.theme.fontWeight.medium};
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin: 0px;
		margin-top: 0px;
		margin-inline: 0.5rem 0px;
		margin-bottom: 0px;
	}
`

export const UserStatsContainer = styled(Row)`
	margin: auto;
	justify-content: space-evenly;
`

export const UserStatsWrapper = styled(Col)`
	align-items: center;
	display: flex;
	flex-flow: row wrap;
	margin-right: -0.665rem;
	margin-left: -0.665rem;
	justify-content: space-evenly;
`

export const StatWrapper = styled(Col)`
	background-color: ${(props) => props.theme.color.transparent[100]};
	margin: 0.5rem 0.5rem;
	border-radius: 8px;
	position: relative;
	flex: 1 1 0%;
	padding-inline-start: 1rem;
	padding-inline-end: 1rem;
	padding: 1.25rem 16px;
	border: none;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		padding: 1rem 12px;
		padding-inline-start: 0.75rem;
		padding-inline-end: 0.75rem;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		min-width: 120px;
	}
`

export const UserStat = styled.div`
	overflow-wrap: break-word;
	text-align: center;

	p {
		font-size: 1rem;
		margin: 0px;

		@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
			font-size: 0.875rem;
		}
	}

	h1 {
		font-size: 0.875rem;
		color: ${(props) => props.theme.color.text[200]};
		margin: 0px;

		@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
			font-size: 0.75rem;
		}
	}
`

export const StatsRow = styled(Row)`
  width: 100%;
  margin: ${(props) => props.theme.spacing[6]}px auto;
  display: flex;
  flex-direction: row;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    width: 100%;
    background: ${(props) => props.theme.color.transparent[100]};
    border-radius: ${(props) => props.theme.borderRadius}px;
    margin: ${(props) => props.theme.spacing[4]}px auto;
  }
`

export const StatCard = styled.div`
  background: ${(props) => props.theme.color.transparent[100]};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing[3]}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-align: center;
  color: ${(props) => props.theme.color.text[100]};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: ${(props) => props.theme.spacing[2]}px;
    background: transparent;
  }
`

