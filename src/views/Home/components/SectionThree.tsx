import React, { useEffect, useMemo, useState } from 'react'
import {
	GraphContainer,
} from 'views/Nest/styles'
import { ParentSize } from '@visx/responsive'
import AreaGraph from 'components/Graphs/AreaGraph/AreaGraph'
import useGraphPriceHistory from 'hooks/useGraphPriceHistory'
import { useParams } from 'react-router-dom'
import useNest from 'hooks/useNest'


const SectionThree: React.FC = () => (
		<>
						<GraphContainer>
						</GraphContainer>
		</>
	)

export default SectionThree
