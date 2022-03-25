import BigNumber from 'bignumber.js'
import React, { useMemo } from 'react'
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

const StatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: ${(props) => props.theme.spacing[2]};
	margin-inline: 0px;
	margin-bottom: 0px;
	background: ${(props) => props.theme.color.transparent[100]};
	padding: 16px;
	border-radius: 8px;
	margin-bottom: 1rem;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		padding: 15px 30px;	
		}
`

const StatHeader = styled.div`
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

const StatText = styled.div`
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
