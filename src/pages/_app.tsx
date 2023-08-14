import SEO from '@/bao/lib/seo'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loader from '@/components/Loader/Loader'
import Page from '@/components/Page'
import TxPopup from '@/components/TxPopup'
import '@/components/TxPopup/styles.css'
import Web3ReactManager from '@/components/Web3ReactManager'
import BaoProvider from '@/contexts/BaoProvider'
import TransactionProvider from '@/contexts/Transactions'
import '@/styles/globals.css'
import queryClient from '@/utils/queryClient'
import { Web3Provider } from '@ethersproject/providers'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Web3ReactProvider } from '@web3-react/core'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

console.log('v2.0.3')

function getLibrary(provider: any): Web3Provider {
	const library = new Web3Provider(provider)
	library.pollingInterval = 12000
	return library
}

function Loading() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url: string) => url !== router.asPath && setLoading(true)
		const handleComplete = (url: string) =>
			url === router.asPath &&
			setTimeout(() => {
				setLoading(false)
			}, 5000)
		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)
		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	})
	return loading && <Loader />
}

const Web3ReactNetworkProvider = dynamic(() => import('@/components/Web3NetworkProvider'), { ssr: false })

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='application-name' content='Bao Finance' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='Bao Finance' />
				<meta name='description' content='Deliciously wrapped finance!' />
				<meta name='format-detection' content='telephone=no' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='theme-color' content='#e21a53' />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta httpEquiv='cache-control' content='no-cache' />
				<meta httpEquiv='expires' content='0' />
				<meta httpEquiv='pragma' content='no-cache' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:image' content='%PUBLIC_URL%/twitterCard.png' />
				<meta name='twitter:title' content='Bao - Deliciously wrapped finance!' />
				<meta name='twitter:creator' content='@BaoCommunity' />
				<meta name='twitter:site' content='@BaoCommunity' />
				<meta
					key='twitter:description'
					name='twitter:description'
					content='Lend and borrow synthetics with Bao Vaults and get diversified expsoure to crypto with automated yield bearing strategies using Bao Baskets.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='app.bao.finance' />
				<meta property='og:title' content='Bao Finance - Deliciously wrapped finance!' />
				<meta
					property='og:description'
					content='Lend and borrow synthetics with Bao Vaults and get diversified expsoure to crypto with automated yield bearing strategies using Bao Baskets.'
				/>
				<meta property='og:image' content='%PUBLIC_URL%/twitterCard.png' />
			</Head>
			<Providers>
				<DefaultSeo {...SEO} />
				<TxPopup />
				<div className='flex min-h-[100vh] flex-col justify-between'>
					<Header />
					<Page>
						<Container>
							<Component {...pageProps} />
						</Container>
					</Page>
					<Footer />
				</div>
			</Providers>
		</>
	)
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ReactNetworkProvider getLibrary={getLibrary}>
					<Web3ReactManager>
						<BaoProvider>
							<TransactionProvider>{children}</TransactionProvider>
						</BaoProvider>
					</Web3ReactManager>
				</Web3ReactNetworkProvider>
			</Web3ReactProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

type ProvidersProps = {
	children: ReactNode
}

export default App
