import { CurrentNetwork, Transaction } from '../interfaces/Network'
import { ref } from 'vue'
import { web3, fromWei, toWei, fromWeiToGwei } from './web3'
import { ACCEPT_NETWORK } from '../constants/network'
import { getAccount, updateBalance } from './getAccount'
import { createNotification } from '../utils/notification'

export const network = ref<CurrentNetwork | null>(null)
export const transaction = ref<Transaction>({
  from: '',
  to: '',
  value: '',
  txProcessing: false
})

export const checkNetwork = async (networkId?: number):Promise<boolean> => {
  const currentNetworkId = Number(networkId || await web3.eth.net.getId())

  network.value = {
    id: currentNetworkId,
    isCorrectNetwork: ACCEPT_NETWORK.id === currentNetworkId
  }
  await checkGasPrice()

  if (!networkId) {
    return ACCEPT_NETWORK.id === currentNetworkId
  }
}

export const addNetworkListener = () => {
  window.ethereum.on('networkChanged', async (networkId: number) => {
    await checkNetwork(networkId)
    await getAccount()
  })
}

export const checkGasPrice = async () => {
  network.value.gasPrice = await web3.eth.getGasPrice()
  network.value.humanizedGasPrice = fromWeiToGwei(network.value.gasPrice)
}

export const sendTransaction = async ({ from, to, value }:Transaction) => {
  const expectedBlockTime = 1000
  transaction.value = {
    from,
    to,
    value,
    txProcessing: true
  }
  return await web3.eth.sendTransaction({
    from: from,
    to: to,
    value: toWei(value, 'ether')
  } as Transaction, async (err, transactionHash) => {
    if (err) {
      transaction.value.txProcessing = false
      createNotification({ type: 'error', message: err.message })
    } else {
      console.log('Submitted transaction with hash: ', transactionHash)
      transaction.value.hash = transactionHash
      let transactionReceipt = null
      while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash)
        await new Promise(resolve => setTimeout(resolve, expectedBlockTime))
      }
      transaction.value.txProcessing = false
      createNotification({ type: 'success', message: `Tx #${transactionHash} confirmed` })
      await updateBalance()
      console.log('Got the transaction receipt: ', transactionReceipt)
    }
  })
}
