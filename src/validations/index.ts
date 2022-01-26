import { web3 } from '../utils/web3'
import { reactive } from '@vue/reactivity'
import { account } from '../utils/getAccount'

export const errors = reactive<any>({})

export function useValidators () {
  const schema: any = {
    recieverAddress: (fieldName: string, value: any) => {
      isRequired(fieldName, value)
      isAddress(fieldName, value)
    },
    amountToSend: (fieldName: string, value: any) => {
      isRequired(fieldName, value)
      max(fieldName, value, account.value.humanizedBalance)
    }
  }

  const validateField = (fieldName: string, value: any) => {
    console.log('VALIDATE_FIELD')
    console.log(value)
    schema[fieldName](fieldName, value)
  }

  const clearMessage = (fieldName: string, message: string) => {
    if (errors[fieldName] === message) {
      delete errors[fieldName]
    }
  }

  const isRequired = (fieldName: string, value:string | number) => {
    const message = 'Field is required'
    if (value) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = 'Field is required'
    }
  }

  const isAddress = (fieldName: string, value: string) => {
    const message = 'Address isn\'t correct'
    if (web3.utils.isAddress(value)) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = 'Address isn\'t correct'
      console.log(errors)
    }
  }

  const max = (fieldName: string, value: string, max: string) => {
    const message = `${max} is maximum value`
    console.log('max' + value)
    if (Number(value) <= Number(max)) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = `${max} is maximum value`
      console.log(errors)
    }
  }
  return { isRequired, isAddress, validateField }
}
