if (!process.env.REACT_APP_ALCHEMY_API_KEY) {
	console.error(
		'Required environment variable REACT_APP_ALCHEMY_API_KEY is missing.',
	)
	process.exit(1)
}
