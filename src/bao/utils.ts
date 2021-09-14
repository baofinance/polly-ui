import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import _ from 'lodash'
import { addressMap } from './lib/constants'
import { Bao } from './Bao'
import { Farm } from '../contexts/Farms'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getMasterChefAddress = (bao: Bao): string => {
  return bao && bao.masterChefAddress
}

export const getPollyAddress = (bao: Bao): string => {
  return bao && bao.pollyAddress
}

export const getWethContract = (bao: Bao): Contract => {
  return bao && bao.contracts && bao.contracts.weth
}

export const getWethPriceContract = (bao: Bao): Contract => {
  return bao && bao.contracts && bao.contracts.wethPrice
}

export const getMasterChefContract = (bao: Bao): Contract => {
  return bao && bao.contracts && bao.contracts.masterChef
}

export const getPollyContract = (bao: Bao): Contract => {
  return bao && bao.contracts && bao.contracts.polly
}

export const getNestContract = (bao: Bao, nid: number) => {
  if (bao && bao.contracts && bao.contracts.nests) {
    const nest = _.find(bao.contracts.nests, { nid })
    const address = nest.nestAddress
    return {
      address,
      nestContract: nest.nestContract,
    }
  }
}

export const getRecipeContract = (bao: Bao) => {
  return bao && bao.contracts && bao.contracts.recipe
}

export const getNests = (bao: Bao) => {
  return bao
    ? bao.contracts.nests.map(
        ({
          nid,
          name,
          symbol,
          icon,
          nestAddress,
          nestContract,
          pieColors,
        }) => ({
          nid,
          id: symbol,
          name,
          icon,
          nestContract,
          pieColors,
          nestTokenAddress: nestAddress,
          inputToken: 'wETH',
          nestToken: symbol,
          inputTokenAddress: addressMap.WETH,
        }),
      )
    : []
}

export const getFarms = (bao: Bao): Farm[] => {
  return bao
    ? bao.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenDecimals,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          refUrl,
          pairUrl,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenDecimals,
          tokenSymbol,
          tokenContract,
          earnToken: 'POLLY',
          earnTokenAddress: bao.contracts.polly.options.address,
          icon,
          refUrl,
          pairUrl,
        }),
      )
    : []
}

export const getPoolWeight = async (
  masterChefContract: Contract,
  pid: number,
): Promise<BigNumber> => {
  const [{ allocPoint }, totalAllocPoint] = await Promise.all([
    masterChefContract.methods.poolInfo(pid).call(),
    masterChefContract.methods.totalAllocPoint().call(),
  ])

  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (
  masterChefContract: Contract,
  pid: number,
  account: string,
): Promise<BigNumber> => {
  return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getLockedEarned = async (
  pollyContract: Contract,
  account: string,
): Promise<BigNumber> => {
  return pollyContract.methods.lockOf(account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract: Contract,
  wethContract: Contract,
  lpContract: Contract,
  tokenContract: Contract,
  tokenDecimals: number,
  pid: number,
): Promise<{
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}> => {
  const [tokenAmountWholeLP, balance, totalSupply, lpContractWeth, poolWeight] =
    await Promise.all([
      tokenContract.methods.balanceOf(lpContract.options.address).call(),
      lpContract.methods.balanceOf(masterChefContract.options.address).call(),
      lpContract.methods.totalSupply().call(),
      wethContract.methods.balanceOf(lpContract.options.address).call(),
      getPoolWeight(masterChefContract, pid),
    ])

  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: poolWeight,
  }
}

export const approve = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (
  masterChefContract: Contract,
  pid: number,
  amount: string,
  account: string,
  ref: string,
): Promise<string> => {
  return masterChefContract.methods
    .deposit(pid, ethers.utils.parseUnits(amount, 18), ref)
    .send({ from: account })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (
  masterChefContract: Contract,
  pid: number,
  amount: string,
  account: string,
  ref: string,
): Promise<string> => {
  return masterChefContract.methods
    .withdraw(pid, ethers.utils.parseUnits(amount, 18), ref)
    .send({ from: account })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (
  masterChefContract: Contract,
  pid: number,
  account: string,
): Promise<string> => {
  return masterChefContract.methods
    .claimReward(pid)
    .send({ from: account })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (
  masterChefContract: Contract,
  pid: number,
  account: string,
): Promise<BigNumber> => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getWethPrice = async (bao: Bao) => {
  console.log(bao)
  const amount = await bao.contracts.wethPrice.methods.latestAnswer().call()
  return new BigNumber(amount)
}

export const getPollyPrice = async (bao: Bao) => {
  // FIXME: re-assess once price oracle is deployed, or use baoswap rates
  return new BigNumber(0)
  // const addr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  // const amount = await bao.contracts.baoPrice.methods
  //   .consult(addr.toString(), 1)
  //   .call()
  // return new BigNumber(amount)
}

export const getPollySupply = async (bao: Bao) => {
  return new BigNumber(await bao.contracts.polly.methods.totalSupply().call())
}

export const getReferrals = async (
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  return await masterChefContract.methods.getGlobalRefAmount(account).call()
}

export function getRefUrl() {
  let refer = '0x0000000000000000000000000000000000000000'
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('ref')) {
    refer = urlParams.get('ref')
  }
  console.log(refer)

  return refer
}

export const redeem = async (
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  const now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx: { transactionHash: string }) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (
  contract: Contract | undefined,
  amount: string,
  account: string,
): Promise<string> => {
  return contract?.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const leave = async (
  contract: Contract,
  amount: string,
  account: string,
): Promise<string> => {
  return contract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const fetchCalcToNest = async (
  recipeContract: Contract,
  nestAddress: string,
  nestAmount: string,
) => {
  const amount = new BigNumber(nestAmount).times(new BigNumber(10).pow(18))

  const amountEthNecessary = await recipeContract.methods
    .calcToPie(nestAddress, amount.toFixed(0))
    .call()
  return new BigNumber(amountEthNecessary).div(new BigNumber(10).pow(18))
}

export const nestIssue = (
  recipeContract: Contract,
  _outputToken: string,
  _inputToken: string,
  _maxInput: BigNumber,
  _data: string,
  account: string,
) =>
  recipeContract.methods
    .bake(
      _inputToken,
      _outputToken,
      new BigNumber(_maxInput).times(10 ** 18).toString(),
      _data,
    )
    .send({ from: account })

export const nestRedeem = (
  nestContract: Contract,
  amount: string,
  account: string,
) =>
  nestContract.methods
    .exitPool(new BigNumber(amount).times(10 ** 18).toString())
    .send({ from: account })

export const getWethPriceLink = async (bao: Bao) => {
  const priceOracle = getWethPriceContract(bao)

  const [decimals, latestRound] = await Promise.all([
    priceOracle.methods.decimals().call(),
    priceOracle.methods.latestRoundData().call(),
  ])

  return new BigNumber(latestRound.answer).div(10 ** decimals)
}

export const getUserInfo = async (
  masterChefContract: Contract,
  pid: number,
  account: string,
) => await masterChefContract.methods.userInfo(pid, account).call()
