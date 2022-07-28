import { FeeBadge } from 'components/Badge'
import { IconContainer, StyledIcon } from 'components/Icon'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ActiveSupportedNest } from '../../../bao/lib/types'
import { ListHeader, ListItem, ListItemHeader } from '../../../components/List'
import { SpinnerLoader } from '../../../components/Loader'
import Tooltipped from '../../../components/Tooltipped'
import useComposition from '../../../hooks/baskets/useComposition'
import useNestRate from '../../../hooks/baskets/useNestRate'
import { getDisplayBalance } from '../../../utils/numberFormat'

const NestList: React.FC<NestListProps> = ({ nests }) => {
	return (
		<>
			<ListHeader
				headers={['Nest Name', 'Underlying Assets', 'Cost to Mint']}
			/>
			{nests &&
				nests.map((nest) => <NestListItem nest={nest} key={nest.nid} />)}
		</>
	)
}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const composition = useComposition(nest)

	const navigate = useNavigate()
	const handleClick = () => navigate(`/nests/${nest.nid}`)

	const { nestAddress } = nest
	const { usdPerIndex } = useNestRate(nestAddress)

	return (
		<ListItem onClick={handleClick}>
			<ListItemHeader>
				<Row lg={3} style={{ width: '100%' }}>
					<Col>
						<IconContainer>
							<StyledIcon src={nest.icon} alt={nest.symbol} />
							<span
								style={{ display: 'inline-block', verticalAlign: 'middle' }}
							>
								<p style={{ margin: '0', lineHeight: '1.2rem' }}>
									{nest.symbol}
								</p>
								<SubText>{nest.desc}</SubText>
							</span>
						</IconContainer>
					</Col>
					<Col>
						{composition ? (
							composition.map((component: any) => {
								return (
									<Tooltipped content={component.symbol} key={component.symbol}>
										<StyledIcon src={component.image} />
									</Tooltipped>
								)
							})
						) : (
							<SpinnerLoader />
						)}
					</Col>
					<Col>
						<span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
							<p style={{ margin: '0', lineHeight: '1.2rem' }}>
								$
								{usdPerIndex ? (
									getDisplayBalance(usdPerIndex, 0)
								) : (
									<SpinnerLoader />
								)}
							</p>
							<FeeBadge>0% Fee</FeeBadge>
						</span>
					</Col>
				</Row>
			</ListItemHeader>
		</ListItem>
	)
}

type NestListProps = {
	nests: ActiveSupportedNest[]
}

type NestListItemProps = {
	nest: ActiveSupportedNest
}

export default NestList

const SubText = styled.p`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 0.875rem;
	margin: 0;
	line-height: 1rem;
`
