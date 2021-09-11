import Loader from 'components/Loader'
import { Nest } from 'contexts/Nests'
import { IndexType } from 'contexts/Nests/types'
import useNests from 'hooks/useNests'
import React from 'react'
import 'react-tabs/style/react-tabs.css'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import '../tab-styles.css'
import NestListItem from './NestListItem'
import { ListLabelCol, ListLabelContainer, NestListContainer } from './styles'

interface NestWithIssuedTokens extends Nest {}

const NestList: React.FC = () => {
	const [nests] = useNests()
	const { account } = useWallet()

	const indexes: { [key: string]: NestWithIssuedTokens[] } = {
		[IndexType.NESTS]: [],
	}

	nests.forEach((nest, i) => {
		const nestWithIssuedTokens = {
			...nest,
			indexType: nest.indexType || IndexType.NESTS,
		}

		indexes[nestWithIssuedTokens.indexType].push(nestWithIssuedTokens)
	})

	return (
		<NestListContainer>
			<ListLabelContainer>
				<ListLabelCol width={'17.5%'} align={'left'}>
					Nest Name
				</ListLabelCol>
				<ListLabelCol width={'37.5%'} align={'center'}>
					Underlying Assets
				</ListLabelCol>
				<ListLabelCol width={'15%'} align={'center'}>
					Cost to Mint
				</ListLabelCol>
				<ListLabelCol width={'15%'} align={'center'}>
					24H Change
				</ListLabelCol>
				<ListLabelCol width={'15%'} align={'center'} />
			</ListLabelContainer>
			{indexes[IndexType.NESTS].length ? (
				indexes[IndexType.NESTS].map((nest, i) => (
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
