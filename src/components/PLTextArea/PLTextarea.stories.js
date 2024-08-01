import { fn } from '@storybook/test';

import PLTextarea from './PLTextarea.vue';

export const ActionsData = {
  'onUpdate:modelValue': fn(),
};

export default {
  component: PLTextarea,
  title: 'PLTextarea',
  tags: ['autodocs'],
  args: {
    ...ActionsData
  }
};


export const Default = {
  args: {
    label: 'Label for textarea',
  },
};

export const Error = {
  args: {
    ...Default.args.task,
    modelValue: 'wrong',
    label: 'Textarea with error',
    error: 'error text'
  },
};

export const Disabled = {
  args: {
    ...Default.args.task,
    disabled: true,
    modelValue: 'wrong',
    label: 'Textarea disabled'
  },
};