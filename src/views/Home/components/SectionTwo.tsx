import React from 'react'
import {
	InfoHeader,
	InfoText,
	InfoContainer,
	InfoCol,
	InfoSubHeader,
	InfoImageContainer,
	InfoImageCol,
	InfoWrapper,
	InfoImage,
} from './styles'
import diversify from 'assets/img/diversify.svg'
import passiveYield from 'assets/img/passive-yield.svg'
import dao from 'assets/img/dao.svg'

const SectionTwo: React.FC = () => (
	<>
		<InfoWrapper lg={2}>
			<InfoImageCol>
				<InfoImageContainer>
					<InfoImage src={diversify} />
				</InfoImageContainer>
			</InfoImageCol>

			<InfoCol>
				<InfoContainer>
					<InfoHeader>
						Diversify Your <InfoSubHeader>Exposure</InfoSubHeader>
					</InfoHeader>
					<InfoText>
						Polly Finance is home to some of the most diverse indexes on
						Polygon, all managed autonomously. With Polly Nests, you can easily
						get balanced exposure to some of the best crypto assets on the
						Polygon Network.
					</InfoText>
				</InfoContainer>
			</InfoCol>
		</InfoWrapper>

		<InfoWrapper lg={2}>
			<InfoCol xs={{ order: 2 }} lg={{ order: 1 }}>
				<InfoContainer>
					<InfoHeader>
						Earn Passive <InfoSubHeader>Yield</InfoSubHeader>
					</InfoHeader>
					<InfoText>
						Nests are designed to be truly set-and-forget, maximizing your
						returns at a a fraction of the cost and effort. Our automated
						strategies utilize staking, lending, and yield farming- No
						management or constant monitoring necessary!
					</InfoText>
				</InfoContainer>
			</InfoCol>

			<InfoImageCol xs={{ order: 1 }} lg={{ order: 2 }}>
				<InfoImageContainer>
					<InfoImage src={passiveYield} />
				</InfoImageContainer>
			</InfoImageCol>
		</InfoWrapper>

		<InfoWrapper lg={2}>
			<InfoImageCol>
				<InfoImageContainer>
					<InfoImage src={dao} />
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
		</InfoWrapper>
	</>
)

export default SectionTwo
