import Spacer from 'components/Spacer'
import React from 'react'
import { Tex2SVG } from 'react-hook-mathjax'
import { NestHeader, NestList, NestSubHeader } from '../styles'

const nPOLY: React.FC = () => (
	<>
		<NestHeader>Description</NestHeader>
		<p>
			Top 4 projects by TVL on Polygon that are not included in nDEFI. Each
			project is weighted using the TVL on Polygon, overall TVL and Fully
			Diluted Valuation (FDV), shown by the formula below.
		</p>
				<p>
			<Tex2SVG display="inline" latex="TvlFactor = {\frac{TVL}{FDV}}" />
		</p>
		<p>
			<Tex2SVG
				display="inline"
				latex="PolyTvlFactor = \sqrt{100 x  {\frac{Token Polygon TVL}{Nest Polygon TVL}}}"
			/>
		</p>
		<p>
			<Tex2SVG
				display="inline"
				latex="Weighting = {\frac{TvlFactor + PolyTvlFactor}{allTokensTvlFactor + allTokensPolyTvlFactor}}"
			/>
		</p>
		<Spacer />
		<NestHeader>Objective</NestHeader>
		<p>
			To generate revenue a defi project needs value deposited into their
			contracts. This makes Total Value Locked (TVL) a key metric for evaluating
			a project's ability to generate revenue.
		</p>
		<p>
			The weighting formula allows the nest to invest in projects gaining
			traction earlier and with a greater weighting than market cap weighted
			competitors, attempting to invest more in projects that could be
			undervalued by the market.
		</p>
		<p>
			The Polygon Ecosystem nest aims to provide an automated, yield bearing way
			to value invest in the top projects providing TVL on Polygon.
		</p>
		<Spacer />
		<NestHeader>Criteria</NestHeader>
		<p>
			For a project to be included in the Polly Polygon nest, it must fit the
			below criteria in order to reduce the risk of the nest and fit the desires
			of the community.
		</p>
		<NestSubHeader>Characteristics</NestSubHeader>
		<NestList>
			<li>
				Top 4 projects by TVL on Polygon that are not included in nDEFI and meet
				all criteria.
			</li>
			<li>Have at least $250k in liqudity on Polygon.</li>
			<li>
				Have at least 7.5% of the total supply in circulation and have a
				predictable token emission ovver the next 5 years.
			</li>
			<li>The protocol must be running on Polygon for over 3 months.</li>
			<li>
				In the event of a safety incident, the team must have addressed the
				prpoblem responsibly and promptly, providing users of the protocol a
				reliable solution and document a detailed, transparent breakdown of the
				incident.
			</li>
			<li>Must be sufficiently decentralized.</li>
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

export default nPOLY
