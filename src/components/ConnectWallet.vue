<template>
   <div class="mb-6">
      <button @click="handleConnectWallet" type="button" class="w-full flex justify-center items-center p-4 bg-orange-100 hover:bg-orange-200 rounded-lg">
        <img src="~/../assets/images/metamask.svg" class="w-12 pr-4" />
        <span class="truncate w-24">
          {{account ? account.address : 'Connect'}}
        </span>
      </button>
   </div>
</template>

<script lang="ts" setup>
import { account, getAccount } from '../utils/account'
import { network } from '../utils/network'
import { createNotification } from '../utils/notification'

const handleConnectWallet = async () => {
  if (typeof window.ethereum !== 'undefined' && !window.ethereum.isConnected) {
    await getAccount()
  } else if (typeof window.ethereum === 'undefined') {
    createNotification({ type: 'error', message: 'Please install MetaMask' })
  }
}
</script>
