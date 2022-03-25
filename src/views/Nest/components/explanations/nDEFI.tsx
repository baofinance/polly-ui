import Separator from 'components/Separator'
import Spacer from 'components/Spacer'
import React from 'react'
import { NestHeader, NestList, NestSubHeader } from '../styles'

const nDEFI: React.FC = () => (
	<>
		<NestHeader>Description</NestHeader>
		<p>
			The Polly DeFi Nest takes the top 5 projects by TVL on Defillama, which
			have liquidity on Polygon. Each project is weighted on the TVL divided by
			Fully Diluted Valuation (FDV).
		</p>
		<Spacer />
		<NestHeader>Objective</NestHeader>
		<p>
			To generate revenue a defi project needs value deposited into their
			contracts. This makes Total Value Locked (TVL) a key metric for evaluating
			a project's ability to generate revenue.
		</p>
		<p>
			Projects with a high TVL are also likely to gain more traction in the
			market through the network effects the existing capital provides - capital
			attracts more capital.
		</p>
		<p>
			The weighting formula allows the nest to invest in projects gaining
			traction earlier and with a greater weighting than market cap weighted
			competitors, attempting to invest more in projects that could be
			undervalued by the market.
		</p>
		<p>
			The Polly DeFi Nest will provide the crypto industry's first automated,
			yield bearing, value investing, decentralized, tokenized portfolios.
		</p>
		<Spacer />
		<NestHeader>Criteria</NestHeader>
		<p>
			For a project to be included in the Polly Defi Nest, it must fit the below
			criteria in order to reduce the risk of the nest and fit the desires of
			the community.
		</p>
		<NestSubHeader>Characteristics</NestSubHeader>
		<NestList>
			<li>
				The protocols will be selected by TVL based on DeFiLlama’s website.
			</li>
			<li>Have at least $250k liquidity on Polygon.</li>
			<li>Have a Chainlink Price feed on Polygon.</li>
			<li>
				Have at least 7.5% of the total supply in circulation and have a
				predictable token emission over the next 5 years.
			</li>
			<li>
				The protocol must be running for 3 months before qualifying to be
				included in the nest.
			</li>
			<li>
				In the event of a safety incident, the team must have addressed the
				problem responsibly and promptly, providing users of the protocol a
				reliable solution and document a detailed, transparent breakdown of the
				incident.
			</li>
			<li>Be Ethereum-focused</li>
			<li>Must be sufficiently decentralised</li>
		</NestList>
		<Spacer />
		<NestHeader>Strategy</NestHeader>
		<p>
			It is possible for the underlying tokens to utilize strategies that will
			earn yield, maximising value for nest holders, who benefit from this
			productivity without having to perform any actions themselves. These
			strategies will be changed over time to take advantage of new
			opportunities or to maximise the yield earned.
		</p>
		<Spacer />
		<NestHeader>Management</NestHeader>
		<p>The Nest is maintained quarterly in two phases.</p>
		<p>
			<NestSubHeader>Determination Phase</NestSubHeader>
		</p>
		<p>
			The determination phase takes place during the final 2 weeks of the
			quarter. During this phase the changes needed for the next reconstitution
			are determined. The TVL and FDV of each project are recorded, including
			new projects that qualify for the nest and meet the criteria.
		</p>
		<p>
			Proposed changes will be published on the governance forum for 1 week then
			a governance vote will run for the community to approve changes.
		</p>
		<p>
			<NestSubHeader>Reconstitution Phase</NestSubHeader>
		</p>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
	</>
)

export default nDEFI
