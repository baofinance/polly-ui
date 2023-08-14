import useUserFarmInfo from './useUserFarmInfo'

const useStakedBalance = (pid: number) => {
	const userFarmInfo = useUserFarmInfo(pid)
	// FIXME: this should handle decimals and formatting etc
	return userFarmInfo?.amount
}

export default useStakedBalance
