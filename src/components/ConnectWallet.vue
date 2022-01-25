<template>
   <div class="mb-6">
      <button @click="handleConnectWallet" class="w-full flex justify-center items-center p-4 bg-orange-100 hover:bg-orange-200 rounded-lg">
        <img src="~/../assets/images/metamask.svg" class="w-12 pr-4" />
        <span class="truncate w-24">
          {{account ? account.address : 'Connect'}}
        </span>
      </button>
      {{network ? network.isCorrectNetwork : null}}
   </div>
</template>

<script lang="ts" setup>
import { account, getAccount } from '../utils/getAccount'
import { network } from '../utils/network'

const handleConnectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await getAccount()
  } else {
    alert('Please install MetaMask')
  }
}
</script>
