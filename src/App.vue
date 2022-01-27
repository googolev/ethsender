<template>
  <div>
    <SenderForm />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { getAccount } from './utils/account'
import { addNetworkListener, checkNetwork } from './utils/network'
import { MetaMaskInpageProvider } from '@metamask/providers'
import '../src/assets/index.scss'

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider | any;
    }
}

onMounted(async () => {
  if (window.ethereum && window.ethereum.isConnected) {
    addNetworkListener()
    await checkNetwork()
    await getAccount()
  }
})

const SenderForm = defineAsyncComponent(
  () => import('./components/SenderForm.vue')
)
</script>
