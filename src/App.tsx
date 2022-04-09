// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Web3ReactManager from 'components/Web3ReactManager'
import GlobalStyle from 'GlobalStyle'
import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Nest from 'views/Nests/Nest'
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

library.add(fas, fab)

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
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/nests">
						<Nests />
					</Route>
					<Route path="/nests/:marketId">
						<Nest />
					</Route>
					<Route path="/farms">
						<Farms />
					</Route>
				</Switch>
			</Router>
		</Providers>
	)
}

const Providers: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
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
		</ThemeProvider>
	)
}

export default App
