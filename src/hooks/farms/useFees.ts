const getWithdrawalPenalty = (blocksSince: number) => {
	return blocksSince <= 0
		? 0.25
		: blocksSince <= 274
		? 0.08
		: blocksSince <= 6600
		? 0.04
		: blocksSince <= 19800
		? 0.02
		: blocksSince <= 33000
		? 0.01
		: blocksSince <= 90720
		? 0.005
		: blocksSince <= 181440
		? 0.0025
		: 0.001
}

const useFees = (blockDiff: number) => blockDiff && getWithdrawalPenalty(blockDiff)

export default useFees
