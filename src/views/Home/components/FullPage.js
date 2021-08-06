/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage'
import lines from '../../../assets/img/bg-lines.png'
import SkyHero from './SkyHero'
import Lottie from "react-lottie"
import '@lottiefiles/lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

import './fullpage.style.css'

class FullpageWrapper extends React.Component {
	onLeave(origin, destination, direction) {
		console.log('Leaving section ' + origin.index)
	}
	afterLoad(origin, destination, direction) {
		console.log('After load: ' + destination.index)
	  }
	
	render() {
		return (
			<ReactFullpage
				scrollOverflow={true}
				navigation={true}
				onLeave={this.onLeave.bind(this)}
				afterLoad={this.afterLoad.bind(this)}
				render={({ state, fullpageApi }) => {
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
								}}
							>
								<h6>DIVERSIFIED<br />EXPOSURE</h6>
								<SkyHero />
							</div>

							<div className="section">
								<h7>PASSIVE YIELD</h7>
								<img src="../../assets/img/passive-yield.svg" />
								<lottie-player src="../../assets/img/passive-yield.json"  speed="1"  style={{ width: '600px', height: '300px' }}  loop  autoplay></lottie-player>							</div>

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
