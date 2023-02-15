import { mount } from '@vue/test-utils'
import VPhoneField from '../src/components/VPhoneField.vue'
import {test, expect} from 'vitest'

test('mount component', async () => {
  expect(VPhoneField).toBeTruthy()
  const wrapper = mount(VPhoneField, {
    props: {
      defaultCountry: 'ne',
      modelValue: "+22792714229"
    },
  })

  expect(wrapper.element.modelValue).toBe('92 71 42 29')
})
