const getWithdrawalPenalty = (blocksSince: any) => {
  return blocksSince <= 0
    ? 0.99
    : blocksSince <= 1800
    ? 0.5
    : blocksSince <= 43200
    ? 0.25
    : blocksSince <= 126000
    ? 0.12
    : blocksSince <= 216000
    ? 0.08
    : blocksSince <= 604800
    ? 0.04
    : blocksSince <= 1296000
    ? 0.02
    : 0.001
}

const useFees = (blockDiff: number) =>
  blockDiff && getWithdrawalPenalty(blockDiff)

export default useFees
