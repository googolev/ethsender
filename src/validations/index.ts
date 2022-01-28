import { web3 } from '../utils/web3'
import { reactive } from '@vue/reactivity'
import { account } from '../utils/account'

type ValueType = string | number

interface Schema {
  [key: string]: (fieldName: string, value: any) => void
}

interface Error {
  [key: string]: string
}

interface ValidatorProps {
  validateField: (fieldName: string, value: ValueType) => void,
  isFieldsIncorrect: (fields: Array<string>) => void,
  isRequired: (fieldName: string, value: ValueType) => void,
  isAddress: (fieldName: string, value: string) => void,
  max: (fieldName: string, value: ValueType, max: string) => void,
  min: (fieldName: string, value: ValueType, min: string) => void
}

export const errors = reactive<Error>({})

export const useValidators = ():ValidatorProps => {
  const schema: Schema = {
    recieverAddress: (fieldName: string, value: string) => {
      isRequired(fieldName, value)
      isAddress(fieldName, value)
    },
    amountToSend: (fieldName: string, value: ValueType) => {
      isRequired(fieldName, value)
      max(fieldName, value, account.value.humanizedBalance)
      min(fieldName, value, '0.00001')
    },
    TestInput: (fieldName: string, value: ValueType) => {
      isRequired(fieldName, value)
    }
  }

  const validateField = (fieldName: string, value: ValueType) => {
    schema[fieldName](fieldName, value)
  }

  const clearMessage = (fieldName: string, message: string) => {
    if (errors[fieldName] === message) {
      delete errors[fieldName]
    }
  }

  const isFieldsIncorrect = (fields: Array<string>) => {
    for (const field of fields) {
      if (errors[field]) {
        return true
      }
    }
    return false
  }

  const isRequired = (fieldName: string, value: ValueType) => {
    const message = 'Field is required'
    console.log(value)
    if (typeof value === 'number' || value.trim()) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = message
    }
  }

  const isAddress = (fieldName: string, value: string) => {
    const message = 'Address isn\'t correct'
    console.log(web3.utils.isAddress(value))
    if (value.length && web3.utils.isAddress(value)) {
      clearMessage(fieldName, message)
    } else if (value.length) {
      errors[fieldName] = message
    }
  }

  const max = (fieldName: string, value: ValueType, max: string) => {
    const message = `${max} is maximum value`
    if (Number(value) <= Number(max)) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = message
    }
  }

  const min = (fieldName:string, value: ValueType, min: string) => {
    const message = `Should be more then ${min}`
    if (!value || Number(value) > Number(min)) {
      clearMessage(fieldName, message)
    } else {
      errors[fieldName] = message
    }
  }

  return { isRequired, isAddress, validateField, isFieldsIncorrect, min, max }
}
