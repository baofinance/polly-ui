import Typography from '@/components/Typography'
import React from 'react'

const nINFR: React.FC = () => (
	<>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Description
		</Typography>
		<Typography variant='p' className='my-4'>
			The Polly Infrastructure Nest takes the top projects by market capitalization, which provide infrastructure to the Polygon ecosystem.
			In this nest the square root of fully diluted market capitalization is used to weight the projects.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Objective
		</Typography>
		<Typography variant='p' className='my-4'>
			Infrastructure projects provide an environment for an ecosystem to thrive on each chain. nINFRA aims to provide an easy way to gain
			automated, yield bearing exposure to any projects providing key infrastructure components to the Polygon ecosystem.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Criteria
		</Typography>
		<Typography variant='p' className='my-4'>
			For a project to be included in the Polly Infrastructure Nest, it must fit the below criteria in order to reduce the risk of the nest
			and fit the desires of the community.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Characteristics
		</Typography>
		<ul className='ml-8 list-disc'>
			<li>Provide key infrastructure for the Polygon ecosystem.</li>
			<li>Have at least $250k in liquidity on Polygon.</li>
			<li>Have a Chainlink price feed on Polygon.</li>
			<li>Have at least 7.5% of the total supply in circulation and have a predictable token emission over the next 5 years.</li>
			<li>The protocol must be running for 3 months before qualifying to be included in the nest.</li>
			<li>
				In the event of a safety incident, the team must have addressed the problem responsibly and promptly, providing usuers of the
				protocol a reliable solution and document a detailed, transparent breakdown of the incident.
			</li>
			<li>Must be sufficiently decentralised</li>
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
			reconstitution are determined. The FDV of each project is recorded, including new projects that qualify for the nest and meet the
			criteria.
		</Typography>
		<Typography variant='p' className='my-4'>
			Proposed changes will be published on the governance forum for 1 week then a governance vote will run for the community to approve
			changes.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Reconstitution Phase
		</Typography>
		<Typography variant='p' className='my-4'>
			In the two weeks following a successful vote, the nest components will be adjusted as per the instructions published during the final
			2 weeks of the quarter.
		</Typography>
	</>
)

export default nINFR
