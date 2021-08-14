import React, { useState } from 'react'
import styled from 'styled-components'
import baoIcon from '../../../assets/img/bao.png'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import useBao from '../../../hooks/useBao'
import useEarnings from '../../../hooks/useEarnings'
import useLockedEarnings from '../../../hooks/useLockedEarnings'
import useReward from '../../../hooks/useReward'
import useSubValues from '../../../hooks/useSubValues'
import useValues from '../../../hooks/useValues'
import { getBalanceNumber } from '../../../utils/formatBalance'

interface HarvestProps {
	pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
	const earnings = useEarnings(pid)
	const locks = useLockedEarnings()
	const [pendingTx, setPendingTx] = useState(false)
	const { onReward } = useReward(pid)
	const bao = useBao()
	const userInfo = useValues()
	const userSubInfo = useSubValues()

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<img src={baoIcon} height={50} alt="" />
						</CardIcon>
						<Value value={getBalanceNumber(earnings)} />
						<Label text="POLLY Earned" />
					</StyledCardHeader>
					<Spacer />
					<StyledCardHeader>
						<Value value={getBalanceNumber(locks)} />
						<Label text="Locked POLLY" />
						<Spacer />
					</StyledCardHeader>
					<StyledCardActions>
						<Button
							disabled={!earnings.toNumber() || pendingTx}
							text={pendingTx ? 'Collecting POLLY' : 'Harvest'}
							onClick={async () => {
								setPendingTx(true)
								await onReward()
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

export default Harvest
