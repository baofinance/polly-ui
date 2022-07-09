import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { IconContainer, StyledIcon } from 'components/Icon'
import { ListHeader, ListItem, ListItemHeader } from 'components/List'
import { SpinnerLoader } from 'components/Loader'
import Tooltipped from 'components/Tooltipped'
import { Nest } from 'contexts/Nests'
import { IndexType } from 'contexts/Nests/types'
import useComposition from 'hooks/baskets/useComposition'
import useGraphPriceHistory from 'hooks/baskets/useGraphPriceHistory'
import useNestRate from 'hooks/baskets/useNestRate'
import useNests from 'hooks/baskets/useNests'
import React, { useMemo } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'react-tabs/style/react-tabs.css'
import { getDisplayBalance } from 'utils/numberFormat'

export const NestList: React.FC = () => {
	const nests = useNests()

	const indexes: { [key: string]: Nest[] } = {
		[IndexType.NESTS]: [],
	}

	nests.forEach((nest) => {
		const nestWithIssuedTokens = {
			...nest,
			indexType: nest.indexType || IndexType.NESTS,
		}

		indexes[nestWithIssuedTokens.indexType].push(nestWithIssuedTokens)
	})

	return (
		<Row>
			<Col>
				<ListHeader
					headers={[
						'Nest Name',
						'Underlying Assets',
						'Cost to Mint',
						'24h Change',
					]}
				/>
				{indexes[IndexType.NESTS].length ? (
					indexes[IndexType.NESTS].map((nest, i) => (
						<React.Fragment key={i}>
							<NestListItem nest={nest} />
						</React.Fragment>
					))
				) : (
					<SpinnerLoader block />
				)}
			</Col>
		</Row>
	)
}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const { nestTokenAddress } = nest
	const { usdPerIndex } = useNestRate(nestTokenAddress)
	const { account } = useWeb3React()

	const indexActive = true // startTime * 1000 - Date.now() <= 0

	const priceHistory = useGraphPriceHistory(nest)
	const nestPriceChange24h = useMemo(() => {
		return (
			priceHistory &&
			new BigNumber(priceHistory[priceHistory.length - 1].close)
				.minus(priceHistory[priceHistory.length - 2].close)
				.div(priceHistory[priceHistory.length - 1].close)
				.times(100)
		)
	}, [priceHistory])

	const composition = useComposition(nest)

	const navigate = useNavigate()
	const handleClick = () => navigate(`/nests/${nest.nid}`)

	return (
		<>
			<ListItem
				style={{ padding: '12px' }}
				onClick={handleClick}
				disabled={!account || !indexActive}
			>
				<ListItemHeader>
					<Row lg={7} style={{ width: '100%' }}>
						<Col style={{ fontWeight: 700 }}>
							<IconContainer>
								<StyledIcon src={nest.icon} alt={nest.nestToken} />
							</IconContainer>
							{nest.nestToken}
						</Col>
						<Col>
							{composition ? (
								composition.map((component: any) => {
									return (
										<Tooltipped
											content={component.symbol}
											key={component.symbol}
										>
											<StyledIcon src={component.imageUrl} />
										</Tooltipped>
									)
								})
							) : (
								<SpinnerLoader />
							)}
						</Col>
						<Col>
							$
							{usdPerIndex ? (
								getDisplayBalance(usdPerIndex, 0)
							) : (
								<SpinnerLoader />
							)}
						</Col>
						<Col>
							{nestPriceChange24h ? (
								<>
									<span
										style={{
											color: nestPriceChange24h.isNaN()
												? 'white'
												: nestPriceChange24h.gt(0)
												? 'green'
												: 'red',
										}}
									>
										{priceHistory &&
											(nestPriceChange24h.isNaN()
												? '~'
												: `${getDisplayBalance(nestPriceChange24h, 0)}%`)}
									</span>
								</>
							) : (
								<SpinnerLoader />
							)}
						</Col>
					</Row>
				</ListItemHeader>
			</ListItem>
		</>
	)
}

interface NestListItemProps {
	nest: Nest
}
