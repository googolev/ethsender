import { CurrentNetwork } from '../interfaces/Network'
import { ref } from 'vue'
import { web3, fromWei, toWei, fromWeiToGwei } from './web3'
import { ACCEPT_NETWORK } from '../constants/network'

export const network = ref<CurrentNetwork | null>(null)

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
  })
}

export const checkGasPrice = async () => {
  network.value.gasPrice = await web3.eth.getGasPrice()
  network.value.humanizedGasPrice = fromWeiToGwei(network.value.gasPrice)
}
