import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ActiveSupportedNest } from '../../../bao/lib/types'
import { Button } from '../../../components/Button'
import NestModal from './Modals/NestModal'

type ModalOperation = 'MINT' | 'REDEEM'

type NestButtonsProps = {
	nest: ActiveSupportedNest
	swapLink: string
}

const NestButtons: React.FC<NestButtonsProps> = ({ nest, swapLink }) => {
	const [showNestModal, setShowNestModal] = useState(false)
	const [modalOperation, setModalOperation] = useState<ModalOperation>('MINT')

	const handleClick = (op: ModalOperation) => {
		setModalOperation(op)
		setShowNestModal(true)
	}

	console.log(swapLink)

	return (
		<>
			<NestModal
				nest={nest}
				operation={modalOperation}
				show={showNestModal}
				hideModal={() => setShowNestModal(false)}
			/>
			<Row lg={3} style={{ padding: '0 0.75rem', marginBottom: '25px' }}>
				<Col>
					<Button onClick={() => handleClick('MINT')}>Mint</Button>
				</Col>
				<Col>
					<Button onClick={() => handleClick('REDEEM')}>Redeem</Button>
				</Col>
				<Col>
					<Button href={`${swapLink}`} target="_blank" text="Swap" />
				</Col>
			</Row>
		</>
	)
}

export default NestButtons
