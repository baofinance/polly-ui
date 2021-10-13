const getWithdrawalPenalty = (blocksSince: any) => {
  return blocksSince <= 0
    ? 0.99
    : blocksSince <= 1525
    ? 0.5
    : blocksSince <= 36600
    ? 0.25
    : blocksSince <= 109800
    ? 0.12
    : blocksSince <= 183000
    ? 0.08
    : blocksSince <= 512400
    ? 0.04
    : blocksSince <= 1024800
    ? 0.02
    : 0.001
}

const useFees = (blockDiff: number) =>
  blockDiff && getWithdrawalPenalty(blockDiff)

export default useFees
