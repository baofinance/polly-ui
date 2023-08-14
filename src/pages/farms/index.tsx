import { NextSeo } from 'next-seo'
import React from 'react'

import PageHeader from '@/components/PageHeader'

import FarmList from './components/FarmList'

const Farms: React.FC = () => {
	return (
		<>
			<NextSeo title={'Farms'} description={'Stake LP tokens to earn BAO.'} />
			<PageHeader title='Farms' />
			<FarmList />
		</>
	)
}

export default Farms
