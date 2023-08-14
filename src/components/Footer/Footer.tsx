import React from 'react'
import Nav from './components/Nav'

const Footer: React.FC = () => (
	<>
		<footer>
			<div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
				<nav className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12' aria-label='Footer'>
					<Nav />
				</nav>
			</div>
		</footer>
	</>
)

export default Footer
