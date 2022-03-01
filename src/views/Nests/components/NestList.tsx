import Loader from 'components/Loader'
import { Nest } from 'contexts/Nests'
import { IndexType } from 'contexts/Nests/types'
import useNests from 'hooks/baskets/useNests'
import React from 'react'
import 'react-tabs/style/react-tabs.css'
import { useWallet } from 'use-wallet'
import NestListItem from './NestListItem'
import {
	ListLabelCol,
	ListLabelContainer,
	NestListContainer,
	StyledLoadingWrapper,
	StyledSpacer,
} from './styles'

const NestList: React.FC = () => {
	const [nests] = useNests()
	const { account } = useWallet()

	const indexes: { [key: string]: Nest[] } = {
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

export default NestList
