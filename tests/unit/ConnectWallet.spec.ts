import { shallowMount } from '@vue/test-utils'
import ConnectWallet from '@/components/ConnectWallet.vue'
import { expect } from 'chai'
import { account } from '../../src/utils/account'

describe('ConnectWallet.vue', () => {
  it('Is button contain address', async () => {
    const wrapper = shallowMount(ConnectWallet)
    const button = wrapper.find('button')

    account.value = {
      address: '0x7978a273208b7B1c86e301Bd68cc84F62C99C148',
      balance: '1000000000',
      humanizedBalance: '0.1'
    }
    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(button.text()).to.equal(account.value.address)
  })

  it('Is error shown if ethereum not exist', async () => {
    const wrapper = shallowMount(ConnectWallet)
    const button = wrapper.find('button')
    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(window.document.documentElement.innerHTML).to.contain('Please install MetaMask')
  })
})
