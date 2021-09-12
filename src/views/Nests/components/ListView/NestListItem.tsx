import Button from 'components/Button'
import { SpinnerLoader } from 'components/Loader'
import { Nest } from 'contexts/Nests'
import useComposition from 'hooks/useComposition'
import useNestRate from 'hooks/useNestRate'
import React, { useMemo } from 'react'
import 'react-tabs/style/react-tabs.css'
import { useWallet } from 'use-wallet'
import { getDisplayBalance } from 'utils/formatBalance'
import Tooltipped from '../../../../components/Tooltipped'
import '../tab-styles.css'
import {
	AssetImage,
	AssetImageContainer,
	ColumnText,
	ListCol,
	ListItemContainer,
	MobileListChange,
	MobileListDesc,
	MobileListItemContainer,
	MobileListItemWrapper,
	MobileListPrice,
	MobileListText,
	MobileListTitle,
	MobileNestLink,
	NestImage,
} from './styles'
import useGraphPriceHistory from 'hooks/useGraphPriceHistory'
import { BigNumber } from 'bignumber.js'

interface NestWithIssuedTokens extends Nest {}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const { account } = useWallet()
	const { nestTokenAddress } = nest
	const composition = useComposition(nest)
	const { usdPerIndex } = useNestRate(nestTokenAddress)

	const indexActive = true // startTime * 1000 - Date.now() <= 0

	const priceHistory = useGraphPriceHistory(nest)
	const indexPriceChange24h = useMemo(() => {
		return (
			priceHistory &&
			new BigNumber(priceHistory[priceHistory.length - 1].close)
				.minus(priceHistory[priceHistory.length - 2].close)
				.div(priceHistory[priceHistory.length - 1].close)
				.times(100)
		)
	}, [priceHistory])

	return (
		<>
			<ListItemContainer>
				<ListCol width={'17.5%'} align={'left'}>
					<ColumnText>
						<NestImage src={nest.icon} alt={nest.nestToken} />
						{nest.nestToken}
					</ColumnText>
				</ListCol>
				<ListCol width={'37.5%'} align={'center'}>
					<AssetImageContainer>
						{composition ? (
							composition.map((component: any) => {
								return (
									<Tooltipped content={component.symbol} key={component.symbol}>
										<AssetImage src={component.imageUrl} />
									</Tooltipped>
								)
							})
						) : (
							<SpinnerLoader />
						)}
					</AssetImageContainer>
				</ListCol>
				<ListCol width={'15%'} align={'center'}>
					<ColumnText>
						$
						{usdPerIndex ? (
							getDisplayBalance(usdPerIndex, 0)
						) : (
							<SpinnerLoader />
						)}
					</ColumnText>
				</ListCol>
				<ListCol width={'15%'} align={'center'}>
					<ColumnText>
						{indexPriceChange24h ? (
							<>
								<span
									style={{
										color: indexPriceChange24h.gt(0) ? 'green' : 'red',
									}}
								>
									{priceHistory && getDisplayBalance(indexPriceChange24h, 0)}
									{'%'}
								</span>
							</>
						) : (
							<SpinnerLoader />
						)}
					</ColumnText>
				</ListCol>
				<ListCol width={'15%'} align={'right'}>
					<div style={{ height: '50px' }}>
						<Button
							width={'90%'}
							disabled={!indexActive}
							text={indexActive ? 'Select' : undefined}
							to={`/nests/${nest.nid}`}
						/>
					</div>
				</ListCol>
			</ListItemContainer>

			{/* Mobile List */}

			<MobileNestLink exact activeClassName="active" to={`/nests/${nest.nid}`}>
				<MobileListItemWrapper>
					<MobileListItemContainer>
						<NestImage src={nest.icon} alt={nest.nestToken} />
						<MobileListText>
							<MobileListTitle>{nest.nestToken}</MobileListTitle>
							<MobileListDesc>
								Complete exposure to key DeFi sectors.
							</MobileListDesc>
						</MobileListText>
						<MobileListPrice>
							{' '}
							<span>
								$
								{usdPerIndex ? (
									getDisplayBalance(usdPerIndex, 0)
								) : (
									<SpinnerLoader />
								)}
							</span>
							<MobileListChange>
								<MobileListDesc>~</MobileListDesc>
							</MobileListChange>
						</MobileListPrice>
					</MobileListItemContainer>
				</MobileListItemWrapper>
			</MobileNestLink>
		</>
	)
}

interface NestListItemProps {
	nest: NestWithIssuedTokens
}

export default NestListItem
