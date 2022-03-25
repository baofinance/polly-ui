import Spacer from 'components/Spacer'
import React from 'react'
import { NestHeader, NestList, NestSubHeader } from '../styles'

const nSTBL: React.FC = () => (
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

		<p>
			<NestSubHeader>Determination Phase</NestSubHeader>
		</p>
		<p>
			The determination phase takes place during the final 2 weeks of the
			quarter. During this phase the changes needed for the next reconstitution
			are determined. Strategies and allocation % will be revisited in order to
			reach the balance between decentralization and having the most optimal yet
			secure yield possible for those stables. Proposed changes will be
			published on the governance forum for 1 week then a governance vote will
			run for the community to approve changes.
		</p>
		<p>
			<NestSubHeader>Reconstitution Phase</NestSubHeader>
		</p>
		<p>
			In the two weeks following a successful vote, the nest components will be
			adjusted as per the instructions published during the final 2 weeks of the
			quarter.
		</p>
		<p>
			<NestSubHeader>Emergency Maintenance</NestSubHeader>
		</p>
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

export default nSTBL
