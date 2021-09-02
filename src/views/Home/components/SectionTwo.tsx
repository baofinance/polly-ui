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
						Polly Finance is home to some of the most diverse baskets on
						Polygon, all managed autonomously. With Polly Nests, you can easily
						get balanced exposure to digital assets on the Polygon Network.
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
						returns at a a fraction of the cost and effort. Nests leverage
						automated strategies utilizing staking, lending, and yield farming-
						No management or constant monitoring necessary!
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
						Polly is governed, maintained, and upgraded by its token holders.
						Polly DAO empowers users to curate their own Nests and develop
						complex strategies of their own.
					</InfoText>
				</InfoContainer>
			</InfoCol>
		</InfoWrapper>
	</>
)

export default SectionTwo
