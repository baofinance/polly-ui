import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<link rel='shortcut icon' href='/favicon.ico' />
				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' sizes='72x72' href='/icons/icon-72.png' />
				<link rel='apple-touch-icon' sizes='96x96' href='/icons/icon-96.png' />
				<link rel='apple-touch-icon' sizes='128x128' href='/icons/icon-128.png' />
				<link rel='apple-touch-icon' sizes='144x144' href='/icons/icon-144.png' />
				<link rel='apple-touch-icon' sizes='152x152' href='/icons/icon-152.png' />
				<link rel='apple-touch-icon' sizes='192x192' href='/icons/icon-192.png' />
				<link rel='apple-touch-icon' sizes='384x384' href='/icons/icon-384.png' />
				<link rel='apple-touch-icon' sizes='512x512' href='/icons/icon-512.png' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
				<link href='https://fonts.googleapis.com/css2?family=Inter&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Bakbak+One&family=Inter&display=swap' rel='stylesheet'></link>
				<noscript>You need to enable JavaScript to view Bao Finance</noscript>
				<div id='root'></div>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
