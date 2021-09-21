import React from 'react'
import styled from 'styled-components'

const Branding: React.FC = () => {
	return (
		<StyledLink target="_blank" href="https://bao.finance">
			<StyledText>
				<TitleText>
						<span>by Bao.Finance</span>
				</TitleText>
			</StyledText>
		</StyledLink>
	)
}

const TitleText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${(props) => props.theme.color.text[100]};
	font-family: 'Kaushan Script', sans-serif;
	font-size: 1.5rem;
	letter-spacing: 0.03rem;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`

const StyledLink = styled.a`
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: 60px;
	min-width: 60px;
	padding: 0;
	text-decoration: none;

	&:hover {
		color: ${(props) => props.theme.color.link[100]};
	}
`

const StyledText = styled.span`
	color: ${(props) => props.theme.color.text[100]};
	font-family: 'Rubik', sans-serif;
	font-size: 1.5rem;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	letter-spacing: 0.03em;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`

export default Branding
