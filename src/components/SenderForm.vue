<template>
  <form class="sender relative p-6 rounded-lg bg-gray-50 shadow-lg max-w-md mx-auto my-64">
    <ConnectWallet />
    <div :class="{ 'blured': !network?.isCorrectNetwork }">
      <div class="mb-6">
      <InputField name="amountToSend" validate type="number" label="Amount to send" step="0.001" v-model="amountToSend" />
      </div>
      <div class="mb-6">
        <InputField name="recieverAddress" validate type="string" label="Reciever address" v-model="recieverAddress" />
      </div>
      <ul>
        <li v-if="account">Balance: {{ `${account.humanizedBalance} ETH` }} <a noopener @click="useMax" class="text-orange-400 cursor-pointer">Use max</a></li>
        <li v-if="network">{{network.humanizedGasPrice ? `Gas price: ${network.humanizedGasPrice} gwei` : 'Gas price: Loading...' }}</li>
      </ul>
      <button
        @click="handleSendTransaction"
        :disabled="submitDisabled"
        class="w-full text-lg bg-orange-200 hover:bg-orange-300 focus:ring-4 mt-5 focus:ring-orange-300 font-medium rounded-lg p-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
          {{buttonText}}
      </button>
    </div>
    <div class="w-full absolute top-1/2 text-center" :style="{ display: network && !network.isCorrectNetwork ? 'block' : 'none' }">Wrong network. Please, connect to <a class="cursor-pointer text-orange-500" noopener @click="switchToCorrectNetwork">Rinkeby Testnet</a></div>
  </form>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import { account } from '../utils/account'
import { network, sendTransaction, transaction, switchToCorrectNetwork } from '../utils/network'
import { fromWei } from '../utils/web3'
import { useValidators, errors } from '../validations/index'

const {
  validateField,
  isFieldsIncorrect
} = useValidators()

const amountToSend = ref<number>()
const recieverAddress = ref<string>('')

const buttonText = computed(() => transaction?.value.txProcessing ? 'Processing' : 'Send Transaction')
const submitDisabled = computed(() => transaction?.value.txProcessing || isFieldsIncorrect(['recieverAddress', 'amountToSend']) || !amountToSend.value || !recieverAddress.value)

const useMax = () => {
  amountToSend.value = Number(account.value.humanizedBalance)
  validateField('amountToSend', amountToSend.value)
}

const handleSendTransaction = async () => {
  await sendTransaction({ from: account.value.address, to: recieverAddress.value, value: String(amountToSend.value) })
  clearForm()
}

const clearForm = () => {
  amountToSend.value = null
  recieverAddress.value = ''
}

const InputField = defineAsyncComponent(
  () => import('./InputField.vue')
)

const ConnectWallet = defineAsyncComponent(
  () => import('./ConnectWallet.vue')
)
</script>

<style scoped lang="scss">
  .sender {
    position: relative;
    .blured {
        filter: blur(5px);
        pointer-events: none;
      }
  }
</style>
