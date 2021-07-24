import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DogeMan from './sample-img-to-remove/doge.png'
import Button from '../../../../components/Button'
import { AssetImage, ListCol, ColumnText, ListItemContainer } from './styles'

import { useWallet } from 'use-wallet'
import useBao from '../../../../hooks/useBao'
import 'react-tabs/style/react-tabs.css'
import '../tab-styles.css'
import { Nest } from '../../../../contexts/Nests'
import { margin } from 'polished'

interface NestWithIssuedTokens extends Nest {}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const { account } = useWallet()
	const { nestTokenAddress } = nest
	const bao = useBao()

	const indexActive = true // startTime * 1000 - Date.now() <= 0

	return (
		<ListItemContainer>
			<ListCol width={'20%'} align={'left'}>
				🦜
				<AssetImage src={nest.icon} />
				<ColumnText>{nest.nestToken}</ColumnText>
			</ListCol>
			<ListCol width={'40%'} align={'center'}>
				<ColumnText>🦜🦜🦜🦜🦜🦜🦜🦜</ColumnText>
			</ListCol>
			<ListCol width={'15%'} align={'center'}>
				<ColumnText>$1.50</ColumnText>
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
				></Button>
			</ListCol>
		</ListItemContainer>
	)
}

// Props and stuff

interface NestListItemProps {
	nest: NestWithIssuedTokens
}

export default NestListItem
