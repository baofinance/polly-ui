import React, { useEffect, useState } from 'react'
import { Nest } from '../../../../contexts/Nests'
import { SpinnerLoader } from '../../../../components/Loader'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Button from '../../../../components/Button'
import {
	AssetImage,
	AssetImageContainer,
	NestImage,
	ListCol,
	ColumnText,
	ListItemContainer,
	MobileListItemContainer,
	MobileListItemWrapper,
	MobileListText,
	MobileListTitle,
	MobileListDesc,
	MobileListPrice,
	MobileListChange,
	MobileNestLink,
} from './styles'
import { getDisplayBalance } from '../../../../utils/formatBalance'
import { useWallet } from 'use-wallet'
import useComposition from '../../../../hooks/useComposition'
import useNestRate from '../../../../hooks/useNestRate'

import 'react-tabs/style/react-tabs.css'
import '../tab-styles.css'

import nestIcon from '../../../../assets/img/egg.png'

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
					<div style={{height:'50px'}}>
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

			<MobileNestLink
			 exact
			 activeClassName="active"
			 to={`/nests/${nest.nid}`}
			 >
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
