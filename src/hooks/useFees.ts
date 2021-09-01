const getWithdrawalPenalty = (blocksSince: any) => {
  return blocksSince <= 0
    ? 0.99
    : blocksSince <= 1200
    ? 0.5
    : blocksSince <= 28800
    ? 0.25
    : blocksSince <= 86400
    ? 0.12
    : blocksSince <= 144000
    ? 0.08
    : blocksSince <= 403200
    ? 0.04
    : blocksSince <= 806400
    ? 0.02
    : 0.001
}

const useFees = (blockDiff: number) =>
  blockDiff && getWithdrawalPenalty(blockDiff)

export default useFees
