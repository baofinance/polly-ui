import React, { useEffect, useState } from 'react'

import Button from '../../../../components/Button'
import { AssetImage, AssetImageContainer, NestImage, ListCol, ColumnText, ListItemContainer } from './styles'

import { useWallet } from 'use-wallet'
import 'react-tabs/style/react-tabs.css'
import '../tab-styles.css'
import { Nest } from '../../../../contexts/Nests'
import { getDisplayBalance } from '../../../../utils/formatBalance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SpinnerLoader } from '../../../../components/Loader'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import useComposition from '../../../../hooks/useComposition'
import useNestRate from '../../../../hooks/useNestRate'

const nestIcon =
	'https://raw.githubusercontent.com/pie-dao/brand/master/PIE%20Tokens/PLAY.svg'

interface NestWithIssuedTokens extends Nest {}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const { account } = useWallet()
	const { nestTokenAddress } = nest
	const composition = useComposition(nest.composition)
	const { wethPerIndex, usdPerIndex } = useNestRate(nestTokenAddress)

	const indexActive = true // startTime * 1000 - Date.now() <= 0

	return (
		<ListItemContainer>
			<ListCol width={'20%'} align={'left'}>
				<ColumnText>
					<NestImage src={nestIcon} alt={nest.nestToken} />
					{nest.nestToken}
				</ColumnText>
			</ListCol>
			<ListCol width={'40%'} align={'center'}>
				<AssetImageContainer>
					{ composition ? composition.map((component: any) => {
						return (
							<OverlayTrigger
								placement='bottom'
								overlay={<Tooltip id={component.symbol}>{component.symbol}</Tooltip>}
								key={component.symbol}
							>
								<AssetImage src={component.imageUrl} />
							</OverlayTrigger>
						)
					}) : <SpinnerLoader /> }
				</AssetImageContainer>
			</ListCol>
			<ListCol width={'15%'} align={'center'}>
				<ColumnText>
					${usdPerIndex ? getDisplayBalance(usdPerIndex, 0) : <SpinnerLoader />}
					<> <FontAwesomeIcon icon='arrows-alt-h' /> </>
					{wethPerIndex && getDisplayBalance(wethPerIndex, 0) || <SpinnerLoader />} <FontAwesomeIcon icon={['fab', 'ethereum']} />
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
	)
}

// Props and stuff

interface NestListItemProps {
	nest: NestWithIssuedTokens
}

export default NestListItem
