import React, { useEffect, useState } from 'react'

import NestListItem from './NestListItem'
import { ListLabelCol, ListLabelContainer, NestListContainer } from './styles'

const NestList: React.FC = () => {
	// to implement
	return (
		<NestListContainer>
			<ListLabelContainer>
				<ListLabelCol width={'7.5%'} />
				<ListLabelCol width={'17.5%'}>Name</ListLabelCol>
				<ListLabelCol width={'12.5%'}>Holding</ListLabelCol>
				<ListLabelCol width={'12.5%'}>Value</ListLabelCol>
				<ListLabelCol width={'12.5%'}>Supply</ListLabelCol>
				<ListLabelCol width={'12.5%'}>Supply Value</ListLabelCol>
			</ListLabelContainer>
			<NestListItem name={'MemeDex'} pid={0} />
			<NestListItem name={'MemeDex 2'} pid={1} />
			<NestListItem name={'MemeDex 3'} pid={2} />
		</NestListContainer>
	)
}

export default NestList
