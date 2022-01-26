import { Account } from '../interfaces/Account'
import { ref } from 'vue'
import { web3, fromWei } from './web3'
import { checkNetwork } from './network'

// data
export const account = ref<Account | null>(null)

// methods
export const getAccount = async () => {
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

export const updateBalance = async () => {
  const balance: string = await web3.eth.getBalance(account.value.address)
  account.value.balance = balance
  account.value.humanizedBalance = fromWei(balance)
}
