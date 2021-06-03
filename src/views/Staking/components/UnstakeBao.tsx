import React, { useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import tbao from '../../../assets/img/tbao-icon.svg'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useLeave from '../../../hooks/useLeave'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import WithdrawModal from './WithdrawModal'

interface HarvestProps {
	lpContract: Contract
}

const UnstaketBao: React.FC<HarvestProps> = ({ lpContract }) => {
	const tBaoBalance = useTokenBalance(lpContract.options.address)
	const [pendingTx, setPendingTx] = useState(false)

	const { onLeave } = useLeave()

	const tokenName = 'tBAO'

	const [onPresentLeave] = useModal(
		<WithdrawModal
			max={tBaoBalance}
			onConfirm={onLeave}
			tokenName={tokenName}
		/>,
	)

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<img src={tbao} alt="" height="50" />
						</CardIcon>
						<Value value={getBalanceNumber(tBaoBalance)} />
						<Label text="tBAO Available" />
					</StyledCardHeader>
					<StyledCardActions>
						<Button
							disabled={!tBaoBalance.toNumber() || pendingTx}
							text={pendingTx ? 'Converting to BAOcx' : 'Convert to BAOcx'}
							onClick={async () => {
								setPendingTx(true)
								await onPresentLeave()
								setPendingTx(false)
							}}
						/>
					</StyledCardActions>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

const StyledCardHeader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`
const StyledCardActions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing[6]}px;
	width: 100%;
`

const StyledSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default UnstaketBao
