import Typography from '@/components/Typography'
import React from 'react'

const nSTBL: React.FC = () => (
	<>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Description
		</Typography>
		<Typography variant='p' className='my-4'>
			The Polly Stable Nest provides a way to diversify counterparty risk on stable assets while the underlying assets put to work earning
			yield on various trusted yield farming protocols. Decentralized and non pegged stables will be used where yield is available.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Objective
		</Typography>
		<Typography variant='p' className='my-4'>
			To provide exposure to a diversified basket of stable coins with a focus on yield and decentralization.
		</Typography>
		<Typography variant='p' className='my-4'>
			By spreading risk over a number of coins, you reduce the impact of problems any single tokens face. Since the nest does not
			automatically rebalance, one stable losing its peg would not affect the other tokens in the nest.
		</Typography>
		<Typography variant='p' className='my-4'>
			By focusing on decentralized stables, you also reduce exposure to regulatory risk and do not rely on central issuers to continually
			act as they should.
		</Typography>
		<Typography variant='p' className='my-4'>
			The nest will start with a mixture of centrally issued and decentralized stable coins and deposit them in a variety of protocols to
			earn yield on them, swapping strategies regularly to maximize the yield earned.
		</Typography>
		<Typography variant='p' className='my-4'>
			At the start, yield options on polygon were limited for decentralised stable tokens, so to provide a greater yield farming return,
			USDC and USDT, which are centrally issued, are included.
		</Typography>
		<Typography variant='p' className='my-4'>
			Over time, we expect the weightings of these coins to be reduced in favor of decentralized alternatives once they are sufficiently
			mature and have yield strategies that are suitable for a stables nest on polygon.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Criteria
		</Typography>
		<Typography variant='p' className='my-4'>
			For a project to be included in the Polly Stable nest, it must fit the below criteria in order to reduce the risk of the nest and fit
			the desires of the community.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Characteristics
		</Typography>
		<ul className='ml-8 list-disc'>
			<li>Be a stable token project available on the Ethereum blockchain or Polygon.</li>
			<li>Be in liquid markets and being used in different lending protocols.</li>
			<li>The protocol must be running for 6 months before qulaifying to be included in the nest.</li>
			<li>
				In the event of a safety incident, the team must have addressed the problem responsibly and promptly, providing users of the
				protocol a reliable solution and document a detailed, transparent breakdown of the incident.
			</li>
			<li>The protocol must be running for 3 months before qualifying to be included in the nest.</li>
			<li>
				In the event of a safety incident, the team must have addressed the problem responsibly and promptly, providing users of the
				protocol a reliable solution and document a detailed, transparent breakdown of the incident.
			</li>
			<li>Must be sufficiently decentralized and/or collateralized.</li>
		</ul>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Strategy
		</Typography>
		<Typography variant='p' className='my-4'>
			It is possible for the underlying tokens to utilize strategies that will earn yield, maximising value for nest holders, who benefit
			from this productivity without having to perform any actions themselves. These strategies will be changed over time to take advantage
			of new opportunities or to maximise the yield earned.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Management
		</Typography>
		<Typography variant='p' className='my-4'>
			The Nest is maintained quarterly in two phases.
		</Typography>

		<Typography variant='xl' className='my-4'>
			Determination Phase
		</Typography>
		<Typography variant='p' className='my-4'>
			The determination phase takes place during the final 2 weeks of the quarter. During this phase the changes needed for the next
			reconstitution are determined. Strategies and allocation % will be revisited in order to reach the balance between decentralization
			and having the most optimal yet secure yield possible for those stables. Proposed changes will be published on the governance forum
			for 1 week then a governance vote will run for the community to approve changes.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Reconstitution Phase
		</Typography>
		<Typography variant='p' className='my-4'>
			In the two weeks following a successful vote, the nest components will be adjusted as per the instructions published during the final
			2 weeks of the quarter.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Emergency Maintenance
		</Typography>
		<Typography variant='p' className='my-4'>
			The multisig holders are authorized by the community to re-balance nests outside the usual schedule during moments that they
			collectively deem to be critical emergencies. This clause will allow for quick re-balancing in the event of a protocol or nest being
			in danger of failing.
		</Typography>
		<Typography variant='p' className='my-4'>
			An example of when this would be utilized would be if a stable coin begins losing its peg/ becoming insolvent, or a protocol suffers
			an exploit that is not dealt with sufficiently. These scenarios may be time sensitive and require immediate resolution. Thus the team
			may decide to act without warning and explain their actions in a governance forum post afterwards, or if there is deemed to be time,
			an emergency governance vote will be posted.
		</Typography>
		<Typography variant='p' className='my-4'>
			This is intended as a safety mechanism only, to prevent loss of users funds and as such would be a power exclusively exercised under
			extreme circumstances.
		</Typography>
	</>
)

export default nSTBL
