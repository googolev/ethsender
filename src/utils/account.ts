import { Account } from '../interfaces/Account'
import { ref } from 'vue'
import { web3, fromWei } from './web3'
import { checkNetwork } from './network'

export const account = ref<Account | null>(null)

export const getAccount = async ():Promise<void> => {
  const addresses: Array<string> = await window.ethereum.request({
    method: 'eth_requestAccounts'
  })

  const balance: string = await web3.eth.getBalance(addresses[0])
  await checkNetwork()

  account.value = {
    address: addresses[0],
    balance: balance,
    humanizedBalance: Number(fromWei(balance)).toFixed(8)
  }
}

export const updateBalance = async ():Promise<void> => {
  const balance: string = await web3.eth.getBalance(account.value.address)
  account.value.balance = balance
  account.value.humanizedBalance = Number(fromWei(balance)).toFixed(8)
}
