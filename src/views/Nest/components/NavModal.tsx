import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal, { ModalProps } from 'components/Modal'
import ModalContent from 'components/ModalContent'
import React from 'react'
import { CloseButton } from './styles'

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
					fontSize: '1.5rem',
					marginTop: '${(props) => props.theme.spacing[4]}px',
					fontWeight: 700,
				}}
			>
				NAV vs Price
			</p>
			<ModalContent>
				<p style={{ textAlign: 'left', fontSize: '1.5rem' }}>
					<b>NAV</b>
				</p>
				<p style={{ textAlign: 'left' }}>
					The net asset value (NAV) of a Nest represents the market value of each
					share’s portion of the Nest's underlying assets. The NAV is determined
					by adding up the value of all assets in the Nest and then dividing that
					value by the number of outstanding shares in the Nest.
				</p>

				<p style={{ textAlign: 'left', fontSize: '1.5rem' }}>
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

export default NavModal
