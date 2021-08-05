/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage'
import lines from '../../../assets/img/bg-lines.png'
import SkyHero from './SkyHero'

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
                  zIndex: `-99999`
								}}
							>
								<h6>Diversified Exposure</h6>
                                <SkyHero />
							</div>

							<div className="section">
                <h6>Passive Yield</h6>
							</div>

							<div className="section">
								<h3>Section 3</h3>
								<button onClick={() => fullpageApi.moveTo(1, 0)}>
									Move top
								</button>
							</div>
						</div>
					)
				}}
			/>
		)
	}
}

export default FullpageWrapper
