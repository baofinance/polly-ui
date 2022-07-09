import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (
  balance: BigNumber | number | string,
  decimals = 18,
  precision?: number,
) => {
  const displayBalance = new BigNumber(balance).dividedBy(
    new BigNumber(10).pow(decimals),
  )
  if (displayBalance.lt(1e-6)) return 0
  else if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(precision || 4)
  } else {
    const dbNew =
      precision === 0
        ? displayBalance.decimalPlaces(0).toString()
        : displayBalance.toFixed(precision || 2)
    return dbNew.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const truncateNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  const analytic = displayBalance.toNumber()

  if (displayBalance.isGreaterThanOrEqualTo(1000000000)) {
    return (analytic / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B'
  }
  if (displayBalance.isGreaterThanOrEqualTo(1000000)) {
    return (analytic / 1000000).toFixed(2).replace(/\.0$/, '') + 'M'
  }
  if (displayBalance.isGreaterThanOrEqualTo(1000)) {
    return (analytic / 1000).toFixed(2).replace(/\.0$/, '') + 'K'
  }
  if (displayBalance.isGreaterThanOrEqualTo(0)) {
    return analytic.toFixed(2)
  }
  return analytic
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const decimate = (n: any, decimals?: any): BigNumber =>
  new BigNumber(n).div(new BigNumber(10).pow(new BigNumber(decimals || 18)))

export const exponentiate = (n: any, decimals?: any): BigNumber =>
  new BigNumber(n).times(new BigNumber(10).pow(new BigNumber(decimals || 18)))
