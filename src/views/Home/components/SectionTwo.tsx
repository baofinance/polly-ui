import React from 'react'
import {
	InfoHeader,
	InfoText,
	InfoContainer,
	InfoCol,
	InfoSubHeader,
	InfoImageContainer,
	InfoImageCol,
} from './styles'
import { Row } from 'react-bootstrap'
import diversify from 'assets/img/diversify.svg'
import passiveYield from 'assets/img/passive-yield.svg'
import dao from 'assets/img/dao.svg'

const SectionTwo: React.FC = () => (
	<Row lg={2} style={{ width: '80%', margin: 'auto' }}>
		<InfoImageCol>
			<InfoImageContainer>
				<img
					src={diversify}
					style={{
						maxWidth: '100%',
						height: 'auto',
						marginInline: 'auto',
						margin: '0 2em',
					}}
				/>
			</InfoImageContainer>
		</InfoImageCol>
		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Diversify Your <InfoSubHeader>Exposure</InfoSubHeader>
				</InfoHeader>
				<InfoText>
					Polly Finance is home to some of the most diverse indexes on Polygon,
					all managed autonomously. With Polly Nests, you can easily get
					balanced exposure to some of the best crypto assets on the Polygon
					Network.
				</InfoText>
			</InfoContainer>
		</InfoCol>

		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Earn Passive <InfoSubHeader>Yield</InfoSubHeader>
				</InfoHeader>
				<InfoText>
					Nests are designed to be truly set-and-forget, maximizing your returns
					at a a fraction of the cost and effort. Our automated strategies
					utilize staking, lending, and yield farming- No management or constant
					monitoring necessary!
				</InfoText>
			</InfoContainer>
		</InfoCol>
		<InfoImageCol>
			<InfoImageContainer>
				<img
					src={passiveYield}
					style={{
						maxWidth: '100%',
						height: 'auto',
						marginInline: 'auto',
						margin: '0 2em',
					}}
				/>
			</InfoImageContainer>
		</InfoImageCol>

		<InfoImageCol>
			<InfoImageContainer>
				<img
					src={dao}
					style={{
						maxWidth: '100%',
						height: 'auto',
						marginInline: 'auto',
						margin: '0 2em',
					}}
				/>
			</InfoImageContainer>
		</InfoImageCol>
		<InfoCol>
			<InfoContainer>
				<InfoHeader>
					Meet <InfoSubHeader>Polly DAO</InfoSubHeader>
				</InfoHeader>
				<InfoText>
					Polly's strategies and asset manager are governed, maintained, and
					upgraded by Polly DAO. Additionally, metagovernance enables POLLY
					holders to vote in other protocol’s governance decisions.
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
