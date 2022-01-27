<template>
  <div class="relative">
    <label
      for="amountToSend"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {{props.label}}
    </label>
    <input
        :type="props.type"
        :id="props.name"
        v-on:input="updateValue($event.target.value)"
        :class="errors[props.name] ? 'border-red-600' : 'border-gray-300'"
        :name="props.name"
        :value="props.modelValue"
        v-validate="props.validate"
        v-bind="{...props}"
        class="border text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
    <div v-if="errors[props.name]" class="w-full text-center text-red-500 absolute text-sm">
        {{errors[props.name]}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { errors } from '../validations/index'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: String,
  name: String,
  validate: Boolean,
  step: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue (value: string | number) {
  emit('update:modelValue', value)
}
</script>
