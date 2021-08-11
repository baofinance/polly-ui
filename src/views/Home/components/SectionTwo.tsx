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
						<StyledCardDescription>
							Polly Finance creates and manages some of the most diverse indexes
							on Polygon. Get exposure to the best assets in crypto with Polly
							Nests.
						</StyledCardDescription>
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
						<StyledCardDescription>
							Maximize returns with active yield-generating strategies behind
							the scenes. Staking, lending, yield-farming - completely
							automated.
						</StyledCardDescription>
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
						<StyledCardDescription>
							Polly is fully Decentralized and our Asset Manager and Strategies
							are governed, maintained, and upgraded by POLLY token holders.
						</StyledCardDescription>
						</StyledCardParralax>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>
		</StyledExplanationContainer>
	</div>
)

const StyledExplanationContainer = styled.div`
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`

const StyledExplanationTitle = styled.h2`
	font-size: 32px;
	border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
	padding-bottom: 20px;
	margin-bottom: 20px;
`

const StyledCardContainer = styled.div`
	flex: 1;
`

const StyledCardContent = styled.div`
color: white;
	height: 500px;
	padding: 30px;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 12px;
`

const StyledCardParralax = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transform: translateZ(60px);
`

const StyledCardTitle = styled.p`
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 20px;
`

const StyledCardIcon = styled.img`
	margin: 30px 0px 30px 0px;
	height: 80px;
	width: 80px;
`

const StyledCardDescription = styled.p`
	font-size: 24px;
`

export default SectionTwo
