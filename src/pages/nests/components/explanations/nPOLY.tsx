import Typography from '@/components/Typography'
import React from 'react'
import Tex2SVG from 'react-hook-mathjax'

const nPOLY: React.FC = () => (
	<>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Description
		</Typography>
		<Typography variant='p' className='my-4'>
			Top 4 projects by TVL on Polygon that are not included in nDEFI. Each project is weighted using the TVL on Polygon, overall TVL and
			Fully Diluted Valuation (FDV), shown by the formula below.
		</Typography>
		<p>
			<Tex2SVG display='inline' latex='TvlFactor = {\frac{TVL}{FDV}}' />
		</p>
		<p>
			<Tex2SVG display='inline' latex='PolyTvlFactor = \sqrt{100 x  {\frac{Token Polygon TVL}{Nest Polygon TVL}}}' />
		</p>
		<p>
			<Tex2SVG display='inline' latex='Weighting = {\frac{TvlFactor + PolyTvlFactor}{allTokensTvlFactor + allTokensPolyTvlFactor}}' />
		</p>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Objective
		</Typography>
		<Typography variant='p' className='my-4'>
			To generate revenue a defi project needs value deposited into their contracts. This makes Total Value Locked (TVL) a key metric for
			evaluating a project’s ability to generate revenue.
		</Typography>
		<Typography variant='p' className='my-4'>
			The weighting formula allows the nest to invest in projects gaining traction earlier and with a greater weighting than market cap
			weighted competitors, attempting to invest more in projects that could be undervalued by the market.
		</Typography>
		<Typography variant='p' className='my-4'>
			The Polygon Ecosystem nest aims to provide an automated, yield bearing way to value invest in the top projects providing TVL on
			Polygon.
		</Typography>
		<Typography variant='h3' className='mb-2 font-bakbak'>
			Criteria
		</Typography>
		<Typography variant='p' className='my-4'>
			For a project to be included in the Polly Polygon nest, it must fit the below criteria in order to reduce the risk of the nest and fit
			the desires of the community.
		</Typography>
		<Typography variant='xl' className='my-4'>
			Characteristics
		</Typography>
		<ul className='ml-8 list-disc'>
			<li>Top 4 projects by TVL on Polygon that are not included in nDEFI and meet all criteria.</li>
			<li>Have at least $250k in liqudity on Polygon.</li>
			<li>Have at least 7.5% of the total supply in circulation and have a predictable token emission ovver the next 5 years.</li>
			<li>The protocol must be running on Polygon for over 3 months.</li>
			<li>
				In the event of a safety incident, the team must have addressed the prpoblem responsibly and promptly, providing users of the
				protocol a reliable solution and document a detailed, transparent breakdown of the incident.
			</li>
			<li>Must be sufficiently decentralized.</li>
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
			reconstitution are determined. The TVL and FDV of each project are recorded, including new projects that qualify for the nest and meet
			the criteria.
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

export default nPOLY
