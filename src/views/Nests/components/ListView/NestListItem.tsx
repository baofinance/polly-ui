import React, { useEffect, useState } from 'react'
import { Nest } from '../../../../contexts/Nests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
				<ListCol width={'40%'} align={'center'}>
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
				<ListCol width={'17.5%'} align={'center'}>
					<ColumnText>
						$
						{usdPerIndex ? (
							getDisplayBalance(usdPerIndex, 0)
						) : (
							<SpinnerLoader />
						)}
						<>
							{' '}
							<FontAwesomeIcon icon="arrows-alt-h" />{' '}
						</>
						{(wethPerIndex && getDisplayBalance(wethPerIndex, 0)) || (
							<SpinnerLoader />
						)}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} />
					</ColumnText>
				</ListCol>
				<ListCol width={'15%'} align={'center'}>
					<ColumnText>+10%</ColumnText>
				</ListCol>
				<ListCol width={'10%'} align={'center'}>
					<Button
						width={'100%'}
						disabled={!indexActive}
						text={indexActive ? 'Select' : undefined}
						to={`/nests/${nest.nid}`}
					/>
				</ListCol>
			</ListItemContainer>

			{/* Mobile List */}

			<MobileNestLink
			 href={`/nests/${nest.nid}`}
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

// Props and stuff

interface NestListItemProps {
	nest: NestWithIssuedTokens
}

export default NestListItem
