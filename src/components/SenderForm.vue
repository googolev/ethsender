<template>
  <form class="sender">
    <ConnectWallet />
    <div class="mb-6">
      <label for="amountToSend" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount to send</label>
      <input type="number" id="amountToSend" v-validate :class="errors.amountToSend ? 'border-red-600' : 'border-gray-300'" name="amountToSend" v-model="amountToSend" step=".001" min="0" model="amountToSend" class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
    </div>
    <div class="mb-6">
      <label for="recieverAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Reciever address</label>
      <input type="string" id="recieverAddress" @change="validateField('recieverAddress', recieverAddress)" name="recieverAddress" v-model="recieverAddress" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
    </div>
    <ul>
      <li v-if="account">Balance: {{ `${account.humanizedBalance} ETH` }} <a noopener @click="useMax" class="text-orange-400 cursor-pointer">Use max</a></li>
      <li v-if="network && network.humanizedGasPrice">Gas price: {{ `${network.humanizedGasPrice} gwei` }}</li>
    </ul>
    <!-- {{isAddress(recieverAddress)}} -->
    <button
      @click="handleSendTransaction"
      :disabled="submitDisabled"
      class="text-white bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
        {{buttonText}}
      </button>
      {{errors}}
  </form>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import { account } from '../utils/getAccount'
import { network, sendTransaction, transaction } from '../utils/network'
import { fromWei } from '../utils/web3'
import { useFormErrors, useField, useForm } from 'vee-validate'
import { useValidators, errors } from '../validations/index'

const {
  validateField
} = useValidators()

const amountToSend = ref<number>(0)
const recieverAddress = ref<string>('')

const buttonText = computed(() => transaction?.value.txProcessing ? 'Processing' : 'Submit')
const submitDisabled = computed(() => transaction?.value.txProcessing)

const useMax = () => {
  amountToSend.value = Number(account.value.humanizedBalance)
  validateField('amountToSend', amountToSend.value)
}

const handleSendTransaction = async () => {
  await sendTransaction({ from: account.value.address, to: recieverAddress.value, value: String(amountToSend.value) })
  clearForm()
}

const clearForm = () => {
  amountToSend.value = 0
  recieverAddress.value = ''
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
