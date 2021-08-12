import React from 'react'
import { Surface, Spacer } from 'react-neu'
import Tilt from 'react-parallax-tilt'
import styled from 'styled-components'

import diversify from '../../../assets/img/icons/diversify.svg'
import yieldIcon from '../../../assets/img/icons/yield.svg'
import dao from '../../../assets/img/icons/dao.svg'

const SectionTwo: React.FC = () => (
	<div>
		<StyledExplanationContainer>
			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.1}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardIcon src={diversify} />
						<StyledCardTitle>Diversified Exposure</StyledCardTitle>
						<StyledCardText>
							Polly Finance creates and manages some of the most diverse indexes
							on Polygon. Get exposure to the best assets in crypto with Polly
							Nests.
						</StyledCardText>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>

			<Spacer />

			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.1}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardIcon src={yieldIcon} />
						<StyledCardTitle>Passive Yield</StyledCardTitle>
						<StyledCardText>
							Maximize returns with active yield-generating strategies behind
							the scenes. Staking, lending, yield-farming - completely
							automated.
						</StyledCardText>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>

			<Spacer />

			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.1}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardParralax>
							<StyledCardIcon src={dao} />
							<StyledCardTitle>Polly DAO</StyledCardTitle>
							<StyledCardText>
								Polly is fully Decentralized and our Asset Manager and
								Strategies are governed, maintained, and upgraded by POLLY token
								holders.
							</StyledCardText>
						</StyledCardParralax>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>
		</StyledExplanationContainer>
	</div>
)

const StyledExplanationContainer = styled.div`
	display: flex;

	@media (max-width: 414px) {
		flex-direction: column;
	}
`

const StyledCardContainer = styled.div`
	flex: 1;
`

const StyledCardContent = styled.div`
	color: white;
	padding: 30px;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 12px;
	height: 550px;

	@media (max-width: 414px) {
		padding: 10px;
		height: 250px;
	}
`

const StyledCardParralax = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transform: translateZ(60px);
`

const StyledCardTitle = styled.p`
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 20px;

	@media (max-width: 414px) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 5px;
	}
`

const StyledCardIcon = styled.img`
	margin: 30px 0px 30px 0px;
	height: 80px;
	width: 80px;

	@media (max-width: 414px) {
		margin: 15px 0px 15px 0px;
		height: 50px;
		width: 50px;
	}
`

const StyledCardText = styled.p`
	font-size: 1.5rem;

	@media (max-width: 414px) {
		font-size: 1rem;
	}
`

export default SectionTwo
