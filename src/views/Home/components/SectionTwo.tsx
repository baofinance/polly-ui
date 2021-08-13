import React from 'react'
import { Surface, Spacer } from 'react-neu'
import Tilt from 'react-parallax-tilt'
import styled from 'styled-components'

import diversify from '../../../assets/img/icons/diversify.svg'
import yieldIcon from '../../../assets/img/icons/yield.svg'
import dao from '../../../assets/img/icons/dao.svg'

import {
	StyledExplanationContainer,
	StyledCardContainer,
	StyledCardContent,
	StyledCardIcon,
	StyledCardTitle,
	StyledCardText,
	StyledCardParralax,
} from './styles'

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

export default SectionTwo
