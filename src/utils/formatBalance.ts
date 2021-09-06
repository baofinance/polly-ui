import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toFixed(5)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const decimate = (n: any, decimals?: any): BigNumber =>
  new BigNumber(n)
    .div(
      new BigNumber(10).pow(new BigNumber(decimals || 18))
    )

export const exponentiate = (n: any, decimals?: any): BigNumber =>
  new BigNumber(n)
    .times(
      new BigNumber(10).pow(new BigNumber(decimals || 18))
    )
