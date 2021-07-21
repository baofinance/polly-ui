import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DogeMan from './sample-img-to-remove/doge.png'
import Button from '../../../../components/Button'
import { AssetImage, ListCol, ColumnText, ListItemContainer } from './styles'

const NestListItem: React.FC<IProps> = (props) => {
	const { name, pid }: IProps = props

	return (
		<ListItemContainer>
			<ListCol width={'7.5%'}>
				<AssetImage src={DogeMan} />
			</ListCol>
			<ListCol width={'17.5%'}>
				<ColumnText>{name}</ColumnText>
			</ListCol>
			<ListCol width={'12.5%'}>
				<ColumnText>$0.000</ColumnText>
			</ListCol>
			<ListCol width={'12.5%'}>
				<ColumnText>0.000</ColumnText>
			</ListCol>
			<ListCol width={'12.5%'}>
				<ColumnText>0.000</ColumnText>
			</ListCol>
			<ListCol width={'12.5%'}>
				<ColumnText>$0.000</ColumnText>
			</ListCol>
			<ListCol width={'25%'}>
				<Button inline={true} width={'40%'}>
					Stake
				</Button>
				<span style={{ marginRight: '20px' }} />
				<Button inline={true} width={'40%'}>
					Buy
				</Button>
			</ListCol>
		</ListItemContainer>
	)
}

// Props and stuff

interface IProps {
	name: string
	pid: number
}

NestListItem.propTypes = {
	name: PropTypes.string.isRequired,
	pid: PropTypes.number.isRequired,
}

export default NestListItem
