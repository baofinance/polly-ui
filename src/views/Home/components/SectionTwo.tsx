import dao from 'assets/img/icons/dao.svg'
import diversify from 'assets/img/icons/diversify.svg'
import yieldIcon from 'assets/img/icons/yield.svg'
import React from 'react'
import {
	InfoHeader,
	InfoText,
	InfoImage,
	InfoContainer,
	InfoCol,
	InfoSubHeader,
    InfoImageContainer,
    InfoImageCol,
} from './styles'
import { Col, Row } from 'react-bootstrap'

const SectionTwo: React.FC = () => (
	<Row lg={2}>
		<InfoImageCol>
			<InfoImageContainer>
				<InfoImage src={diversify} />
			</InfoImageContainer>
		</InfoImageCol>
		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Diversify your exposure to <InfoSubHeader>DeFi</InfoSubHeader>.
				</InfoHeader>
				<InfoText>
					Polly Finance is home to some of the most diverse indexes on
					Polygon, all managed autonomously. With Polly Nests, you can
					easily get balanced exposure to some of the best crypto assets on
					the Polygon Network.
				</InfoText>
			</InfoContainer>
		</InfoCol>

		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Mint <InfoSubHeader>Nests</InfoSubHeader>, earn Passive Yield.
				</InfoHeader>
				<InfoText>
					Nests are designed to be truly set-and-forget, maximizing your
					returns at a a fraction of the cost and effort. Our automated
					strategies utilize staking, lending, and yield farming- No
					management or constant monitoring necessary!
				</InfoText>
			</InfoContainer>
		</InfoCol>
		<InfoImageCol>
			<InfoImageContainer>
				<InfoImage src={yieldIcon} />
			</InfoImageContainer>
		</InfoImageCol>

		<InfoImageCol>
			<InfoImageContainer>
				<InfoImage src={dao} />
			</InfoImageContainer>
		</InfoImageCol>
		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Meet <InfoSubHeader>Polly DAO</InfoSubHeader>.
				</InfoHeader>
				<InfoText>
					Polly's strategies and asset manager are governed, maintained,
					and upgraded by Polly DAO. Additionally, metagovernance enables
					POLLY holders to vote in other protocol’s governance decisions.
				</InfoText>
			</InfoContainer>
		</InfoCol>
	</Row>
)

/*
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
 */

export default SectionTwo
