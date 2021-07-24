const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const { ethers } = require('ethers');

const recipeAbi = require('./abi/recipe.json');

// constants

const rpcUrl = 'https://rpc-mainnet.maticvigil.com';
const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const contracts = {
  recipe: '0xF6bCa56DE573380d5424F950367d257B73E40280',
  nest: '0x092737fd2AF3c233E6ace3153028006bBC6E6Ec6'
};
const amount = new BigNumber(1)
  .times(new BigNumber(10).pow(18))
  .toFixed(0);

// functions

const callContractWeb3 = async () => {
  const recipe = new web3.eth.Contract(
    recipeAbi,
    contracts.recipe
  );

  const ethNecessary =
    await recipe.methods.calcToPie(contracts.nest, amount).call();
  console.log(`${decimate(ethNecessary)}`);
};

// util

const decimate = (num, dec = 18) =>
  new BigNumber(num).div(new BigNumber(10).pow(dec));

// init

callContractWeb3();