<template>
  <div class="sender">
    <ConnectWallet />
    <div class="mb-6">
      <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount to send</label>
      <input type="number" id="amount" step=".001" min="0" v-model="amountToSend" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required>
    </div>
    <ul>
      <li v-if="account">Balance: {{ `${account.humanizedBalance} ETH` }} <a noopener @click="useMax" class="text-orange-400 cursor-pointer">Use max</a></li>
      <li v-if="network && network.humanizedGasPrice">Gas price: {{ `${network.humanizedGasPrice} wei` }}</li>
    </ul>
    <button type="submit" class="text-white bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Submit</button>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import { account } from '../utils/getAccount'
import { network } from '../utils/network'

const amountToSend = ref<number>(0)

const useMax = () => {
  amountToSend.value = Number(account.value.humanizedBalance)
}

const ConnectWallet = defineAsyncComponent(
  () => import('./ConnectWallet.vue')
)
</script>

<style scoped lang="scss">
  .sender {
    max-width: 480px;
    padding: 0 1rem;
    margin: 10rem auto;
  }
</style>
