import dao from 'assets/img/icons/dao.svg'
import diversify from 'assets/img/icons/diversify.svg'
import yieldIcon from 'assets/img/icons/yield.svg'
import React from 'react'
import { Spacer } from 'react-neu'
import Tilt from 'react-parallax-tilt'
import {
	HeroSubHeader,
	StyledCardContainer,
	StyledCardContent,
	StyledCardIcon,
	StyledCardParralax,
	StyledCardText,
	StyledCardTitle,
	StyledCardWrapper,
} from './styles'

const SectionTwo: React.FC = () => (
	<>
		<HeroSubHeader>BUILD YOUR NEST</HeroSubHeader>
		<StyledCardWrapper>
			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.05}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardIcon src={diversify} />
						<StyledCardTitle>Diversified Exposure</StyledCardTitle>
						<StyledCardText>
							Polly Finance is home to some of the most diverse indexes on
							Polygon, all managed autonomously. With Polly Nests, you can
							easily get balanced exposure to some of the best crypto assets on
							the Polygon Network.
						</StyledCardText>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>

			<Spacer />

			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.05}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardIcon src={yieldIcon} />
						<StyledCardTitle>Passive Yield</StyledCardTitle>
						<StyledCardText>
							Nests are designed to be truly set-and-forget. Maximize your
							returns at a a fraction of the cost and effort. Our automated
							strategies utilize staking, lending, and yield farming. No
							management, no monitoring.
						</StyledCardText>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>

			<Spacer />

			<StyledCardContainer>
				<Tilt
					perspective={100000}
					scale={1.05}
					transitionEasing="cubic-bezier(.03,.98,.52,.99)"
				>
					<StyledCardContent>
						<StyledCardParralax>
							<StyledCardIcon src={dao} />
							<StyledCardTitle>Polly DAO</StyledCardTitle>
							<StyledCardText>
								Polly's strategies and asset manager are governed, maintained,
								and upgraded by Polly DAO. Additionally, metagovernance enables
								POLLY holders to vote in other protocol’s governance decisions.
							</StyledCardText>
						</StyledCardParralax>
					</StyledCardContent>
				</Tilt>
			</StyledCardContainer>
		</StyledCardWrapper>
	</>
)

export default SectionTwo
