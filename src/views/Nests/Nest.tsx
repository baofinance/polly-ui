import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Config from 'bao/lib/config'
import { PriceBadge, StyledBadge } from 'components/Badge'
import { CornerButton, CornerButtons } from 'components/Button/Button'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Tooltipped from 'components/Tooltipped'
import useReservesPrices from 'hooks/baskets/useReservesPrices'
import React, { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SpinnerLoader } from '../../components/Loader'
import useComposition from '../../hooks/baskets/useComposition'
import useNestInfo from '../../hooks/baskets/useNestInfo'
import useNestRate from '../../hooks/baskets/useNestRate'
import useNests from '../../hooks/baskets/useNests'
import usePairPrice from '../../hooks/baskets/usePairPrice'
import { getDisplayBalance } from '../../utils/numberFormat'
import Analytics from './components/Analytics'
import Composition from './components/Composition'
import Description from './components/Description'
import BasketButtons from './components/NestButtons'
import BasketStats from './components/NestStats'

const Nest: React.FC = () => {
	const { nestId } = useParams()
	const nests = useNests()

	const nest = useMemo(
		() => nests && nests.find((nest) => nest.nid.toString() === nestId),
		[nests],
	)
	const composition = useComposition(nest)
	const info = useNestInfo(nest)
	const pairPrice = usePairPrice(nest)
	const { wethPrice, usdPerIndex } = useNestRate(nest && nest.nestAddress)
	const reservePrices = useReservesPrices()
	const sushiPairPrice = useMemo(
		() => reservePrices && reservePrices[nest.nestAddress.toLowerCase()],
		[reservePrices],
	)

	return (
		<Page>
			<Container>
				<CornerButtons>
					<Tooltipped content="View Contract">
						<CornerButton
							href={`${Config.defaultRpc.blockExplorerUrls[0]}/address/${
								nest && nest.nestAddress
							}`}
							target="_blank"
						>
							<FontAwesomeIcon icon="file-contract" />
						</CornerButton>
					</Tooltipped>
				</CornerButtons>
				<StyledPageHeader>
					<PageHeader icon={nest && nest.icon} />
					<br />
					<StyledBadge>
						1 {nest && nest.name} ={' '}
						{(wethPrice &&
							sushiPairPrice &&
							getDisplayBalance(sushiPairPrice.div(wethPrice), 0)) || (
							<SpinnerLoader />
						)}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} /> = $
						{(sushiPairPrice && getDisplayBalance(sushiPairPrice, 0)) || (
							<SpinnerLoader />
						)}
					</StyledBadge>{' '}
				</StyledPageHeader>
			</Container>
			<Container>
				<BasketStats
					nest={nest}
					composition={composition}
					rate={usdPerIndex}
					info={info}
					pairPrice={pairPrice}
				/>
				<BasketButtons nest={nest} swapLink={nest && nest.swap} />
				<Analytics nest={nest} />
				<Composition composition={composition} />
				<Description nestAddress={nest && nest.nestAddress} />
			</Container>
		</Page>
	)
}

export default Nest

const StyledPageHeader = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin: ${(props) => props.theme.spacing[6]}px auto 0;
`
