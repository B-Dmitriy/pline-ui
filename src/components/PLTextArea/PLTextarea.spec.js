import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PLTextarea from './PLTextarea.vue'

describe('PLTextarea default render', () => {
    it('should be render label', async () => {
        const wrapper = mount(PLTextarea, {
            props: {
                label: 'Test label',
                modelValue: 'initialValue',
                'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
            }
        })

        const label = wrapper.get('label')
        const errorSpan = wrapper.find('.pl-textarea__error-message > span')
        const rootTextarea = wrapper.find('.pl-textarea__root')

        expect(errorSpan.classes()).not.toContain('pl-textarea__root_error')
        expect(label.text()).toContain('Test label')

        expect(wrapper.props('modelValue')).toBe('initialValue')
        await rootTextarea.setValue('test')
        expect(wrapper.props('modelValue')).toBe('test')
    })
})

describe('PLTextarea render with error text', () => {
    it('should be render error text and change styles', () => {
        const wrapper = mount(PLTextarea, {
            props: {
                error: 'error text'
            }
        })

        const rootTextarea = wrapper.find('.pl-textarea__root')
        const errorSpan = wrapper.find('.pl-textarea__error-message > span')

        expect(rootTextarea.classes()).toContain('pl-textarea__root_error')
        expect(errorSpan.text()).toContain('error text')
    })
})