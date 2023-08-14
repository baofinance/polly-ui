import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10, // ten minutes
			cacheTime: 1000 * 60 * 60, // one hour
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
		},
	},
})

export default queryClient
