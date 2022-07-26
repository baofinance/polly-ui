import Config from 'bao/lib/config'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Tex2SVG } from 'react-hook-mathjax'
import styled from 'styled-components'
import Spacer from '../../../components/Spacer'

interface DescriptionProps {
	nestAddress: string
}

const Description: React.FC<DescriptionProps> = ({ nestAddress = '' }) => {
	return (
		<>
			<Container>
				<NestExplanation>
					{nestAddress === Config.addressMap.nDEFI && <NDEFI />}
					{nestAddress === Config.addressMap.nSTBL && <NSTBL />}
					{nestAddress === Config.addressMap.nINFR && <NINFR />}
					{nestAddress === Config.addressMap.nPOLY && <NPOLY />}
				</NestExplanation>
			</Container>
		</>
	)
}

export default Description

const NDEFI: React.FC = () => (
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
		<NestSubHeader>Determination Phase</NestSubHeader>
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
		<NestSubHeader>Reconstitution Phase</NestSubHeader>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
	</>
)

const NSTBL: React.FC = () => (
	<>
		<NestHeader>Description</NestHeader>
		<p>
			The Polly Stable Nest provides a way to diversify counterparty risk on
			stable assets while the underlying assets put to work earning yield on
			various trusted yield farming protocols. Decentralized and non pegged
			stables will be used where yield is available.
		</p>
		<Spacer />
		<NestHeader>Objective</NestHeader>
		<p>
			To provide exposure to a diversified basket of stable coins with a focus
			on yield and decentralization.
		</p>
		<p>
			By spreading risk over a number of coins, you reduce the impact of
			problems any single tokens face. Since the nest does not automatically
			rebalance, one stable losing its peg would not affect the other tokens in
			the nest.
		</p>
		<p>
			By focusing on decentralized stables, you also reduce exposure to
			regulatory risk and do not rely on central issuers to continually act as
			they should.
		</p>
		<p>
			The nest will start with a mixture of centrally issued and decentralized
			stable coins and deposit them in a variety of protocols to earn yield on
			them, swapping strategies regularly to maximize the yield earned.
		</p>
		<p>
			At the start, yield options on polygon were limited for decentralised
			stable tokens, so to provide a greater yield farming return, USDC and
			USDT, which are centrally issued, are included.
		</p>
		<p>
			Over time, we expect the weightings of these coins to be reduced in favor
			of decentralized alternatives once they are sufficiently mature and have
			yield strategies that are suitable for a stables nest on polygon.
		</p>
		<Spacer />
		<NestHeader>Criteria</NestHeader>
		<p>
			For a project to be included in the Polly Stable nest, it must fit the
			below criteria in order to reduce the risk of the nest and fit the desires
			of the community.
		</p>
		<NestSubHeader>Characteristics</NestSubHeader>
		<NestList>
			<li>
				Be a stable token project available on the Ethereum blockchain or
				Polygon.
			</li>
			<li>
				Be in liquid markets and being used in different lending protocols.
			</li>
			<li>
				The protocol must be running for 6 months before qulaifying to be
				included in the nest.
			</li>
			<li>
				In the event of a safety incident, the team must have addressed the
				problem responsibly and promptly, providing users of the protocol a
				reliable solution and document a detailed, transparent breakdown of the
				incident.
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
			<li>Must be sufficiently decentralized and/or collateralized.</li>
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

		<NestSubHeader>Determination Phase</NestSubHeader>
		<p>
			The determination phase takes place during the final 2 weeks of the
			quarter. During this phase the changes needed for the next reconstitution
			are determined. Strategies and allocation % will be revisited in order to
			reach the balance between decentralization and having the most optimal yet
			secure yield possible for those stables. Proposed changes will be
			published on the governance forum for 1 week then a governance vote will
			run for the community to approve changes.
		</p>
		<NestSubHeader>Reconstitution Phase</NestSubHeader>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
		<NestSubHeader>Emergency Maintenance</NestSubHeader>
		<p>
			The multisig holders are authorized by the community to re-balance nests
			outside the usual schedule during moments that they collectively deem to
			be critical emergencies. This clause will allow for quick re-balancing in
			the event of a protocol or nest being in danger of failing.
		</p>
		<p>
			An example of when this would be utilized would be if a stable coin begins
			losing its peg/ becoming insolvent, or a protocol suffers an exploit that
			is not dealt with sufficiently. These scenarios may be time sensitive and
			require immediate resolution. Thus the team may decide to act without
			warning and explain their actions in a governance forum post afterwards,
			or if there is deemed to be time, an emergency governance vote will be
			posted.
		</p>
		<p>
			This is intended as a safety mechanism only, to prevent loss of users
			funds and as such would be a power exclusively exercised under extreme
			circumstances.
		</p>
	</>
)

const NINFR: React.FC = () => (
	<>
		<NestHeader>Description</NestHeader>
		<p>
			The Polly Infrastructure Nest takes the top projects by market
			capitalization, which provide infrastructure to the Polygon ecosystem. In
			this nest the square root of fully diluted market capitalization is used
			to weight the projects.
		</p>
		<Spacer />
		<NestHeader>Objective</NestHeader>
		<p>
			Infrastructure projects provide an environment for an ecosystem to thrive
			on each chain. nINFRA aims to provide an easy way to gain automated, yield
			bearing exposure to any projects providing key infrastructure components
			to the Polygon ecosystem.
		</p>
		<Spacer />
		<NestHeader>Criteria</NestHeader>
		<p>
			For a project to be included in the Polly Infrastructure Nest, it must fit
			the below criteria in order to reduce the risk of the nest and fit the
			desires of the community.
		</p>
		<NestSubHeader>Characteristics</NestSubHeader>
		<NestList>
			<li>Provide key infrastructure for the Polygon ecosystem.</li>
			<li>Have at least $250k in liquidity on Polygon.</li>
			<li>Have a Chainlink price feed on Polygon.</li>
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
				problem responsibly and promptly, providing usuers of the protocol a
				reliable solution and document a detailed, transparent breakdown of the
				incident.
			</li>
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
		<NestSubHeader>Determination Phase</NestSubHeader>
		<p>
			The determination phase takes place during the final 2 weeks of the
			quarter. During this phase the changes needed for the next reconstitution
			are determined. The FDV of each project is recorded, including new
			projects that qualify for the nest and meet the criteria.
		</p>
		<p>
			Proposed changes will be published on the governance forum for 1 week then
			a governance vote will run for the community to approve changes.
		</p>
		<NestSubHeader>Reconstitution Phase</NestSubHeader>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
	</>
)

const NPOLY: React.FC = () => (
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
		<NestSubHeader>Determination Phase</NestSubHeader>
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
		<NestSubHeader>Reconstitution Phase</NestSubHeader>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
	</>
)

export const NestHeader = styled.div`
	font-family: 'Rubik', sans-serif;
	color: ${(props) => props.theme.color.text[100]};
	margin: auto;
	font-size: 1.5rem;

	p {
		margin: 0;
	}

	span.badge {
		font-size: 1.25rem;
		margin-bottom: ${(props) => props.theme.spacing[3]}px;
	}

	span.smalltext {
		float: right;
		font-size: 1rem;
		margin-top: ${(props) => props.theme.spacing[3]}px;
		margin-left: ${(props) => props.theme.spacing[2]}px;
	}

	img {
		text-align: center;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		font-size: 1.5rem;
	}
`

export const NestSubHeader = styled.h1`
	font-family: 'Rubik', sans-serif;
	color: ${(props) => props.theme.color.text[100]};
	margin-bottom: ${(props) => props.theme.spacing[2]}px;
	margin-top: 0;
	font-size: 1.25rem;

	small {
		display: block;
		font-family: 'Rubik', sans-serif;
		font-size: 1.5rem;
		margin-top: ${(props) => props.theme.spacing[1]}px;
	}
`

export const NestList = styled.ul`
	margin-left: ${(props) => props.theme.spacing[4]}px;
`

export const NestExplanation = styled.div`
	background: ${(props) => props.theme.color.primary[100]};
	color: ${(props) => props.theme.color.text[100]};
	text-align: left;
	width: 100%;
	margin-top: ${(props) => props.theme.spacing[4]}px;
	padding: ${(props) => props.theme.spacing[4]}px;
	border-radius: ${(props) => props.theme.borderRadius}px;

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		width: 100%;
		padding: ${(props) => props.theme.spacing[4]}px;
		margin-top: ${(props) => props.theme.spacing[4]}px;
	}
`
