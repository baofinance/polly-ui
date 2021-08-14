import nestIcon from 'assets/img/egg.png'
import Button from 'components/Button'
import { SpinnerLoader } from 'components/Loader'
import { Nest } from 'contexts/Nests'
import useComposition from 'hooks/useComposition'
import useNestRate from 'hooks/useNestRate'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import 'react-tabs/style/react-tabs.css'
import { useWallet } from 'use-wallet'
import { getDisplayBalance } from 'utils/formatBalance'
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

interface NestWithIssuedTokens extends Nest {}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const { account } = useWallet()
	const { nestTokenAddress } = nest
	const composition = useComposition(nest)
	const { wethPerIndex, usdPerIndex } = useNestRate(nestTokenAddress)

	const indexActive = true // startTime * 1000 - Date.now() <= 0

	return (
		<>
			<ListItemContainer>
				<ListCol width={'17.5%'} align={'left'}>
					<ColumnText>
						<NestImage src={nestIcon} alt={nest.nestToken} />
						{nest.nestToken}
					</ColumnText>
				</ListCol>
				<ListCol width={'45%'} align={'center'}>
					<AssetImageContainer>
						{composition ? (
							composition.map((component: any) => {
								return (
									<OverlayTrigger
										placement="bottom"
										overlay={
											<Tooltip id={component.symbol}>
												{component.symbol}
											</Tooltip>
										}
										key={component.symbol}
									>
										<AssetImage src={component.imageUrl} />
									</OverlayTrigger>
								)
							})
						) : (
							<SpinnerLoader />
						)}
					</AssetImageContainer>
				</ListCol>
				<ListCol width={'10%'} align={'center'}>
					<ColumnText>
						$
						{usdPerIndex ? (
							getDisplayBalance(usdPerIndex, 0)
						) : (
							<SpinnerLoader />
						)}
					</ColumnText>
				</ListCol>
				<ListCol width={'10%'} align={'center'}>
					<ColumnText>+10%</ColumnText>
				</ListCol>
				<ListCol width={'17.5%'} align={'right'}>
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
						<NestImage src={nestIcon} alt={nest.nestToken} />
						<MobileListText>
							<MobileListTitle>{nest.nestToken}</MobileListTitle>
							<MobileListDesc>
								Here is some text for the description area of every nest on the
								mobile layout.
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
								<MobileListDesc>+10%</MobileListDesc>
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
