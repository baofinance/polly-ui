import { faDiscord, faGithub, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBolt, faBook, faBug, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Tooltipped from '../../Tooltipped'

const Nav: React.FC = () => {
	return (
		<div className='flex items-center text-sm lg:text-lg'>
			<Tooltipped content='Discord' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://discord.gg/BW3P62vJXT'
					aria-label='Discord'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faDiscord} />
				</a>
			</Tooltipped>
			<Tooltipped content='Twitter' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://twitter.com/BaoCommunity'
					aria-label='Twitter'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faTwitter} />
				</a>
			</Tooltipped>
			<Tooltipped content='Medium' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://medium.com/baomunity'
					aria-label='Medium'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faMedium} />
				</a>
			</Tooltipped>
			<Tooltipped content='Governance Forum' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://gov.bao.finance/'
					aria-label='Governance Forum'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faComments} />
				</a>
			</Tooltipped>
			<Tooltipped content='Snapshot' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://snapshot.page/#/pollyfinance.eth'
					aria-label='Snapshot'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faBolt} />
				</a>
			</Tooltipped>
			<Tooltipped content='Documentation' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://info.bao.finance/docs/franchises/polly'
					aria-label='Documentation'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faBook} />
				</a>
			</Tooltipped>
			<Tooltipped content='GitHub' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://github.com/baofinance'
					aria-label='GitHub'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faGithub} />
				</a>
			</Tooltipped>
			<Tooltipped content='Bug Bounty Program' placement='top'>
				<a
					className='xs:pl-2 xs:pr-2 pl-3 pr-3 no-underline hover:text-pollyGreen'
					target='_blank'
					href='https://www.immunefi.com/bounty/baofinance'
					aria-label='Bug Bounty Program'
					rel='noreferrer'
				>
					<FontAwesomeIcon icon={faBug} />
				</a>
			</Tooltipped>
		</div>
	)
}

export default Nav
