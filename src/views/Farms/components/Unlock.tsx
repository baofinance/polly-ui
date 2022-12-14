/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import useBao from 'hooks/base/useBao'
import { useWeb3React } from '@web3-react/core'
import { unlockPolly, getUnlockAmount, getPollyContract } from 'bao/utils'
import { SpinnerLoader } from 'components/Loader'
import { Button } from 'components/Button'
import { getDisplayBalance } from 'utils/numberFormat'
import { StyledBadge } from 'components/Badge'
import BigNumber from 'bignumber.js'
import baoIcon from 'assets/img/logo.svg'
import Spacer from 'components/Spacer'

const Unlock: React.FC = () => {
	const bao = useBao()
	const { account } = useWeb3React()
	const pollyContract = getPollyContract(bao)
	const [pendingUnlock, setPendingUnlock] = useState(new BigNumber(0))

	useEffect(() => {
		if (!pollyContract || !account) return
		getUnlockAmount(pollyContract, account)
			.then((amount: BigNumber) => {
				setPendingUnlock(new BigNumber(amount))
			})
	}, [pollyContract, account])

	const disabled = !account || !pollyContract || pendingUnlock.eq(0)

	if (!bao || !pollyContract || !account) {
		return null
	}

	return !bao ? (
		<SpinnerLoader />
	) : (
		<Fragment>
			<Container>
				<Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
						Unlockable Polly waiting for you to claim:
						<Spacer size={'md'} />
					</Col>
					<Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
						<StyledBadge style={{ fontSize: '1.5em', margin: '0 auto' }}>
							<img src={baoIcon} alt='BAO' style={{ height: '1em' }} />
							{' '}
							{pendingUnlock.eq(0) ? '-' : getDisplayBalance(pendingUnlock)}
						</StyledBadge>
						<Spacer size={'md'} />
						<Button
							width='fit-content'
							disabled={disabled}
							onClick={async (e: React.SyntheticEvent) => {
								e.preventDefault()
								await unlockPolly(pollyContract, account)
							}}
						>
							Unlock pending POLLY
						</Button>
					</Col>
				</Row>
			</Container>
			<Spacer size={'md'} />
		</Fragment>
	)
}

export default Unlock
