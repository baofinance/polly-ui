import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal, { ModalProps } from 'components/Modal'
import ModalContent from 'components/ModalContent'
import React from 'react'
import styled from 'styled-components'

interface NavModalProps extends ModalProps {}

const NavModal: React.FC<NavModalProps> = ({ onDismiss }) => {
	return (
		<Modal>
			<CloseButton onClick={onDismiss}>
				<FontAwesomeIcon icon="window-close" />
			</CloseButton>
			<p
				style={{
					textAlign: 'center',
					fontSize: '24px',
					marginTop: '25px',
					fontWeight: 700,
				}}
			>
				NAV vs Price
			</p>
			<ModalContent>
				<p style={{ textAlign: 'left', fontSize: '24px' }}>
					<b>NAV</b>
				</p>
				<p style={{ textAlign: 'left' }}>
					The net asset value (NAV) of a Nest represents the market value of each
					share’s portion of the Nest's underlying assets. The NAV is determined
					by adding up the value of all assets in the Nest and then dividing that
					value by the number of outstanding shares in the Nest.
				</p>

				<p style={{ textAlign: 'left', fontSize: '24px' }}>
					<b>Price</b>
				</p>
				<p style={{ textAlign: 'left' }}>
					The Nest's market price is the price at which shares in the Nests can be
					bought or sold on the exchanges. The market price can fluctuate
					throughout the day as buyers and sellers interact with one another and
					trade. For this reason, at times the price can differ from the NAV,
					making it more convenient to buy or mint according to market
					fluctuations.
				</p>
			</ModalContent>
		</Modal>
	)
}

export const CloseButton = styled.a`
	float: right;
	top: 15px;
	right: 25px;
	font-size: 24px;
	position: absolute;
	color: ${(props) => props.theme.color.text[100]};

	&:hover {
		cursor: pointer;
	}
`

export default NavModal
