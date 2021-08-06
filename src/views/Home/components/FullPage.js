/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage'
import lines from '../../../assets/img/bg-lines.png'
import SkyHero from './SkyHero'
import Lottie from 'react-lottie'
import { Col, Row } from 'react-bootstrap'

import passiveYieldLottie from '../../../assets/img/lottie/passive-yield.json'
import './fullpage.style.css'

const Parallax = () => {
	const [offset, setOffset] = useState(0)

	useEffect(() => {
		function handleScroll() {
			setOffset(window.pageYOffset)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [offset])
}

class FullpageWrapper extends React.Component {
	onLeave(origin) {
		console.log('Leaving section ' + origin.index)
	}
	afterLoad(origin, destination) {
		console.log('After load: ' + destination.index)
	}

	render() {
		return (
			<ReactFullpage
				scrollOverflow={true}
				navigation={true}
				onLeave={this.onLeave.bind(this)}
				afterLoad={this.afterLoad.bind(this)}
				render={() => {
					return (
						<div id="fullpage-wrapper">
							<div
								className="section"
								style={{
									background: `linear-gradient(to top, transparent, #1a003d), url(${lines})`,
									backgroundPosition: `center`,
									backgroundRepeat: `no-repeat`,
									backgroundAttachment: `fixed`,
									zIndex: `-99999`,
									transform: `translateY(${Parallax.offset * 0.5}px)`,
								}}
							>
								<h6>
									DIVERSIFIED
									<br />
									EXPOSURE
								</h6>
								<SkyHero />
							</div>

							<div className="section">
								<Row>
									<Col sm style={{ textAlign: 'right', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
										<h6 style={{ textAlign: 'right' }}>
											PASSIVE
											<br />
											YIELD
										</h6>
									</Col>
									<Col sm>
										<Lottie
											options={{
												animationData: passiveYieldLottie,
												loop: true,
												autoplay: true
											}}
											width={500}
											height={500}
										/>
									</Col>
								</Row>
							</div>
							<div className="section">
								<h7>AUTOMATED STRATEGIES</h7>
							</div>
						</div>
					)
				}}
			/>
		)
	}
}

export default FullpageWrapper
