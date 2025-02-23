import React from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
	width: 100%;
	background-color: #fff3cd;
	color: #856404;
	padding: 8px 16px;
	text-align: center;
	font-size: 14px;
	border-bottom: 1px solid #ffeeba;
`

const Banner = () => {
	return (
		<BannerContainer>
			System performance is currently degraded. Withdrawal and redemption
			services remain operational.
		</BannerContainer>
	)
}

export default Banner
