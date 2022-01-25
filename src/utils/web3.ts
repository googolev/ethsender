import Web3 from 'web3'
import { Unit } from '../interfaces/Network'

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const web3: Web3 = new Web3(window.ethereum)

export const fromWei = (amount: string, unit: Unit = 'ether'):string => {
  return web3.utils.fromWei(amount, unit)
}

export const toWei = (amount: string, unit: Unit = 'ether'):string => {
  return web3.utils.toWei(amount, unit)
}

export const fromWeiToGwei = (amount: string):string => {
  return String(BigInt(amount) / BigInt(1000000000))
}
