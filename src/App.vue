<template>
  <SenderForm />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { getAccount } from './utils/getAccount'
import { addNetworkListener, checkNetwork } from './utils/network'

declare global {
    interface Window {
        ethereum?: any;
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
