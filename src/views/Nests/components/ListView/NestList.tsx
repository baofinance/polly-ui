import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IndexType } from '../../../../contexts/Nests/types'
import { Nest } from '../../../../contexts/Nests'
import NestListItem from './NestListItem'
import { ListLabelCol, ListLabelContainer, NestListContainer } from './styles'
import Loader from '../../../../components/Loader'
import { useWallet } from 'use-wallet'
import useNests from '../../../../hooks/useNests'

import 'react-tabs/style/react-tabs.css'
import '../tab-styles.css'

interface NestWithIssuedTokens extends Nest {}

const NestList: React.FC = () => {
	const [nests] = useNests()
	const { account } = useWallet()

	const indexes: { [key: string]: NestWithIssuedTokens[] } = {
		[IndexType.TEST]: [],
	}

	nests.forEach((nest, i) => {
		const nestWithIssuedTokens = {
			...nest,
			indexType: nest.indexType || IndexType.TEST,
		}

		indexes[nestWithIssuedTokens.indexType].push(nestWithIssuedTokens)
	})

	return (
		<NestListContainer>
			<ListLabelContainer>
				<ListLabelCol width={'17.5%'} align={'left'}>Nest Name</ListLabelCol>
				<ListLabelCol width={'45%'} align={'center'}>Underlying Assets</ListLabelCol>
				<ListLabelCol width={'10%'} align={'center'}>Current Price</ListLabelCol>
				<ListLabelCol width={'10%'} align={'center'}>24H Change</ListLabelCol>
				<ListLabelCol width={'17.5%'} align={'center'}></ListLabelCol>
			</ListLabelContainer>
			{indexes[IndexType.TEST].length ? (
				indexes[IndexType.TEST].map((nest, i) => (
					<React.Fragment key={i}>
						<NestListItem nest={nest} />
						{i + 1 !== 0 && <StyledSpacer />}
					</React.Fragment>
				))
			) : (
				<StyledLoadingWrapper>
					<Loader text="Cooking the rice ..." />
				</StyledLoadingWrapper>
			)}
		</NestListContainer>
	)
}

const StyledLoadingWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	justify-content: center;
`

const StyledSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

export default NestList
