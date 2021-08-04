import React from 'react'
import TextTransition from 'react-text-transition'
import styled from 'styled-components'

const TEXTS = [
	'Automated Strategies',
	'Passive Yield',
	'Diversified Exposure',
]

const HeroText = () => {
	const [index, setIndex] = React.useState(0)

	React.useEffect(() => {
		const intervalId = setInterval(
			() => setIndex((index) => index + 1),
			3000, // every 3 seconds
		)
		return () => clearTimeout(intervalId)
	}, [])

	return (
		<TextHero>
			<TextTransition
				text={TEXTS[index % TEXTS.length]}
				springConfig={{ stiffness: 50, damping: 20 }}
				inline={false}
			/>
		</TextHero>
	)
}

const TextHero = styled.h1`
	font-size: 7rem;
	line-height: 6.7rem;
	letter-spacing: -0.2rem;
	text-align: center;
	font-weight: bolder;
	margin: 0;
	position: absolute;
	top: 50%;
	white-space: nowrap;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	font-family: Ruibk, sans-serif;
	color: white;
	display: block;
	margin-left: auto;
	margin-right: auto;
	text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
		0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
		0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
		0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
		0 20px 20px rgba(0, 0, 0, 0.15);
0 10px 10px rgba(0,0,0,.2),
0 20px 20px rgba(0,0,0,.15);

`

export default HeroText
