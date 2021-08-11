/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef } from 'react'
import { Surface, Spacer, Container } from 'react-neu'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import ReactFullpage from '@fullpage/react-fullpage'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { 
	BubbleWrap, 
	BubbleContainer, 
	BubbleOverlayText,
} from './styles'

import SectionTwo from './SectionTwo'

import './fullpage.style.css'
import _ from 'lodash'

const SCROLL_SPEED = 0.3
const NOISE_AMOUNT = 5
const CANVAS_WIDTH = 2800

const bubbleSpecs = [
	{ s: 0.6, x: 1134, y: 45 },
	{ s: 0.6, x: 1620, y: 271 },
	{ s: 0.6, x: 1761, y: 372 },
	{ s: 0.6, x: 2499, y: 79 },
	{ s: 0.6, x: 2704, y: 334 },
	{ s: 0.6, x: 2271, y: 356 },
	{ s: 0.6, x: 795, y: 226 },
	{ s: 0.6, x: 276, y: 256 },
	{ s: 0.6, x: 1210, y: 365 },
	{ s: 0.6, x: 444, y: 193 },
	{ s: 0.6, x: 2545, y: 387 },
	{ s: 0.8, x: 1303, y: 193 },
	{ s: 0.8, x: 907, y: 88 },
	{ s: 0.8, x: 633, y: 320 },
	{ s: 0.8, x: 323, y: 60 },
	{ s: 0.8, x: 129, y: 357 },
	{ s: 0.8, x: 1440, y: 342 },
	{ s: 0.8, x: 1929, y: 293 },
	{ s: 0.8, x: 2135, y: 198 },
	{ s: 0.8, x: 2276, y: 82 },
	{ s: 0.8, x: 2654, y: 182 },
	{ s: 0.8, x: 2783, y: 60 },
	{ x: 1519, y: 118 },
	{ x: 1071, y: 233 },
	{ x: 1773, y: 148 },
	{ x: 2098, y: 385 },
	{ x: 2423, y: 244 },
	{ x: 901, y: 385 },
	{ x: 624, y: 111 },
	{ x: 75, y: 103 },
	{ x: 413, y: 367 },
	{ x: 2895, y: 271 },
	{ x: 1990, y: 75 },
]

class Bubbles {
	constructor(specs, ref) {
		this.bubbles = []

		specs.forEach((spec, index) => {
			this.bubbles.push(new Bubble(index, spec, ref))
		})

		requestAnimationFrame(this.update.bind(this))
	}

	update() {
		this.bubbles.forEach((bubble) => bubble.update())
		this.raf = requestAnimationFrame(this.update.bind(this))
	}
}

class Bubble {
	constructor(index, { x, y, s = 1 }, ref) {
		this.index = index
		this.x = x
		this.y = y
		this.scale = s

		this.el = document.createElement('div')
		this.el.className = `bubble logo${this.index + 1}`
		ref.current.appendChild(this.el)
	}

	update() {
		let randomX = Math.random() / 10
		let randomY = Math.random() / 10

		this.x -= SCROLL_SPEED
		this.xWithNoise = this.x + randomX * NOISE_AMOUNT
		this.yWithNoise = this.y + randomY * NOISE_AMOUNT

		if (this.x < -200) {
			this.x = CANVAS_WIDTH
		}

		this.el.style.transform = `translate(${this.xWithNoise}px, ${this.yWithNoise}px) scale(${this.scale})`
	}
}

// For perlin noise

const FullpageWrapper = () => {
	const bubbleRef = useRef()

	return (
		<ReactFullpage
			scrollOverflow={true}
			navigation={true}
			afterLoad={_.once(() => new Bubbles(bubbleSpecs, bubbleRef))}
			render={() => {
				return (
					<div id="fullpage-wrapper">
						<div
							className="section"
							style={{
								backgroundPosition: `center`,
								backgroundRepeat: `no-repeat`,
								backgroundAttachment: `fixed`,
								zIndex: `-99999`,
							}}
						>
							<BubbleOverlayText>
								<h6>DIVERSIFY YOUR EXPOSURE</h6>
							</BubbleOverlayText>
							<BubbleWrap>
								<BubbleContainer ref={bubbleRef} />
							</BubbleWrap>
						</div>

						<div className="section">
							<Container size="lg">
							<h3>BUILD YOUR NEST</h3>
							<SectionTwo />
							</Container>
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

export default FullpageWrapper
