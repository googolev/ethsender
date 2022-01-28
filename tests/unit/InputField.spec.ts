import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import InputField from '@/components/InputField.vue'

import { useValidators } from '../../src/validations/index'

const { validateField } = useValidators()

const mockedDirective = {
  mounted (el: any) {
    el.addEventListener('change', (e: any) => {
      validateField(e.target.name, e.target.value)
    })
    el.addEventListener('blur', (e: any) => {
      validateField(e.target.name, e.target.value)
    })
  }
}

const mockedProps = {
  modelValue: 'test',
  label: 'test_input',
  type: 'text',
  name: 'TestInput',
  validate: false
}

describe('InputField.vue', () => {
  it('render InputField with all props', () => {
    const wrapper = shallowMount(InputField, {
      props: { ...mockedProps },
      directives: {
        validate: mockedDirective
      }
    })
    const inputAttrs = wrapper.find('input').attributes()
    expect(inputAttrs.type).to.equal(mockedProps.type)
    expect(inputAttrs.id).to.equal(mockedProps.name)
    expect(inputAttrs.name).to.equal(mockedProps.name)
    expect(inputAttrs.modelvalue).to.equal(mockedProps.modelValue)
    expect(inputAttrs.label).to.equal(mockedProps.label)
  })

  it('updateValue working correctly', async () => {
    const wrapper = shallowMount(InputField, {
      props: { ...mockedProps },
      directives: {
        validate: mockedDirective
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes().modelvalue).to.equal(mockedProps.modelValue)

    input.element.value = 'new_value'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    const emmited = wrapper.emitted()
    expect(emmited).to.haveOwnProperty('update:modelValue')
    expect(emmited['update:modelValue'][0]).to.contain('new_value')
  })
})
