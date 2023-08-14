import React, { PropsWithChildren } from 'react'

interface PageProps {
	children: any
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({ children }) => (
	<>
		<div className='relative top-0 z-10 m-auto mt-16 flex w-[100vw] justify-between lg:max-w-7xl'>
			<div className='top-0 w-full'>{children}</div>
		</div>
	</>
)

export default Page
