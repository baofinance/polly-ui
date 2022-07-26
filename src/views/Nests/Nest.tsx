import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Config from 'bao/lib/config'
import { StyledBadge } from 'components/Badge'
import { CornerButton, CornerButtons } from 'components/Button/Button'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Tooltipped from 'components/Tooltipped'
import React, { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SpinnerLoader } from '../../components/Loader'
import useComposition from '../../hooks/baskets/useComposition'
import useNestInfo from '../../hooks/baskets/useNestInfo'
import useNestRates from '../../hooks/baskets/useNestRate'
import useNests from '../../hooks/baskets/useNests'
import usePairPrice from '../../hooks/baskets/usePairPrice'
import { getDisplayBalance } from '../../utils/numberFormat'
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
	const rates = useNestRates(nest && nest.address)
	const info = useNestInfo(nest)
	const pairPrice = usePairPrice(nest)

	return (
		<Page>
			<Container>
				<CornerButtons>
					<Tooltipped content="View Contract">
						<CornerButton
							href={`${Config.defaultRpc.blockExplorerUrls[0]}/address/${
								nest && nest.nestAddresses[1]
							}`}
							target="_blank"
						>
							<FontAwesomeIcon icon="file-contract" />
						</CornerButton>
					</Tooltipped>
				</CornerButtons>
				<StyledPageHeader>
					<PageHeader icon={nest && nest.icon} title={nest && nest.symbol} />
					<br />
					<StyledBadge>
						1 {nest && nest.symbol} ={' '}
						{rates ? (
							<>
								<FontAwesomeIcon icon={['fab', 'ethereum']} />{' '}
								{getDisplayBalance(rates.wethPerIndex)}{' '}
								<FontAwesomeIcon icon="angle-double-right" />{' '}
								{`$${getDisplayBalance(rates.usdPerIndex)}`}
							</>
						) : (
							<SpinnerLoader />
						)}
					</StyledBadge>
				</StyledPageHeader>
			</Container>
			<Container>
				<BasketStats
					nest={nest}
					composition={composition}
					rates={rates}
					info={info}
					pairPrice={pairPrice}
				/>
				<BasketButtons nest={nest} swapLink={nest && nest.swap} />
				<Composition composition={composition} />
				<Description nestAddress={nest && nest.nestAddresses[1]} />
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
