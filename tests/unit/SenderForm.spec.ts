import { shallowMount } from '@vue/test-utils'
import SenderForm from '@/components/SenderForm.vue'
import { expect } from 'chai'
import { account } from '../../src/utils/account'

describe('ConnectWallet.vue', () => {
  it('useMax', async () => {
    const wrapper = await shallowMount(SenderForm)
    const button = wrapper.find('.use-max')
    const amountInput = wrapper.findComponent('[name="amountToSend"]')

    account.value = {
      address: '0x7978a273208b7B1c86e301Bd68cc84F62C99C148',
      balance: '1000000000',
      humanizedBalance: '0.1'
    }
    expect(amountInput.attributes('modelvalue')).to.equal(undefined)
    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(amountInput.attributes('modelvalue')).to.equal('0.1')
  })

  it('sendTransaction', async () => {
    const wrapper = await shallowMount(SenderForm)

    const amountInput = wrapper.findComponent('[name="amountToSend"]')
    await amountInput.setValue(0.2)

    const addressInput = wrapper.findComponent('[name="recieverAddress"]')
    await addressInput.setValue('0x7978a273208b7B1c86e301Bd68cc84F62C99C148')
    const submitButton = wrapper.find('.submit')
    submitButton.trigger('click')
    await wrapper.vm.$nextTick()
    // to do - handle is form clear and tx sended
  })
})
