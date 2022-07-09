import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import Web3ReactManager from 'components/Web3ReactManager'
import GlobalStyle from 'GlobalStyle'
import React, { ReactNode, useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Web3 from 'web3'
import { provider } from 'web3-core'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import BaoProvider from './contexts/BaoProvider'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import NestsProvider from './contexts/Nests'
import TransactionProvider from './contexts/Transactions'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Nests from './views/Nests'
import Nest from './views/Nests/Nest'

library.add(fas, fab)

function getLibrary(provider: provider) {
	return new Web3(provider)
}

const Web3ReactNetworkProvider = createWeb3ReactRoot('network')

const App: React.FC = () => {
	const [mobileMenu, setMobileMenu] = useState(false)

	const handleDismissMobileMenu = useCallback(() => {
		setMobileMenu(false)
	}, [setMobileMenu])

	const handlePresentMobileMenu = useCallback(() => {
		setMobileMenu(true)
	}, [setMobileMenu])

	return (
		<Providers>
			<Router>
				<TopBar onPresentMobileMenu={handlePresentMobileMenu} />
				<MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/nests" element={<Nests />} />
					<Route path="/nests/:nestId" element={<Nest />} />
					<Route path="/farms" element={<Farms />} />
				</Routes>
			</Router>
		</Providers>
	)
}

type ProvidersProps = {
	children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ReactNetworkProvider getLibrary={getLibrary}>
					<Web3ReactManager>
						<BaoProvider>
							<NestsProvider>
								<TransactionProvider>
									<FarmsProvider>
										<ModalsProvider>{children}</ModalsProvider>
									</FarmsProvider>
								</TransactionProvider>
							</NestsProvider>
						</BaoProvider>
					</Web3ReactManager>
				</Web3ReactNetworkProvider>
			</Web3ReactProvider>
		</ThemeProvider>
	)
}

export default App
